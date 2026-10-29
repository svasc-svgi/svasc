const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controller');
const upload = require('../middlewares/uploadMiddleware');

// Get fast photo map for frontend
router.get('/photos', staffController.getStaffPhotoMap);

// Sync initial faculty members
router.post('/sync-defaults', staffController.syncDefaultStaff);

// Standard CRUD
router.get('/', staffController.getAllStaff);
router.post('/', upload.single('image'), staffController.createStaff);
router.put('/:id', upload.single('image'), staffController.updateStaff);
router.delete('/:id', staffController.deleteStaff);

module.exports = router;
