const staffService = require('../services/staff.service');
const { uploadToCloudinary } = require('../middlewares/uploadMiddleware');

// Get all dynamic departments & courses
exports.getDepartments = async (req, res) => {
  try {
    const departments = await staffService.getAllDepartments();
    res.status(200).json({
      success: true,
      data: departments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add new department or course
exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const created = await staffService.createDepartment(name);
    res.status(201).json({
      success: true,
      data: created,
      message: 'Department added successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a custom department
exports.deleteDepartment = async (req, res) => {
  try {
    const { name } = req.params;
    await staffService.deleteDepartment(decodeURIComponent(name));
    res.status(200).json({
      success: true,
      message: 'Department removed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const { department, search } = req.query;
    const staff = await staffService.getAllStaff({ department, search });
    res.status(200).json({
      success: true,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Fast photo lookup map { [normalizedKey]: photoUrl }
exports.getStaffPhotoMap = async (req, res) => {
  try {
    const photoMap = await staffService.getStaffPhotoMap();
    res.status(200).json({
      success: true,
      data: photoMap
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create new staff
exports.createStaff = async (req, res) => {
  try {
    const payload = { ...req.body };

    // Support file upload directly via multer or already uploaded Cloudinary URL
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/staff', 'image');
      payload.photo = uploadResult.secure_url;
      payload.photoPublicId = uploadResult.public_id;
    } else if (payload.image && !payload.photo) {
      payload.photo = payload.image;
    }

    if (payload.departments && typeof payload.departments === 'string') {
      try {
        payload.departments = JSON.parse(payload.departments);
      } catch (e) {
        payload.departments = [payload.departments];
      }
    }

    const saved = await staffService.createStaff(payload);
    res.status(201).json({
      success: true,
      data: saved,
      message: 'Staff created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update existing staff
exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/staff', 'image');
      payload.photo = uploadResult.secure_url;
      payload.photoPublicId = uploadResult.public_id;
    } else if (payload.image && !payload.photo) {
      payload.photo = payload.image;
    }

    if (payload.departments && typeof payload.departments === 'string') {
      try {
        payload.departments = JSON.parse(payload.departments);
      } catch (e) {
        payload.departments = [payload.departments];
      }
    }

    const updated = await staffService.updateStaff(id, payload);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
      message: 'Staff updated and photo synced across all departments successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Clone a staff member to another course or multiple courses
exports.cloneStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { targetDepartment, targetDepartments } = req.body;
    const cloned = await staffService.cloneStaff(id, { targetDepartment, targetDepartments });
    res.status(200).json({
      success: true,
      data: cloned,
      message: `Staff cloned successfully to ${cloned.length} department(s)`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete staff
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await staffService.deleteStaff(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Staff member deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Sync default faculty from frontend dataset
exports.syncDefaultStaff = async (req, res) => {
  try {
    const facultyList = req.body.facultyList || [];
    const result = await staffService.seedInitialStaff(facultyList);
    res.status(200).json({
      success: true,
      data: result,
      message: `Synced ${result.inserted} faculty members successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
