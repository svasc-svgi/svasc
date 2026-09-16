const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/about/certification.controller');
const teacherAwardController = require('../controllers/about/teacher-award.controller');
const upload = require('../middlewares/uploadMiddleware');

// Certification Routes
router.get('/certifications', certificationController.getAllCertifications);
router.post('/certifications', upload.single('image'), certificationController.createCertification);
router.put('/certifications/:id', upload.single('image'), certificationController.updateCertification);
router.delete('/certifications/:id', certificationController.deleteCertification);

// Teacher Award Routes
router.get('/teacher-awards', teacherAwardController.getAllAwards);
router.get('/teacher-awards/grouped', teacherAwardController.getGroupedAwards);
router.post('/teacher-awards', teacherAwardController.createAward);
router.put('/teacher-awards/:id', teacherAwardController.updateAward);
router.delete('/teacher-awards/:id', teacherAwardController.deleteAward);

module.exports = router;
