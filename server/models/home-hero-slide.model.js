const mongoose = require('mongoose');

const homeHeroSlideSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['image', 'video'],
        required: true
    },
    src: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        default: '#'
    },
    linkLabel: {
        type: String,
        default: 'Explore'
    },
    alignLeft: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('HomeHeroSlide', homeHeroSlideSchema);
