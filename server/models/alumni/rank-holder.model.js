const mongoose = require('mongoose');

const rankHolderSchema = new mongoose.Schema({
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
    rank: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('RankHolder', rankHolderSchema);
