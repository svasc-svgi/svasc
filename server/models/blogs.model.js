const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: ''
    },
    bannerImage: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true,
        default: ''
    },
    author: {
        type: String,
        trim: true,
        default: 'SVASC Editorial'
    },
    date: {
        type: String,
        trim: true,
        default: '25 May, 2026'
    },
    readTime: {
        type: String,
        trim: true,
        default: '4 min read'
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

blogsSchema.index({ order: 1, createdAt: -1 });
blogsSchema.index({ category: 1 });
blogsSchema.index({ title: 1 });

module.exports = mongoose.model('Blogs', blogsSchema);
