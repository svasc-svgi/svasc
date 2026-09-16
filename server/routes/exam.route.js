const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam/examTimeTable.controller');
const examPortalController = require('../controllers/exam/exam-portal.controller');
const upload = require('../middlewares/uploadMiddleware');

// Portal Config routes (MUST be before /:id to avoid conflict)
router.get('/portal-config', examPortalController.getConfig);
router.put('/portal-config', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]), examPortalController.updateConfig);

// Timetable routes
router.get('/', examController.getAllExams);
router.get('/:id', examController.getExamById);
router.post('/', upload.single('file'), examController.createExam);
router.put('/:id', upload.single('file'), examController.updateExam);
router.delete('/:id', examController.deleteExam);

module.exports = router;
