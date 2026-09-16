const Blog = require('../../models/home/blog.model');
const fs = require('fs');
const path = require('path');

const getAllBlogs = async () => {
    return await Blog.find().sort({ createdAt: -1 });
};

const getBlogById = async (id) => {
    return await Blog.findById(id);
};

const createBlog = async (data) => {
    const blog = new Blog(data);
    return await blog.save();
};

const updateBlog = async (id, data) => {
    return await Blog.findByIdAndUpdate(id, data, { new: true });
};

const deleteBlog = async (id) => {
    const blog = await Blog.findById(id);
    if (blog && blog.image) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', path.basename(blog.image));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    return await Blog.findByIdAndDelete(id);
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
