const express = require('express');
const router = express.Router();
const AdmissionController = require('../controllers/admission.controller');

router.post('/', AdmissionController.createAdmission);
router.get('/', AdmissionController.getAllAdmissions);
router.patch('/mark-all-read', AdmissionController.markAllAsRead);
router.patch('/:id/read', AdmissionController.markAsRead);
router.patch('/:id/status', AdmissionController.updateStatus);
router.delete('/:id', AdmissionController.deleteAdmission);

module.exports = router;
