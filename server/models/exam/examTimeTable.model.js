const mongoose = require('mongoose');

const examTimeTableSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    examType: {
        type: String,
        required: true,
        trim: true
    },
    file: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ExamTimeTable', examTimeTableSchema);
