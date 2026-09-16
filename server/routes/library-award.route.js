const express = require('express');
const router = express.Router();
const libraryAwardController = require('../controllers/library/library-award.controller');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', libraryAwardController.getAllAwards);
router.post('/', upload.single('image'), libraryAwardController.createAward);
router.put('/:id', upload.single('image'), libraryAwardController.updateAward);
router.delete('/:id', libraryAwardController.deleteAward);

module.exports = router;
