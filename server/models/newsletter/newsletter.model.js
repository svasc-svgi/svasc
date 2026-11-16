const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    coverImage: {
        type: String,
        trim: true,
        default: '/newsletter/newsletter_cover.jpg'
    },
    pdf: {
        type: String,
        required: true
    },
    byline: {
        type: String,
        trim: true,
        default: 'CAMPUS EDITORIAL DESK'
    },
    date: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
