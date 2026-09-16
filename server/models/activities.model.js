const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    designation: { type: String, trim: true },
    phone: { type: String, trim: true, default: '' },   // Optional
    email: { type: String, trim: true, default: '' }    // Optional
}, { _id: false });

const roleSchema = new mongoose.Schema({
    role: { type: String, trim: true },
    responsibility: { type: String, trim: true }
}, { _id: false });

const activityCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        required: true
    },
    // Optional structured fields for card
    vision: { type: String, default: '' },
    mission: { type: String, default: '' },
    objectives: { type: String, default: '' },
    showRoles: { type: Boolean, default: false },
    roles: { type: [roleSchema], default: [] },
    showMembers: { type: Boolean, default: false },
    memberFormat: { type: String, enum: ['table', 'list'], default: 'table' },
    coordinator: { type: String, default: '' },
    memberList: { type: String, default: '' },
    members: { type: [memberSchema], default: [] }
}, { _id: false });

const activitiesSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },
    // Structured fields for category header overview
    categoryMode: { type: String, enum: ['structured', 'html'], default: 'structured' },
    intro: { type: String, default: '' },
    vision: { type: String, default: '' },
    mission: { type: String, default: '' },
    clubsSummary: { type: String, default: '' },
    objectives: { type: String, default: '' },
    description: {
        type: String,
        default: ''
    },
    bannerImage: {
        type: String,
        required: true
    },
    cards: {
        type: [activityCardSchema],
        default: []
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Activities', activitiesSchema);
