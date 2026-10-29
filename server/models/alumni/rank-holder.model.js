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
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

// Index for the most common query: sort by year desc, rank asc
rankHolderSchema.index({ year: -1, rank: 1 });

module.exports = mongoose.model('RankHolder', rankHolderSchema);