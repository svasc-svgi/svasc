const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  coreName: {
    type: String,
    trim: true,
    default: ''
  },
  initial: {
    type: String,
    trim: true,
    default: ''
  },
  normalizedKey: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  qualification: {
    type: String,
    trim: true,
    default: ''
  },
  designation: {
    type: String,
    trim: true,
    default: 'Assistant Professor'
  },
  department: {
    type: String,
    trim: true,
    default: ''
  },
  departments: [{
    type: String,
    trim: true
  }],
  photo: {
    type: String,
    trim: true,
    default: ''
  },
  photoPublicId: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    trim: true,
    default: ''
  },
  mobile: {
    type: String,
    trim: true,
    default: ''
  },
  contactNo: {
    type: String,
    trim: true,
    default: ''
  },
  sNo: {
    type: Number,
    default: 0
  },
  // Detailed Profile Information
  education: {
    ug: { type: String, trim: true, default: '' },
    pg: { type: String, trim: true, default: '' },
    doctorate: { type: String, trim: true, default: '' },
    other: { type: String, trim: true, default: '' }
  },
  experience: {
    teaching: { type: String, trim: true, default: '' },
    industry: { type: String, trim: true, default: '' },
    research: { type: String, trim: true, default: '' },
    total: { type: String, trim: true, default: '' }
  },
  specialization: {
    type: String,
    trim: true,
    default: ''
  },
  publications: {
    scopus: {
      international: { type: String, trim: true, default: '' },
      national: { type: String, trim: true, default: '' }
    },
    peerReviewed: {
      international: { type: String, trim: true, default: '' },
      national: { type: String, trim: true, default: '' }
    },
    webOfScience: {
      international: { type: String, trim: true, default: '' },
      national: { type: String, trim: true, default: '' }
    },
    others: {
      international: { type: String, trim: true, default: '' },
      national: { type: String, trim: true, default: '' }
    }
  },
  conferences: {
    international: { type: String, trim: true, default: '' },
    national: { type: String, trim: true, default: '' }
  },
  books: {
    type: String,
    trim: true,
    default: ''
  },
  workshops: {
    type: String,
    trim: true,
    default: ''
  },
  fdp: {
    type: String,
    trim: true,
    default: ''
  },
  researchGuidance: {
    awarded: { type: String, trim: true, default: '' },
    undergoing: { type: String, trim: true, default: '' }
  },
  researchProjects: {
    completed: { type: String, trim: true, default: '' },
    undergoing: { type: String, trim: true, default: '' }
  },
  awards: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Staff', staffSchema);
