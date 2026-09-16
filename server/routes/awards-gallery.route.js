const express = require('express');
const router = express.Router();
const awardGalleryController = require('../controllers/awards-gallery/award-gallery.controller');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', awardGalleryController.getAllAwards);
router.post('/', upload.single('image'), awardGalleryController.createAward);
router.put('/:id', upload.single('image'), awardGalleryController.updateAward);
router.delete('/:id', awardGalleryController.deleteAward);

module.exports = router;
