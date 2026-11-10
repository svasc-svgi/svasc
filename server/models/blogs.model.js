const mongoose = require('mongoose');

const blogCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    }
}, { _id: false });

const blogsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        trim: true,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    bannerImage: {
        type: String,
        required: true
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
    cards: {
        type: [blogCardSchema],
        default: []
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

blogsSchema.index({ order: 1, createdAt: -1 });

module.exports = mongoose.model('Blogs', blogsSchema);
