const express = require('express');
const router = express.Router();
const libraryActivityController = require('../controllers/library/library-activity.controller');
const upload = require('../middlewares/uploadMiddleware');

const multiUpload = upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 }
]);

router.get('/', libraryActivityController.getAllActivities);
router.post('/', multiUpload, libraryActivityController.createActivity);
router.put('/:id', multiUpload, libraryActivityController.updateActivity);
router.delete('/:id', libraryActivityController.deleteActivity);

module.exports = router;
