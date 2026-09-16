const mongoose = require('mongoose');

const eventsGridSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: {
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
    order: {
        type: Number,
        default: 0
    },
    spanTwoCols: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('EventsGrid', eventsGridSchema);
