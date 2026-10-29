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
    default: 'Faculty'
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
  sNo: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Staff', staffSchema);
