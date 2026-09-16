const mongoose = require('mongoose');

const deptScheduleSchema = new mongoose.Schema({
    examType: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    details: {
        type: String,
        trim: true
    }
}, { _id: false });

const examPortalConfigSchema = new mongoose.Schema({
    image1: {
        type: String
    },
    image2: {
        type: String
    },
    image3: {
        type: String
    },
    floatingTitle: {
        type: String,
        default: 'Semester Exams'
    },
    floatingDateRange: {
        type: String,
        default: 'Jan 20 - Feb 05'
    },
    floatingSubjects: {
        type: String,
        default: '6 Papers'
    },
    floatingStatus: {
        type: String,
        default: 'Scheduled'
    },
    schedules: {
        type: [deptScheduleSchema],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ExamPortalConfig', examPortalConfigSchema);
