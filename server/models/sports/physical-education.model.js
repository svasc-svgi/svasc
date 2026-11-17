const mongoose = require('mongoose');

const physicalEducationSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
        trim: true
    },
    game: {
        type: String,
        required: true,
        trim: true
    },
    icon: {
        type: String,
        default: 'fa-medal',
        trim: true
    },
    color: {
        type: String,
        default: '#243b53',
        trim: true
    },
    image: {
        type: String,
        default: '',
        trim: true
    },
    report: {
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

module.exports = mongoose.model('PhysicalEducation', physicalEducationSchema);
