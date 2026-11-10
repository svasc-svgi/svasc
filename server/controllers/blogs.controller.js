const mongoose = require('mongoose');
const BlogsService = require('../services/blogs.service');
const HomeBlog = require('../models/home/blog.model');
const { uploadToCloudinary } = require('../middlewares/uploadMiddleware');

// Helper to automatically sync blog updates to Home Page "SVASC Insightful Blogs"
const syncToHomeBlog = async (blogDoc) => {
    try {
        if (!blogDoc) return;
        const now = new Date(blogDoc.createdAt || Date.now());
        const plainDesc = (blogDoc.description || '')
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 180);

        const img = blogDoc.image || blogDoc.bannerImage || '';
        if (!img) return;

        const blogTitle = blogDoc.title || blogDoc.category || 'Insightful Blog';

        await HomeBlog.findOneAndUpdate(
            { title: blogTitle },
            {
                title: blogTitle,
                description: plainDesc || 'Discover insightful articles and updates from SVASC.',
                image: img,
                day: now.getDate() || 25,
                month: now.toLocaleString('en-US', { month: 'short' }) || 'May'
            },
            { upsert: true, new: true }
        );
    } catch (e) {
        console.warn('Sync to home blog notice:', e.message);
    }
};

const getAllBlogs = async (req, res) => {
    try {
        // Auto-seed all independent cards if DB has fewer than 34 cards
        const count = await BlogsService.getBlogCount();
        if (count < 34) {
            await BlogsService.seedDefaultBlogs(false);
        }

        const blogs = await BlogsService.getAllBlogs();
        res.status(200).json({
            success: true,
            data: blogs,
            message: "Blogs fetched successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid blog ID format" });
        }
        const blog = await BlogsService.getBlogById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, data: blog, message: "Blog fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const seedDefaultBlogs = async (req, res) => {
    try {
        const force = req.body?.force === true;
        const seeded = await BlogsService.seedDefaultBlogs(force);

        // Sync first 6 to Home Blogs
        for (const blog of seeded.slice(0, 6)) {
            await syncToHomeBlog(blog);
        }

        res.status(200).json({
            success: true,
            data: seeded,
            message: `Successfully seeded/synced ${seeded.length} independent blog cards`
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createBlog = async (req, res) => {
    try {
        const {
            category,
            title,
            description,
            author,
            date,
            readTime,
            order,
            image: textImage,
            bannerImage: textBanner
        } = req.body;

        if (!title && !category) {
            return res.status(400).json({ success: false, message: "Title or Category is required" });
        }

        // Handle Image
        let imageUrl = textImage || textBanner || req.body.image || req.body.bannerImage || '';
        
        if (req.files) {
            const fileObj = (req.files.image && req.files.image[0]) || (req.files.bannerImage && req.files.bannerImage[0]);
            if (fileObj) {
                const uploadResult = await uploadToCloudinary(fileObj.buffer, 'svasc/blogs', 'image');
                imageUrl = uploadResult.secure_url;
            }
        } else if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/blogs', 'image');
            imageUrl = uploadResult.secure_url;
        }

        const currentCount = await BlogsService.getBlogCount();

        const blog = await BlogsService.createBlog({
            category: category || 'SVASC News',
            title: title || category,
            description: description || '',
            image: imageUrl,
            bannerImage: imageUrl,
            author: author || 'SVASC Editorial',
            date: date || '25 May, 2026',
            readTime: readTime || '4 min read',
            order: order !== undefined ? Number(order) : currentCount
        });

        // Automatically sync to Home Page "SVASC Insightful Blogs"
        await syncToHomeBlog(blog);

        res.status(201).json({ success: true, data: blog, message: "Blog card created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid blog ID format" });
        }

        const {
            category,
            title,
            description,
            author,
            date,
            readTime,
            order,
            image: textImage,
            bannerImage: textBanner
        } = req.body;

        let updateData = {};
        if (category !== undefined) updateData.category = category;
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (author !== undefined) updateData.author = author;
        if (date !== undefined) updateData.date = date;
        if (readTime !== undefined) updateData.readTime = readTime;
        if (order !== undefined) updateData.order = Number(order);

        // Handle uploaded image file
        if (req.files) {
            const fileObj = (req.files.image && req.files.image[0]) || (req.files.bannerImage && req.files.bannerImage[0]);
            if (fileObj) {
                const uploadResult = await uploadToCloudinary(fileObj.buffer, 'svasc/blogs', 'image');
                updateData.image = uploadResult.secure_url;
                updateData.bannerImage = uploadResult.secure_url;
            }
        } else if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, 'svasc/blogs', 'image');
            updateData.image = uploadResult.secure_url;
            updateData.bannerImage = uploadResult.secure_url;
        }

        // If direct image URL provided via form body
        if (textImage !== undefined && textImage !== '') {
            updateData.image = textImage;
            updateData.bannerImage = textImage;
        } else if (textBanner !== undefined && textBanner !== '') {
            updateData.image = textBanner;
            updateData.bannerImage = textBanner;
        }

        const updatedBlog = await BlogsService.updateBlog(id, updateData);

        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: "Blog card not found" });
        }

        // Sync update to Home Blog
        await syncToHomeBlog(updatedBlog);

        res.status(200).json({ success: true, data: updatedBlog, message: "Blog card updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid blog ID format" });
        }
        const deletedBlog = await BlogsService.deleteBlog(id);
        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: "Blog card not found" });
        }
        res.status(200).json({ success: true, message: "Blog card deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    seedDefaultBlogs,
    createBlog,
    updateBlog,
    deleteBlog
};
