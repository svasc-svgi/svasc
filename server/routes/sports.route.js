const express = require('express');
const router = express.Router();
const sportHouseController = require('../controllers/sports/sport-house.controller');
const sportsDayController = require('../controllers/sports/sports-day.controller');
const physicalEducationController = require('../controllers/sports/physical-education.controller');
const upload = require('../middlewares/uploadMiddleware');

// Department of Physical Education (Achievements / Moving Cards)
router.get('/physical-education', physicalEducationController.getAll);
router.get('/physical-education/:id', physicalEducationController.getById);
router.post('/physical-education', upload.single('image'), physicalEducationController.create);
router.put('/physical-education/:id', upload.single('image'), physicalEducationController.update);
router.delete('/physical-education/:id', physicalEducationController.delete);

// Sports Day Section
router.get('/day', sportsDayController.getSportsDay);
router.put('/day', upload.single('pdf'), sportsDayController.updateSportsDay);
router.post('/day', upload.single('pdf'), sportsDayController.updateSportsDay);

// Sport Houses
router.get('/houses', sportHouseController.getAllHouses);
router.post('/houses', upload.single('image'), sportHouseController.createHouse);
router.put('/houses/:id', upload.single('image'), sportHouseController.updateHouse);
router.delete('/houses/:id', sportHouseController.deleteHouse);

module.exports = router;
