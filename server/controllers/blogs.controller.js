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

        const blogTitle = blogDoc.category || blogDoc.title || 'Insightful Blog';

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
        // Auto-seed all default 6 categories and 24 cards if DB has less than 6 blogs
        const count = await BlogsService.getBlogCount();
        if (count < 6) {
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

        // Sync all to Home Blogs
        for (const blog of seeded) {
            await syncToHomeBlog(blog);
        }

        res.status(200).json({
            success: true,
            data: seeded,
            message: `Successfully seeded/synced ${seeded.length} standard blog categories and cards`
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
            cardTitles,
            cardDescriptions,
            bannerImage: textBanner,
            cards: textCards
        } = req.body;

        if (!category) {
            return res.status(400).json({ success: false, message: "Category is required" });
        }

        // 1. Handle Banner Image
        let bannerImageUrl = textBanner || req.body.bannerImage || '';
        if (req.files && req.files.bannerImage && req.files.bannerImage[0]) {
            const uploadResult = await uploadToCloudinary(req.files.bannerImage[0].buffer, 'svasc/blogs/banners', 'image');
            bannerImageUrl = uploadResult.secure_url;
        }

        // 2. Handle Cards
        let cards = [];
        if (textCards !== undefined) {
            try {
                cards = typeof textCards === 'string' ? JSON.parse(textCards) : textCards;
            } catch (e) {
                cards = [];
            }
        } else if (req.body.cards !== undefined) {
            cards = Array.isArray(req.body.cards) ? req.body.cards : [];
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
            title: title || category,
            description: description || '',
            bannerImage: bannerImageUrl || '',
            author: author || 'SVASC Editorial',
            date: date || '25 May, 2026',
            readTime: readTime || '4 min read',
            cards,
            order: order !== undefined ? Number(order) : currentCount
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
        const {
            category,
            title,
            description,
            author,
            date,
            readTime,
            order,
            cardTitles,
            cardDescriptions,
            bannerImage: textBanner,
            cards: textCards
        } = req.body;

        let updateData = {};
        if (category) updateData.category = category;
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (author !== undefined) updateData.author = author;
        if (date !== undefined) updateData.date = date;
        if (readTime !== undefined) updateData.readTime = readTime;
        if (order !== undefined) updateData.order = Number(order);

        if (req.files && req.files.bannerImage && req.files.bannerImage.length > 0) {
            const uploadResult = await uploadToCloudinary(req.files.bannerImage[0].buffer, 'svasc/blogs/banners', 'image');
            updateData.bannerImage = uploadResult.secure_url;
        } else if (textBanner !== undefined && textBanner !== '') {
            updateData.bannerImage = textBanner;
        } else if (req.body.bannerImage !== undefined) {
            updateData.bannerImage = req.body.bannerImage;
        }

        if (textCards !== undefined) {
            try {
                updateData.cards = typeof textCards === 'string' ? JSON.parse(textCards) : textCards;
            } catch (e) {
                // Ignore parse error
            }
        } else if (req.body.cards !== undefined) {
            updateData.cards = Array.isArray(req.body.cards) ? req.body.cards : [];
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
        if (deletedBlog.category || deletedBlog.title) {
            const titleToRemove = deletedBlog.category || deletedBlog.title;
            await HomeBlog.findOneAndDelete({ title: titleToRemove }).catch(() => {});
        }

        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    seedDefaultBlogs
};
