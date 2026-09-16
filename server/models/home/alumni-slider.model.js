const mongoose = require('mongoose');

const alumniSliderSchema = new mongoose.Schema({
    subTitle: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        trim: true,
        default: '#'
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AlumniSlider', alumniSliderSchema);
