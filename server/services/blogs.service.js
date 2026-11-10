const Blogs = require('../models/blogs.model');
const { DEFAULT_BLOGS } = require('./blogs.data');
const fs = require('fs');
const path = require('path');

const getAllBlogs = async () => {
    return await Blogs.find().sort({ order: 1, createdAt: -1 }).lean();
};

const getBlogById = async (id) => {
    return await Blogs.findById(id).lean();
};

const getBlogCount = async () => {
    return await Blogs.countDocuments();
};

const createBlog = async (data) => {
    const payload = {
        ...data,
        bannerImage: data.bannerImage || data.image || '',
        image: data.image || data.bannerImage || ''
    };
    const blog = new Blogs(payload);
    return await blog.save();
};

const updateBlog = async (id, data) => {
    const payload = { ...data };
    if (payload.image && !payload.bannerImage) {
        payload.bannerImage = payload.image;
    }
    if (payload.bannerImage && !payload.image) {
        payload.image = payload.bannerImage;
    }
    return await Blogs.findByIdAndUpdate(id, payload, { new: true });
};

const deleteBlog = async (id) => {
    const blog = await Blogs.findById(id);
    if (blog) {
        const imgField = blog.image || blog.bannerImage;
        if (imgField && !imgField.startsWith('http')) {
            const imgPath = path.join(__dirname, '..', 'uploads', path.basename(imgField));
            if (fs.existsSync(imgPath)) {
                try { fs.unlinkSync(imgPath); } catch (e) { /* ignore */ }
            }
        }
    }
    return await Blogs.findByIdAndDelete(id);
};

/**
 * Seed or restore all 24 default blog cards into MongoDB
 * @param {boolean} force - if true, overwrite/upsert all cards with default content
 */
const seedDefaultBlogs = async (force = false) => {
    const results = [];
    for (const def of DEFAULT_BLOGS) {
        const query = { title: new RegExp(`^${def.title.trim()}$`, 'i') };
        const existing = await Blogs.findOne(query);

        if (!existing) {
            const created = await Blogs.create({
                title: def.title,
                category: def.category,
                image: def.image,
                bannerImage: def.image,
                description: def.description,
                author: def.author,
                date: def.date,
                readTime: def.readTime,
                order: def.order
            });
            results.push(created);
        } else if (force) {
            const updated = await Blogs.findByIdAndUpdate(
                existing._id,
                {
                    title: def.title,
                    category: def.category,
                    image: def.image,
                    bannerImage: def.image,
                    description: def.description,
                    author: def.author,
                    date: def.date,
                    readTime: def.readTime,
                    order: def.order
                },
                { new: true }
            );
            results.push(updated);
        } else {
            results.push(existing);
        }
    }
    return results;
};

module.exports = {
    getAllBlogs,
    getBlogById,
    getBlogCount,
    createBlog,
    updateBlog,
    deleteBlog,
    seedDefaultBlogs
};
