const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');

router.get('/signature', uploadController.getUploadSignature);

module.exports = router;
