const BlogService = require('../../services/home/blog.service');
const path = require('path');
const fs = require('fs');

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogService.getAllBlogs();
        res.status(200).json({
            success: true,
            data: blogs,
            message: "Blogs fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await BlogService.getBlogById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }
        res.status(200).json({
            success: true,
            data: blog,
            message: "Blog fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createBlog = async (req, res) => {
    try {
        const { title, day, month, description } = req.body;
        
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        const blog = await BlogService.createBlog({ title, day, month, description, image: imagePath });
        res.status(201).json({
            success: true,
            data: blog,
            message: "Blog created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, day, month, description } = req.body;
        let updateData = { title, day, month, description };

        if (req.file) {
            const oldBlog = await BlogService.getBlogById(id);
            if (oldBlog && oldBlog.image) {
                const oldFilePath = path.join(__dirname, '..', '..', 'uploads', path.basename(oldBlog.image));
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const updatedBlog = await BlogService.updateBlog(id, updateData);
        if (!updatedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }
        res.status(200).json({
            success: true,
            data: updatedBlog,
            message: "Blog updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await BlogService.deleteBlog(id);
        if (!deletedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }
        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
