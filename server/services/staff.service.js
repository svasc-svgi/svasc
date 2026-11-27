const Staff = require('../models/staff.model');
const Department = require('../models/department.model');
const { parseStaffName } = require('../utils/staffParser');
const { stripDegreeDots } = require('../utils/dbSanitizer');

const buildDeptVariants = (dept) => {
  if (!dept) return [dept];
  const clean = stripDegreeDots(dept);
  const dottedSpace = clean.replace(/\b(B\.Sc|M\.Sc|Ph\.D)\s+/gi, '$1. ');
  const dottedNoSpace = clean.replace(/\b(B\.Sc|M\.Sc|Ph\.D)\s+/gi, '$1.');
  return Array.from(new Set([dept, clean, dottedSpace, dottedNoSpace]));
};

// Standard default departments covering all college courses & sections
const DEFAULT_DEPARTMENTS = [
  'B.Sc Computer Science',
  'B.Sc Computer Science (AI & DS)',
  'Bachelor of Computer Applications (BCA)',
  'B.Sc Information Technology',
  'B.Sc Cyber Security',
  'B.Com – Bachelor of Commerce',
  'B.Com (Banking & Insurance)',
  'B.Com (Information Technology)',
  'B.Com (Computer Applications)',
  'B.Com (Professional Accounting)',
  'BBA - Management Studies',
  'B.Sc Chemistry',
  'B.Sc Mathematics',
  'B.Sc Microbiology',
  'B.A. English',
  'B.Sc Costume Design & Fashion',
  'M.Sc Computer Science',
  'Master of Commerce (M.Com)',
  'M.Sc Microbiology',
  'M.A. English',
  'Ph.D Commerce',
  'Ph.D English',
  'Ph.D Tamil',
  'Ph.D Microbiology',
  'Ph.D Management',
  'Department of Physical Education',
  'Library',
  'Alumni Committee',
  'Administrative Staff'
];

/**
 * Get dynamic list of all departments (defaults + custom + distinct from staff)
 */
const getAllDepartments = async () => {
  let customNames = [];
  try {
    const customDocs = await Department.find().sort({ name: 1 }).lean();
    customNames = customDocs.map(d => d.name);
  } catch (err) {
    console.warn('Could not read Department collection:', err.message);
  }

  let staffDepts = [];
  try {
    staffDepts = await Staff.distinct('department');
  } catch (err) {
    console.warn('Could not read Staff distinct departments:', err.message);
  }

  const combined = Array.from(new Set([
    ...DEFAULT_DEPARTMENTS,
    ...customNames,
    ...staffDepts.filter(Boolean)
  ].map(stripDegreeDots).filter(Boolean)));

  combined.sort((a, b) => a.localeCompare(b));

  return combined.map(name => ({
    name,
    value: name,
    label: name,
    isCustom: customNames.includes(name) || (!DEFAULT_DEPARTMENTS.includes(name) && staffDepts.includes(name))
  }));
};

/**
 * Add a new department or course
 */
const createDepartment = async (name) => {
  if (!name || typeof name !== 'string') throw new Error('Department name is required');
  const trimmed = name.trim();
  if (!trimmed) throw new Error('Department name cannot be empty');

  let existing = await Department.findOne({ name: { $regex: new RegExp(`^${trimmed}$`, 'i') } });
  if (existing) return existing;

  const doc = new Department({ name: trimmed, isCustom: true });
  return await doc.save();
};

/**
 * Remove a custom department
 */
const deleteDepartment = async (name) => {
  return await Department.findOneAndDelete({ name });
};

/**
 * Helper to compute a reliable canonical person key for cross-course deduplication.
 * Ensures the same faculty member is recognized whether their title is "Mrs. A. Kowshika",
 * "A. Kowshika", "Kowshika A", etc.
 */
const getPersonKey = (staff) => {
  if (!staff) return '';
  const fullName = staff.fullName || staff.name || '';
  const parsed = parseStaffName(fullName);
  if (parsed.normalizedKey) return parsed.normalizedKey;

  const initial = (staff.initial || parsed.initial || '').trim().toUpperCase();
  const core = (parsed.coreName || fullName).toLowerCase()
    .replace(/^(dr|mr|mrs|ms|prof|rev|திரு|திருமதி)\.?\s+/gi, '')
    .replace(/[^a-z0-9\u0B80-\u0BFF]/g, '')
    .replace(/j/g, 'ch');
  const init = initial.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '');
  return init ? `${core}_${init}` : core;
};

/**
 * Scans the database, finds all duplicate records for the same faculty member,
 * consolidates all assigned departments/courses into a single master document,
 * merges rich profile data, and deletes redundant duplicate documents.
 */
const deduplicateStaffInDatabase = async () => {
  try {
    const allStaff = await Staff.find().sort({ createdAt: 1 });
    if (!allStaff || allStaff.length === 0) return { removedCount: 0, uniqueStaffCount: 0 };

    const groups = new Map();

    for (const doc of allStaff) {
      const key = getPersonKey(doc) || String(doc._id);
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key).push(doc);
    }

    let removedCount = 0;

    for (const [key, records] of groups.entries()) {
      if (records.length === 1) {
        const single = records[0];
        const depts = new Set([
          ...(Array.isArray(single.departments) ? single.departments : []),
          single.department
        ].filter(Boolean));
        single.departments = Array.from(depts);
        if (!single.normalizedKey) single.normalizedKey = key;
        await single.save();
        continue;
      }

      // Multiple documents found for the same person - Pick best primary
      records.sort((a, b) => {
        const aScore = (a.photo ? 10 : 0) + (a.education?.ug ? 5 : 0) + (a.experience?.total ? 5 : 0);
        const bScore = (b.photo ? 10 : 0) + (b.education?.ug ? 5 : 0) + (b.experience?.total ? 5 : 0);
        return bScore - aScore;
      });

      const primary = records[0];
      const duplicates = records.slice(1);

      // Consolidate all departments across all records
      const allDepts = new Set([
        ...(Array.isArray(primary.departments) ? primary.departments : []),
        primary.department
      ].filter(Boolean));

      for (const dup of duplicates) {
        if (dup.department) allDepts.add(dup.department);
        if (Array.isArray(dup.departments)) {
          dup.departments.forEach(d => d && allDepts.add(d));
        }

        // Merge any non-empty fields into primary
        if (!primary.photo && dup.photo) {
          primary.photo = dup.photo;
          primary.photoPublicId = dup.photoPublicId;
        }
        if (!primary.email && dup.email) primary.email = dup.email;
        if (!primary.mobile && dup.mobile) primary.mobile = dup.mobile;
        if (!primary.contactNo && dup.contactNo) primary.contactNo = dup.contactNo;
        if (!primary.qualification && dup.qualification) primary.qualification = dup.qualification;
        if ((!primary.designation || primary.designation === 'Faculty') && dup.designation && dup.designation !== 'Faculty') {
          primary.designation = dup.designation;
        }
        if ((!primary.education || !primary.education.ug) && dup.education?.ug) {
          primary.education = dup.education;
        }
        if ((!primary.experience || !primary.experience.total) && dup.experience?.total) {
          primary.experience = dup.experience;
        }
        if (!primary.specialization && dup.specialization) primary.specialization = dup.specialization;
        if ((!primary.publications || !primary.publications.scopus?.international) && dup.publications?.scopus?.international) {
          primary.publications = dup.publications;
        }
        if (!primary.conferences?.international && dup.conferences?.international) {
          primary.conferences = dup.conferences;
        }
        if (!primary.books && dup.books) primary.books = dup.books;
        if (!primary.workshops && dup.workshops) primary.workshops = dup.workshops;
        if (!primary.fdp && dup.fdp) primary.fdp = dup.fdp;
        if (!primary.awards && dup.awards) primary.awards = dup.awards;
      }

      primary.departments = Array.from(allDepts);
      if (!primary.department && primary.departments.length > 0) {
        primary.department = primary.departments[0];
      }
      primary.normalizedKey = key;
      await primary.save();

      // Delete the redundant duplicate documents from MongoDB
      const duplicateIds = duplicates.map(d => d._id);
      await Staff.deleteMany({ _id: { $in: duplicateIds } });
      removedCount += duplicateIds.length;
    }

    return { removedCount, uniqueStaffCount: groups.size };
  } catch (err) {
    console.error('Error during deduplicateStaffInDatabase:', err);
    return { removedCount: 0, uniqueStaffCount: 0, error: err.message };
  }
};

/**
 * Get all staff members with optional filtering by department or search term.
 * Guarantees that each faculty member appears ONLY ONCE in the result.
 */
const getAllStaff = async (filter = {}) => {
  // 1. Auto-deduplicate database to clean up legacy redundant rows
  try {
    await deduplicateStaffInDatabase();
  } catch (err) {
    console.warn('Auto deduplication notice:', err.message);
  }

  const query = {};

  if (filter.department && filter.department !== 'All') {
    const deptVariants = buildDeptVariants(filter.department);
    query.$or = [
      { department: { $in: deptVariants } },
      { departments: { $in: deptVariants } }
    ];
  }

  if (filter.search) {
    const s = filter.search.trim();
    query.$or = (query.$or || []).concat([
      { fullName: { $regex: s, $options: 'i' } },
      { coreName: { $regex: s, $options: 'i' } },
      { initial: { $regex: s, $options: 'i' } },
      { qualification: { $regex: s, $options: 'i' } }
    ]);
  }

  const staffDocs = await Staff.find(query).sort({ sNo: 1, createdAt: 1 }).lean();

  // 2. Safeguard in-memory deduplication: guarantee each unique person is returned once
  const seenKeys = new Set();
  const uniqueStaff = [];

  for (const s of staffDocs) {
    const key = getPersonKey(s);
    if (key && seenKeys.has(key)) {
      // Merge departments into existing item
      const existing = uniqueStaff.find(item => getPersonKey(item) === key);
      if (existing) {
        const mergedDepts = Array.from(new Set([
          ...(Array.isArray(existing.departments) ? existing.departments : [existing.department]),
          ...(Array.isArray(s.departments) ? s.departments : [s.department])
        ].filter(Boolean)));
        existing.departments = mergedDepts;
      }
      continue;
    }
    if (key) seenKeys.add(key);

    const depts = Array.from(new Set([
      ...(Array.isArray(s.departments) ? s.departments : []),
      s.department
    ].filter(Boolean).map(stripDegreeDots)));
    s.departments = depts;
    if (s.department) s.department = stripDegreeDots(s.department);
    if (s.qualification) s.qualification = stripDegreeDots(s.qualification);
    uniqueStaff.push(s);
  }

  return uniqueStaff;
};

/**
 * Get a fast key-value map of { normalizedKey: photoUrl }
 * Enables instant, O(1) photo lookup by faculty name on the frontend.
 */
const getStaffPhotoMap = async () => {
  const staffWithPhotos = await Staff.find({ photo: { $exists: true, $ne: '' } })
    .select('normalizedKey photo fullName initial')
    .lean();

  const photoMap = {};
  for (const s of staffWithPhotos) {
    if (s.normalizedKey && s.photo) {
      photoMap[s.normalizedKey] = s.photo;
    }
  }
  return photoMap;
};

/**
 * Create or save staff member.
 * Checks for existing faculty by normalizedKey/name.
 * If already exists: merges departments and updates fields (DOES NOT duplicate).
 * If new: auto-assigns next sequential sNo and creates a single record.
 */
const createStaff = async (data) => {
  const parsed = parseStaffName(data.fullName || data.name || '');
  const initial = data.initial ? data.initial.trim().toUpperCase() : parsed.initial;
  const coreName = parsed.coreName || data.coreName || data.name || '';

  let cleanCore = coreName.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '').replace(/j/g, 'ch');
  const cleanInit = initial.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '');
  const normalizedKey = cleanInit ? `${cleanCore}_${cleanInit}` : cleanCore;

  const targetDept = data.department || (Array.isArray(data.departments) && data.departments[0]) || '';
  const newDepts = Array.isArray(data.departments) && data.departments.length > 0
    ? data.departments
    : (targetDept ? [targetDept] : []);

  // Check if person already exists in DB by normalizedKey or name
  const existing = await Staff.findOne({
    $or: [
      { normalizedKey },
      { fullName: data.fullName || data.name }
    ]
  });

  if (existing) {
    const existingDepts = Array.isArray(existing.departments) ? existing.departments : (existing.department ? [existing.department] : []);
    existing.departments = Array.from(new Set([...existingDepts, ...newDepts].filter(Boolean)));
    if (!existing.department && targetDept) existing.department = targetDept;

    if (data.qualification) existing.qualification = data.qualification;
    if (data.designation) existing.designation = data.designation;
    if (data.photo) existing.photo = data.photo;
    if (data.photoPublicId) existing.photoPublicId = data.photoPublicId;
    if (data.email) existing.email = data.email;
    if (data.contactNo) existing.contactNo = data.contactNo;
    if (data.mobile) existing.mobile = data.mobile;
    if (data.specialization) existing.specialization = data.specialization;
    if (data.education) existing.education = { ...existing.education, ...data.education };
    if (data.experience) existing.experience = { ...existing.experience, ...data.experience };
    if (data.publications) existing.publications = { ...existing.publications, ...data.publications };
    if (data.conferences) existing.conferences = { ...existing.conferences, ...data.conferences };
    if (data.books) existing.books = data.books;
    if (data.workshops) existing.workshops = data.workshops;
    if (data.fdp) existing.fdp = data.fdp;
    if (data.awards) existing.awards = data.awards;

    const saved = await existing.save();

    // Clean up any remaining duplicates
    await Staff.deleteMany({
      _id: { $ne: existing._id },
      $or: [{ normalizedKey }, { fullName: existing.fullName }]
    });

    return saved;
  }

  // Auto assign next sNo if not explicitly set (or <= 0)
  let assignedSNo = Number(data.sNo) || 0;
  if (assignedSNo <= 0) {
    const maxStaff = await Staff.findOne().sort({ sNo: -1 }).select('sNo').lean();
    assignedSNo = (maxStaff && typeof maxStaff.sNo === 'number' && maxStaff.sNo > 0)
      ? maxStaff.sNo + 1
      : 1;
  }

  const staff = new Staff({
    ...data,
    fullName: data.fullName || data.name,
    coreName,
    initial,
    normalizedKey,
    sNo: assignedSNo,
    department: targetDept,
    departments: newDepts
  });

  const saved = await staff.save();
  return saved;
};

/**
 * Update staff details by ID.
 * Ensures departments list is deduplicated and syncs photo.
 */
const updateStaff = async (id, data) => {
  const existing = await Staff.findById(id);
  if (!existing) return null;

  const fullName = data.fullName || data.name || existing.fullName;
  const parsed = parseStaffName(fullName);
  const initial = data.initial !== undefined ? data.initial.trim().toUpperCase() : (existing.initial || parsed.initial);
  const coreName = parsed.coreName || existing.coreName;

  let cleanCore = coreName.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '').replace(/j/g, 'ch');
  const cleanInit = initial.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '');
  const normalizedKey = cleanInit ? `${cleanCore}_${cleanInit}` : cleanCore;

  const updateData = {
    ...data,
    fullName,
    coreName,
    initial,
    normalizedKey
  };

  const incomingDepts = Array.isArray(data.departments) ? data.departments : (data.department ? [data.department] : []);
  const currentDepts = Array.isArray(existing.departments) ? existing.departments : (existing.department ? [existing.department] : []);
  updateData.departments = Array.from(new Set([...currentDepts, ...incomingDepts].filter(Boolean)));
  if (!updateData.department && updateData.departments.length > 0) {
    updateData.department = updateData.departments[0];
  }

  const updated = await Staff.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

  // Sync photo across all records if any
  if (updated && updated.photo) {
    await Staff.updateMany(
      { normalizedKey: updated.normalizedKey, _id: { $ne: updated._id } },
      { $set: { photo: updated.photo, photoPublicId: updated.photoPublicId || '' } }
    );
  }

  // Delete any other duplicate documents for this person in the database
  await Staff.deleteMany({
    _id: { $ne: updated._id },
    $or: [
      { normalizedKey: updated.normalizedKey },
      { fullName: updated.fullName }
    ]
  });

  return updated;
};

/**
 * Delete a staff member by ID and any legacy duplicate records with same person key
 */
const deleteStaff = async (id) => {
  const target = await Staff.findById(id);
  if (!target) return null;

  const key = target.normalizedKey;
  const name = target.fullName;

  const deleted = await Staff.findByIdAndDelete(id);

  if (key || name) {
    await Staff.deleteMany({
      $or: [
        ...(key ? [{ normalizedKey: key }] : []),
        ...(name ? [{ fullName: name }] : [])
      ]
    });
  }

  return deleted;
};

/**
 * Assign / Clone a faculty member to one or more courses/departments.
 * Merges target departments into the existing staff member's departments list.
 * DOES NOT CREATE DUPLICATE DOCUMENTS.
 */
const cloneStaff = async (staffId, { targetDepartment, targetDepartments }) => {
  const source = await Staff.findById(staffId);
  if (!source) throw new Error('Source staff member not found');

  const targets = (Array.isArray(targetDepartments) && targetDepartments.length > 0)
    ? targetDepartments
    : (targetDepartment ? [targetDepartment] : []);

  if (!targets.length) throw new Error('At least one target department must be selected');

  const currentDepts = Array.isArray(source.departments)
    ? source.departments
    : (source.department ? [source.department] : []);

  source.departments = Array.from(new Set([...currentDepts, ...targets].filter(Boolean)));
  if (!source.department && source.departments.length > 0) {
    source.department = source.departments[0];
  }
  await source.save();

  // Remove any duplicate records for this person that may have existed in those departments
  await Staff.deleteMany({
    _id: { $ne: source._id },
    $or: [
      { normalizedKey: source.normalizedKey },
      { fullName: source.fullName }
    ]
  });

  return [source];
};

/**
 * Bulk seed initial faculty from website definitions.
 * Updates existing single faculty document or inserts new.
 * Guarantees zero duplicate documents.
 */
const seedInitialStaff = async (facultyList) => {
  if (!Array.isArray(facultyList) || facultyList.length === 0) return { inserted: 0, updated: 0 };

  let insertedCount = 0;
  let updatedCount = 0;

  for (const item of facultyList) {
    const rawName = item.fullName || item.name || '';
    if (!rawName) continue;

    const parsed = parseStaffName(rawName);
    const initial = item.initial || parsed.initial;
    const coreName = parsed.coreName;

    let cleanCore = coreName.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '').replace(/j/g, 'ch');
    const cleanInit = initial.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '');
    const normalizedKey = cleanInit ? `${cleanCore}_${cleanInit}` : cleanCore;

    // Look up by person identity ONLY
    const existing = await Staff.findOne({
      $or: [
        { normalizedKey },
        { fullName: rawName }
      ]
    });

    const itemDepts = Array.isArray(item.departments)
      ? item.departments
      : (item.department ? [item.department] : []);

    if (existing) {
      const currentDepts = Array.isArray(existing.departments) ? existing.departments : (existing.department ? [existing.department] : []);
      existing.departments = Array.from(new Set([...currentDepts, ...itemDepts].filter(Boolean)));
      if (!existing.department && item.department) existing.department = item.department;

      if (item.photo && !existing.photo) existing.photo = item.photo;
      if (item.qualification) existing.qualification = item.qualification;
      if (item.designation && item.designation !== 'Faculty') existing.designation = item.designation;
      if (item.contactNo) existing.contactNo = item.contactNo;
      if (item.email) existing.email = item.email;
      if (item.education) existing.education = { ...existing.education, ...item.education };
      if (item.experience) existing.experience = { ...existing.experience, ...item.experience };
      if (item.specialization) existing.specialization = item.specialization;
      if (item.publications) existing.publications = { ...existing.publications, ...item.publications };
      if (item.conferences) existing.conferences = { ...existing.conferences, ...item.conferences };
      if (item.books) existing.books = item.books;
      if (item.workshops) existing.workshops = item.workshops;
      if (item.fdp) existing.fdp = item.fdp;
      if (item.awards) existing.awards = item.awards;

      await existing.save();
      updatedCount++;
    } else {
      const staffData = {
        fullName: rawName,
        coreName,
        initial,
        normalizedKey,
        qualification: item.qualification || '',
        designation: item.designation || 'Assistant Professor',
        department: item.department || itemDepts[0] || '',
        departments: itemDepts,
        photo: item.photo || '',
        sNo: item.sNo || (insertedCount + 1),
        contactNo: item.contactNo || item.mobile || '',
        email: item.email || '',
        education: item.education || { ug: '', pg: '', doctorate: '', other: '' },
        experience: item.experience || { teaching: '', industry: '', research: '', total: '' },
        specialization: item.specialization || '',
        publications: item.publications || {
          scopus: { international: '', national: '' },
          peerReviewed: { international: '', national: '' },
          webOfScience: { international: '', national: '' },
          others: { international: '', national: '' }
        },
        conferences: item.conferences || { international: '', national: '' },
        books: item.books || '',
        workshops: item.workshops || '',
        fdp: item.fdp || '',
        researchGuidance: item.researchGuidance || { awarded: '', undergoing: '' },
        researchProjects: item.researchProjects || { completed: '', undergoing: '' },
        awards: item.awards || ''
      };
      await Staff.create(staffData);
      insertedCount++;
    }
  }

  // Run cleanup to delete any lingering duplicates
  await deduplicateStaffInDatabase();

  return { inserted: insertedCount, updated: updatedCount };
};

module.exports = {
  getAllDepartments,
  createDepartment,
  deleteDepartment,
  getAllStaff,
  getStaffPhotoMap,
  createStaff,
  updateStaff,
  deleteStaff,
  cloneStaff,
  seedInitialStaff,
  deduplicateStaffInDatabase
};
