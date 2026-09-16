const mongoose = require('mongoose');

const valueSlideSchema = new mongoose.Schema({
    backgroundImage: {
        type: String,
        required: true
    },
    field1: {
        type: String,
        required: true,
        trim: true
    },
    field2: {
        type: String,
        required: true,
        trim: true
    },
    field3: {
        type: String,
        required: true,
        trim: true
    },
    field4: {
        type: String,
        required: true,
        trim: true
    },
    field5: {
        type: String,
        required: true,
        trim: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ValueSlide', valueSlideSchema);
