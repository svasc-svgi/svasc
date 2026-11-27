const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    qualification: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        default: '',
        trim: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Admitted', 'Archived'],
        default: 'New'
    }
}, {
    timestamps: true
});

admissionSchema.index({ createdAt: -1 });
admissionSchema.index({ isRead: 1 });

module.exports = mongoose.model('Admission', admissionSchema);
