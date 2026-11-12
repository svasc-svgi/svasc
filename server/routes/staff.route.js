const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controller');
const upload = require('../middlewares/uploadMiddleware');

// Get fast photo map for frontend
router.get('/photos', staffController.getStaffPhotoMap);

// Dynamic departments & courses management
router.get('/departments', staffController.getDepartments);
router.post('/departments', staffController.createDepartment);
router.delete('/departments/:name', staffController.deleteDepartment);

// Sync initial faculty members
router.post('/sync-defaults', staffController.syncDefaultStaff);

// Clone staff to course(s)
router.post('/:id/clone', staffController.cloneStaff);

// Standard CRUD
router.get('/', staffController.getAllStaff);
router.post('/', upload.single('image'), staffController.createStaff);
router.put('/:id', upload.single('image'), staffController.updateStaff);
router.delete('/:id', staffController.deleteStaff);

module.exports = router;
