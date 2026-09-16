const Blogs = require('../models/blogs.model');
const fs = require('fs');
const path = require('path');

const getAllBlogs = async () => {
    return await Blogs.find().sort({ order: 1, createdAt: -1 });
};

const getBlogById = async (id) => {
    return await Blogs.findById(id);
};

const getBlogCount = async () => {
    return await Blogs.countDocuments();
};

const createBlog = async (data) => {
    const blog = new Blogs(data);
    return await blog.save();
};

const updateBlog = async (id, data) => {
    return await Blogs.findByIdAndUpdate(id, data, { new: true });
};

const deleteBlog = async (id) => {
    const blog = await Blogs.findById(id);
    if (blog) {
// Delete banner image
        if (blog.bannerImage) {
            const bannerPath = path.join(__dirname, '..', 'uploads', path.basename(blog.bannerImage));
            if (fs.existsSync(bannerPath)) {
                fs.unlinkSync(bannerPath);
            }
        }
// Delete all card images
        if (blog.cards && blog.cards.length > 0) {
            blog.cards.forEach(card => {
                if (card.image) {
                    const cardImagePath = path.join(__dirname, '..', 'uploads', path.basename(card.image));
                    if (fs.existsSync(cardImagePath)) {
                        fs.unlinkSync(cardImagePath);
                    }
                }
            });
        }
    }
    return await Blogs.findByIdAndDelete(id);
};

module.exports = {
    getAllBlogs,
    getBlogById,
    getBlogCount,
    createBlog,
    updateBlog,
    deleteBlog
};
