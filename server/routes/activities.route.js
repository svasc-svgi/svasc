const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activities.controller');
const upload = require('../middlewares/uploadMiddleware');

// Activities routes
router.get('/', activitiesController.getAllActivities);
router.get('/:id', activitiesController.getActivityById);
router.post('/', upload.any(), activitiesController.createActivity);
router.put('/:id', upload.any(), activitiesController.updateActivity);
router.delete('/:id', activitiesController.deleteActivity);

module.exports = router;
