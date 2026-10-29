const Staff = require('../models/staff.model');
const { parseStaffName } = require('../utils/staffParser');

/**
 * Get all staff members with optional filtering by department or search term
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

  return await Staff.find(query).sort({ department: 1, sNo: 1, fullName: 1 }).lean();
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

  const staff = new Staff({
    ...data,
    fullName: data.fullName || data.name,
    coreName,
    initial,
    normalizedKey,
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
  getAllStaff,
  getStaffPhotoMap,
  createStaff,
  updateStaff,
  deleteStaff,
  seedInitialStaff
};
