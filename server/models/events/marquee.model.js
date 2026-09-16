const mongoose = require('mongoose');

const eventsMarqueeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    day: {
        type: String,
        required: true,
        trim: true
    },
    month: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default: '#'
    },
    youtubeLink: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('EventsMarquee', eventsMarqueeSchema);
