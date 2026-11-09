const mongoose = require('mongoose');

const sportsDaySchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'Sports Day',
        trim: true
    },
    subtitle: {
        type: String,
        default: 'Annual Athletic Meet',
        trim: true
    },
    description: {
        type: String,
        default: 'The Annual Sports Day at Shree Venkateshwara Arts and Science College is a grand celebration of athletic prowess, endurance, and team spirit. Students across all houses compete in a dynamic series of track and field events, relay races, and indoor championships, embodying discipline and true sportsmanship. The meet stands as a vibrant testament to our dedication to student fitness, teamwork, and athletic excellence.',
        trim: true
    },
    pdfUrl: {
        type: String,
        default: '',
        trim: true
    },
    pdfTitle: {
        type: String,
        default: 'Sports Day Event Schedule & Guidelines',
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SportsDay', sportsDaySchema);
