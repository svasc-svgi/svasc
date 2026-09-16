const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogs.controller');
const upload = require('../middlewares/uploadMiddleware');

// Blogs routes
router.get('/', blogsController.getAllBlogs);
router.get('/:id', blogsController.getBlogById);
router.post('/', upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'cardImages', maxCount: 100 }
]), blogsController.createBlog);
router.put('/:id', upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'cardImages', maxCount: 100 }
]), blogsController.updateBlog);
router.delete('/:id', blogsController.deleteBlog);

module.exports = router;
