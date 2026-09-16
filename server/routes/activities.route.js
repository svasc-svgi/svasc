const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activities.controller');
const upload = require('../middlewares/uploadMiddleware');

// Activities routes
router.get('/', activitiesController.getAllActivities);
router.get('/:id', activitiesController.getActivityById);
router.post('/', upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'cardImages', maxCount: 100 }
]), activitiesController.createActivity);
router.put('/:id', upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'cardImages', maxCount: 100 }
]), activitiesController.updateActivity);
router.delete('/:id', activitiesController.deleteActivity);

module.exports = router;
