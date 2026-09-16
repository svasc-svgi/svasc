const mongoose = require('mongoose');

const libraryAwardSchema = new mongoose.Schema({
    category: { type: String, required: true }, // Student, Faculty, NonTeaching
    name: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String },
    image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('LibraryAward', libraryAwardSchema);
