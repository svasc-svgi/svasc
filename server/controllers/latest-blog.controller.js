const latestBlogService = require('../services/latest-blog.service');
const path = require('path');
const fs = require('fs');

class LatestBlogController {
    async createBlog(req, res) {
        try {
            const { title, date, link } = req.body;
            
            const data = {
                title,
                date,
                link,
                image: req.file ? `uploads/${req.file.filename}` : ''
            };

            const blog = await latestBlogService.createBlog(data);
            res.status(201).json({ success: true, data: blog, message: 'Blog created successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getAllBlogs(req, res) {
        try {
            const blogs = await latestBlogService.getAllBlogs();
            res.status(200).json({ success: true, data: blogs });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateBlog(req, res) {
        try {
            const { id } = req.params;
            const { title, date, link } = req.body;
            const updateData = { title, date, link };

            if (req.file) {
                const oldBlog = await latestBlogService.getBlogById(id);
                if (oldBlog && oldBlog.image) {
                    const oldFilePath = path.join(__dirname, '..', 'uploads', path.basename(oldBlog.image));
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
                updateData.image = `uploads/${req.file.filename}`;
            }

            const blog = await latestBlogService.updateBlog(id, updateData);
            if (!blog) {
                return res.status(404).json({ success: false, message: 'Blog not found' });
            }
            res.status(200).json({ success: true, data: blog });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteBlog(req, res) {
        try {
            const { id } = req.params;
            const blog = await latestBlogService.getBlogById(id);
            if (!blog) {
                return res.status(404).json({ success: false, message: 'Blog not found' });
            }

            if (blog.image) {
                const filePath = path.join(__dirname, '..', 'uploads', path.basename(blog.image));
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            await latestBlogService.deleteBlog(id);
            res.status(200).json({ success: true, message: 'Blog deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new LatestBlogController();
