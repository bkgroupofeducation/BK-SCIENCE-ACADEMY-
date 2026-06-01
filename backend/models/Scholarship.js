const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  scholarshipType: { 
    type: String, 
    required: true
  },
  class: { type: String },
  stream: { type: String },
  status: { 
    type: String, 
    enum: ['New', 'Reviewing', 'Approved', 'Rejected'],
    default: 'New'
  },
  remarks: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
