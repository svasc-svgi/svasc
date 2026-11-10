const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Blogs = require('../models/blogs.model');
const HomeBlog = require('../models/home/blog.model');
const { DEFAULT_BLOGS } = require('../services/blogs.data');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/college-website';

async function seedAllBlogs() {
    console.log('Connecting to MongoDB...');
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully! 🚀');

        console.log(`Starting to seed ${DEFAULT_BLOGS.length} independent blog cards...`);

        let count = 0;
        for (const def of DEFAULT_BLOGS) {
            const query = { title: new RegExp(`^${def.title.trim()}$`, 'i') };
            const existing = await Blogs.findOne(query);

            let blogDoc;
            if (!existing) {
                blogDoc = await Blogs.create({
                    title: def.title,
                    category: def.category,
                    image: def.image,
                    bannerImage: def.image,
                    description: def.description,
                    author: def.author,
                    date: def.date,
                    readTime: def.readTime,
                    order: def.order !== undefined ? def.order : count
                });
                console.log(`✅ Created: [${def.category}] "${def.title}"`);
            } else {
                blogDoc = await Blogs.findByIdAndUpdate(
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
                        order: def.order !== undefined ? def.order : count
                    },
                    { new: true }
                );
                console.log(`🔄 Updated/Restored: [${def.category}] "${def.title}"`);
            }

            // Sync to HomeBlog
            if (blogDoc && count < 6) {
                const plainDesc = (blogDoc.description || '')
                    .replace(/<[^>]+>/g, '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .slice(0, 180);

                const blogTitle = blogDoc.title || blogDoc.category || 'Insightful Blog';

                await HomeBlog.findOneAndUpdate(
                    { title: blogTitle },
                    {
                        title: blogTitle,
                        description: plainDesc,
                        image: blogDoc.image || blogDoc.bannerImage,
                        day: 25,
                        month: 'May'
                    },
                    { upsert: true, new: true }
                );
            }
            count++;
        }

        console.log(`\n🎉 All ${DEFAULT_BLOGS.length} blog cards successfully seeded and synced!`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Error during seeding:', err);
        process.exit(1);
    }
}

seedAllBlogs();
