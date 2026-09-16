const mongoose = require('mongoose');

const awardGallerySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['academic', 'professional', 'achievement', 'industry', 'special', 'research'],
        lowercase: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AwardGallery', awardGallerySchema);
