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

/**
 * Seed or restore default blogs into MongoDB
 * @param {boolean} force - if true, overwrite/upsert all standard categories with default content
 */
const seedDefaultBlogs = async (force = false) => {
    const results = [];
    for (const def of DEFAULT_BLOGS) {
        const query = { category: new RegExp(`^${def.category.trim()}$`, 'i') };
        const existing = await Blogs.findOne(query);

        if (!existing) {
            const created = await Blogs.create({ ...def });
            results.push(created);
        } else if (force) {
            const updated = await Blogs.findByIdAndUpdate(
                existing._id,
                {
                    title: def.title,
                    description: def.description,
                    bannerImage: def.bannerImage,
                    author: def.author,
                    date: def.date,
                    readTime: def.readTime,
                    cards: def.cards,
                    order: def.order
                },
                { new: true }
            );
            results.push(updated);
        } else {
            // If existing document has 0 cards, populate with default cards
            if (!existing.cards || existing.cards.length === 0) {
                existing.cards = def.cards;
                await existing.save();
            }
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
