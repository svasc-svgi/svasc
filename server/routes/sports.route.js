const express = require('express');
const router = express.Router();
const sportHouseController = require('../controllers/sports/sport-house.controller');
const sportsDayController = require('../controllers/sports/sports-day.controller');
const upload = require('../middlewares/uploadMiddleware');

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
