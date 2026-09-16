const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    programType: {
        type: String,
        required: true,
        enum: ['UG Programmes', 'PG Programmes', 'Ph.D']
    },
    school: {
        type: String,
        required: true,
        trim: true
    },
    schoolAcronym: {
        type: String,
        trim: true
    },
    image: {
        type: String, // Card image
        required: true
    },
    heroImage: {
        type: String
    },
    aboutImage: {
        type: String
    },
    about: {
        type: String
    },
    vision: {
        type: String
    },
    mission: {
        type: String
    },
    facilities: [{
        type: String
    }],
    facilitiesImage: {
        type: String
    },
    careerOpportunities: [{
        title: { type: String },
        description: { type: String }
    }],
    faqs: [{
        question: { type: String },
        answer: { type: String }
    }],
    eligibility: {
        type: String
    },
    keyHighlights: [{
        type: String
    }]
}, {
    timestamps: true
});

// Middleware to auto-generate slug from title if not provided
programSchema.pre('validate', function () {
    if (this.title && !this.slug) {
        this.slug = this.title
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w-]+/g, '')       // Remove all non-word chars
            .replace(/--+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')               // Trim - from start of text
            .replace(/-+$/, '');              // Trim - from end of text
    }
});

module.exports = mongoose.model('Program', programSchema);
