const mongoose = require('mongoose');

const latestBlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        default: '#'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('LatestBlog', latestBlogSchema);
