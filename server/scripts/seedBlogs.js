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

        console.log(`Starting to seed ${DEFAULT_BLOGS.length} blog categories and 24 cards...`);

        for (const def of DEFAULT_BLOGS) {
            const query = { category: new RegExp(`^${def.category.trim()}$`, 'i') };
            const existing = await Blogs.findOne(query);

            let blogDoc;
            if (!existing) {
                blogDoc = await Blogs.create({ ...def });
                console.log(`✅ Created: "${def.category}" with ${def.cards.length} cards`);
            } else {
                blogDoc = await Blogs.findByIdAndUpdate(
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
                console.log(`🔄 Updated/Restored: "${def.category}" with ${def.cards.length} cards`);
            }

            // Also sync to HomeBlog
            if (blogDoc) {
                const plainDesc = (blogDoc.description || '')
                    .replace(/<[^>]+>/g, '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .slice(0, 180);
                const img = blogDoc.bannerImage || (blogDoc.cards && blogDoc.cards[0] ? blogDoc.cards[0].image : '');
                if (img) {
                    await HomeBlog.findOneAndUpdate(
                        { title: blogDoc.category },
                        {
                            title: blogDoc.category,
                            description: plainDesc,
                            image: img,
                            day: 25,
                            month: 'May'
                        },
                        { upsert: true, new: true }
                    );
                }
            }
        }

        console.log('\n🎉 ALL 6 Blog Categories and 24 Cards successfully seeded into MongoDB!');
    } catch (err) {
        console.error('Seed error:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

seedAllBlogs();
