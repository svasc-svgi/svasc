const Staff = require('../models/staff.model');
const Department = require('../models/department.model');
const { parseStaffName } = require('../utils/staffParser');

// Standard default departments covering all college courses & sections
const DEFAULT_DEPARTMENTS = [
  'B.Sc. Computer Science',
  'B.Sc. Computer Science (AI & DS)',
  'Bachelor of Computer Applications (BCA)',
  'B.Sc. Information Technology',
  'B.Sc. Cyber Security',
  'B.Com – Bachelor of Commerce',
  'B.Com (Banking & Insurance)',
  'B.Com (Information Technology)',
  'B.Com (Computer Applications)',
  'B.Com (Professional Accounting)',
  'BBA - Management Studies',
  'B.Sc. Chemistry',
  'B.Sc. Mathematics',
  'B.Sc. Microbiology',
  'B.A. English',
  'B.Sc. Costume Design & Fashion',
  'M.Sc. Computer Science',
  'Master of Commerce (M.Com)',
  'M.Sc. Microbiology',
  'M.A. English',
  'Ph.D. Commerce',
  'Ph.D. English',
  'Ph.D. Tamil',
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
  ]));

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
 * Get all staff members with optional filtering by department or search term.
 * Sorted by department, then sNo ascending, then createdAt ascending.
 */
const getAllStaff = async (filter = {}) => {
  const query = {};

  if (filter.department && filter.department !== 'All') {
    query.$or = [
      { department: filter.department },
      { departments: filter.department }
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

  return await Staff.find(query).sort({ department: 1, sNo: 1, createdAt: 1 }).lean();
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
 * When a new staff member is added, automatically assigns the next sequential sNo
 * in that department (placed at the bottom of the list).
 * When a photo is uploaded or changed, syncs the photo across ALL departments
 * where faculty with the same normalizedKey is present.
 */
const createStaff = async (data) => {
  const parsed = parseStaffName(data.fullName || data.name || '');
  const initial = data.initial ? data.initial.trim().toUpperCase() : parsed.initial;
  const coreName = parsed.coreName || data.coreName || data.name || '';

  // Canonical key with initial differentiation
  let cleanCore = coreName.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '').replace(/j/g, 'ch');
  const cleanInit = initial.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '');
  const normalizedKey = cleanInit ? `${cleanCore}_${cleanInit}` : cleanCore;

  // Auto assign next sNo if not explicitly set (or <= 0) to ensure placement at bottom of the list
  const targetDept = data.department || (Array.isArray(data.departments) && data.departments[0]) || '';
  let assignedSNo = Number(data.sNo) || 0;
  if (assignedSNo <= 0 && targetDept) {
    const maxStaff = await Staff.findOne({ department: targetDept })
      .sort({ sNo: -1 })
      .select('sNo')
      .lean();
    assignedSNo = (maxStaff && typeof maxStaff.sNo === 'number' && maxStaff.sNo > 0)
      ? maxStaff.sNo + 1
      : 1;
  } else if (assignedSNo <= 0) {
    assignedSNo = 1;
  }

  const staff = new Staff({
    ...data,
    fullName: data.fullName || data.name,
    coreName,
    initial,
    normalizedKey,
    sNo: assignedSNo,
    departments: Array.isArray(data.departments) ? data.departments : (data.department ? [data.department] : [])
  });

  const saved = await staff.save();

  // If photo is present, propagate photo to all other records with the same normalizedKey
  if (saved.photo) {
    await Staff.updateMany(
      { normalizedKey: saved.normalizedKey, _id: { $ne: saved._id } },
      { $set: { photo: saved.photo, photoPublicId: saved.photoPublicId || '' } }
    );
  }

  return saved;
};

/**
 * Update staff details by ID.
 * Propagates photo to all departments sharing this staff's normalizedKey.
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

  if (data.department && (!updateData.departments || updateData.departments.length === 0)) {
    updateData.departments = [data.department];
  }

  const updated = await Staff.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

  // Cross-department photo synchronization:
  // If photo was updated, update all matching staff members across all departments
  if (updated && updated.photo) {
    await Staff.updateMany(
      { normalizedKey: updated.normalizedKey, _id: { $ne: updated._id } },
      { $set: { photo: updated.photo, photoPublicId: updated.photoPublicId || '' } }
    );
  }

  return updated;
};

/**
 * Delete a staff member by ID
 */
const deleteStaff = async (id) => {
  return await Staff.findByIdAndDelete(id);
};

/**
 * Clone a faculty member to one or more courses/departments.
 * Places cloned staff at the bottom of the target department list.
 */
const cloneStaff = async (staffId, { targetDepartment, targetDepartments }) => {
  const source = await Staff.findById(staffId).lean();
  if (!source) throw new Error('Source staff member not found');

  const targets = (Array.isArray(targetDepartments) && targetDepartments.length > 0)
    ? targetDepartments
    : (targetDepartment ? [targetDepartment] : []);

  if (!targets.length) throw new Error('At least one target department must be selected');

  const clonedList = [];
  for (const dept of targets) {
    if (!dept || dept === source.department) continue;

    // Check if staff already exists in target department with matching normalizedKey or fullName
    const existing = await Staff.findOne({
      department: dept,
      $or: [
        { normalizedKey: source.normalizedKey },
        { fullName: source.fullName }
      ]
    });

    if (existing) {
      existing.qualification = source.qualification || existing.qualification;
      existing.designation = source.designation || existing.designation;
      existing.photo = source.photo || existing.photo;
      existing.photoPublicId = source.photoPublicId || existing.photoPublicId;
      await existing.save();
      clonedList.push(existing);
      continue;
    }

    // Determine next sNo in target department (placed at the bottom)
    const maxStaff = await Staff.findOne({ department: dept })
      .sort({ sNo: -1 })
      .select('sNo')
      .lean();
    const nextSNo = (maxStaff && typeof maxStaff.sNo === 'number' && maxStaff.sNo > 0)
      ? maxStaff.sNo + 1
      : 1;

    const newStaff = new Staff({
      fullName: source.fullName,
      coreName: source.coreName,
      initial: source.initial,
      normalizedKey: source.normalizedKey,
      qualification: source.qualification || '',
      designation: source.designation || 'Faculty',
      department: dept,
      departments: [dept],
      photo: source.photo || '',
      photoPublicId: source.photoPublicId || '',
      email: source.email || '',
      mobile: source.mobile || '',
      sNo: nextSNo
    });

    const saved = await newStaff.save();
    clonedList.push(saved);
  }

  return clonedList;
};

/**
 * Bulk seed initial faculty from website definitions if database has no staff
 */
const seedInitialStaff = async (facultyList) => {
  if (!Array.isArray(facultyList) || facultyList.length === 0) return { inserted: 0 };

  let count = 0;
  for (const item of facultyList) {
    const parsed = parseStaffName(item.fullName || item.name || '');
    const initial = item.initial || parsed.initial;
    const coreName = parsed.coreName;

    let cleanCore = coreName.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '').replace(/j/g, 'ch');
    const cleanInit = initial.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '');
    const normalizedKey = cleanInit ? `${cleanCore}_${cleanInit}` : cleanCore;

    const existing = await Staff.findOne({
      fullName: item.fullName || item.name,
      department: item.department || ''
    });

    if (!existing) {
      await Staff.create({
        fullName: item.fullName || item.name,
        coreName,
        initial,
        normalizedKey,
        qualification: item.qualification || '',
        designation: item.designation || 'Faculty',
        department: item.department || '',
        departments: item.departments || (item.department ? [item.department] : []),
        photo: item.photo || '',
        sNo: item.sNo || 0
      });
      count++;
    }
  }

  return { inserted: count };
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
  seedInitialStaff
};
