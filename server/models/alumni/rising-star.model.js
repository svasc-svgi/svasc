const mongoose = require('mongoose');

const risingStarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    degree: {
        type: String,
        required: true,
        trim: true
    },
    video: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('RisingStar', risingStarSchema);
