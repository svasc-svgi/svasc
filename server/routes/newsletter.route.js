const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletter/newsletter.controller');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', newsletterController.getAllNewsletters);
router.post('/', upload.single('file'), newsletterController.createNewsletter);
router.put('/:id', upload.single('file'), newsletterController.updateNewsletter);
router.delete('/:id', newsletterController.deleteNewsletter);

module.exports = router;
