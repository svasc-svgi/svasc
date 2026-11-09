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

        const img = blogDoc.bannerImage || (blogDoc.cards && blogDoc.cards[0] ? blogDoc.cards[0].image : '');
        if (!img) return;

        await HomeBlog.findOneAndUpdate(
            { title: blogDoc.category },
            {
                title: blogDoc.category,
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
        const blog = await BlogsService.getBlogById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, data: blog, message: "Blog fetched successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createBlog = async (req, res) => {
    try {
        const { category, description, cardTitles, cardDescriptions, bannerImage: textBanner, cards: textCards } = req.body;

        if (!category) {
            return res.status(400).json({ success: false, message: "Category is required" });
        }

        // 1. Handle Banner Image
        let bannerImageUrl = textBanner || '';
        if (req.files && req.files.bannerImage && req.files.bannerImage[0]) {
            const uploadResult = await uploadToCloudinary(req.files.bannerImage[0].buffer, 'svasc/blogs/banners', 'image');
            bannerImageUrl = uploadResult.secure_url;
        }

        // 2. Handle Cards
        let cards = [];
        if (textCards) {
            try {
                cards = typeof textCards === 'string' ? JSON.parse(textCards) : textCards;
            } catch (e) {
                cards = [];
            }
        } else if (req.files && req.files.cardImages && req.files.cardImages.length > 0) {
            let parsedCardTitles = [];
            let parsedCardDescriptions = [];
            if (cardTitles) {
                try { parsedCardTitles = JSON.parse(cardTitles); } catch (e) { parsedCardTitles = []; }
            }
            if (cardDescriptions) {
                try { parsedCardDescriptions = JSON.parse(cardDescriptions); } catch (e) { parsedCardDescriptions = []; }
            }

            for (let index = 0; index < req.files.cardImages.length; index++) {
                const file = req.files.cardImages[index];
                const uploadResult = await uploadToCloudinary(file.buffer, 'svasc/blogs/cards', 'image');
                cards.push({
                    title: parsedCardTitles[index] || '',
                    description: parsedCardDescriptions[index] || '',
                    image: uploadResult.secure_url
                });
            }
        }

        const currentCount = await BlogsService.getBlogCount();

        const blog = await BlogsService.createBlog({
            category,
            description: description || '',
            bannerImage: bannerImageUrl || '',
            cards,
            order: currentCount
        });

        // Automatically sync to Home Page "SVASC Insightful Blogs"
        await syncToHomeBlog(blog);

        res.status(201).json({ success: true, data: blog, message: "Blog created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, description, cardTitles, cardDescriptions, bannerImage: textBanner, cards: textCards } = req.body;
        let updateData = {};
        if (category) updateData.category = category;
        if (description !== undefined) updateData.description = description;

        if (req.files && req.files.bannerImage && req.files.bannerImage.length > 0) {
            const uploadResult = await uploadToCloudinary(req.files.bannerImage[0].buffer, 'svasc/blogs/banners', 'image');
            updateData.bannerImage = uploadResult.secure_url;
        } else if (textBanner !== undefined && textBanner !== '') {
            updateData.bannerImage = textBanner;
        }

        if (textCards !== undefined) {
            try {
                updateData.cards = typeof textCards === 'string' ? JSON.parse(textCards) : textCards;
            } catch (e) {
                // Ignore parse error
            }
        } else if (req.files && req.files.cardImages && req.files.cardImages.length > 0) {
            let parsedCardTitles = [];
            let parsedCardDescriptions = [];
            if (cardTitles) {
                try { parsedCardTitles = JSON.parse(cardTitles); } catch (e) { parsedCardTitles = []; }
            }
            if (cardDescriptions) {
                try { parsedCardDescriptions = JSON.parse(cardDescriptions); } catch (e) { parsedCardDescriptions = []; }
            }

            const uploadedCards = [];
            for (let index = 0; index < req.files.cardImages.length; index++) {
                const file = req.files.cardImages[index];
                const uploadResult = await uploadToCloudinary(file.buffer, 'svasc/blogs/cards', 'image');
                uploadedCards.push({
                    title: parsedCardTitles[index] || '',
                    description: parsedCardDescriptions[index] || '',
                    image: uploadResult.secure_url
                });
            }
            updateData.cards = uploadedCards;
        }

        const updatedBlog = await BlogsService.updateBlog(id, updateData);
        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Automatically sync to Home Page "SVASC Insightful Blogs"
        await syncToHomeBlog(updatedBlog);

        res.status(200).json({ success: true, data: updatedBlog, message: "Blog updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await BlogsService.deleteBlog(id);
        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Clean up from Home Blog if present
        if (deletedBlog.category) {
            await HomeBlog.findOneAndDelete({ title: deletedBlog.category }).catch(() => {});
        }

        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
