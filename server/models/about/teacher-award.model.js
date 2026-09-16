const mongoose = require('mongoose');

const teacherAwardSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    awardName: {
        type: String,
        required: true,
        trim: true
    },
    facultyName: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TeacherAward', teacherAwardSchema);
