const express = require('express');
const router = express.Router();
const latestBlogController = require('../controllers/latest-blog.controller');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', latestBlogController.getAllBlogs);
router.post('/', upload.single('image'), latestBlogController.createBlog);
router.put('/:id', upload.single('image'), latestBlogController.updateBlog);
router.delete('/:id', latestBlogController.deleteBlog);

module.exports = router;
