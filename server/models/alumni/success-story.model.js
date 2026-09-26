const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: 'Gallery Image'
    },
    role: {
        type: String,
        required: false,
        default: ''
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SuccessStory', successStorySchema);
