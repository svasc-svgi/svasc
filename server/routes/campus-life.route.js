const express = require('express');
const router = express.Router();
const campusLifeController = require('../controllers/campus-life/campus-life.controller');
const upload = require('../middlewares/uploadMiddleware');

// Gallery routes
router.get('/gallery', campusLifeController.getAllGallery);
router.post('/gallery', upload.single('image'), campusLifeController.createGallery);
router.put('/gallery/:id', upload.single('image'), campusLifeController.updateGallery);
router.delete('/gallery/:id', campusLifeController.deleteGallery);

// Scroll items routes
router.get('/scroll-items', campusLifeController.getAllScroll);
router.post('/scroll-items', upload.single('image'), campusLifeController.createScroll);
router.put('/scroll-items/:id', upload.single('image'), campusLifeController.updateScroll);
router.delete('/scroll-items/:id', campusLifeController.deleteScroll);

module.exports = router;
