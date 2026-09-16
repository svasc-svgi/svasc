const express = require('express');
const router = express.Router();
const sportHouseController = require('../controllers/sports/sport-house.controller');
const upload = require('../middlewares/uploadMiddleware');

router.get('/houses', sportHouseController.getAllHouses);
router.post('/houses', upload.single('image'), sportHouseController.createHouse);
router.put('/houses/:id', upload.single('image'), sportHouseController.updateHouse);
router.delete('/houses/:id', sportHouseController.deleteHouse);

module.exports = router;
