const mongoose = require('mongoose');

const sportHouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    subtitle: {
        type: String,
        default: '',
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    offset: {
        type: Boolean,
        default: false
    },
    custom: {
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

module.exports = mongoose.model('SportHouse', sportHouseSchema);
