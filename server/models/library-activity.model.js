const mongoose = require('mongoose');

const libraryActivitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    desc: { type: String, required: true },
    image1: { type: String },
    image2: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('LibraryActivity', libraryActivitySchema);
