const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  parentName: { type: String, required: true },
  parentMobile: { type: String, required: true },
  
  // Academic
  class: { type: String, required: true },
  target: { type: String, required: true },
  mode: { type: String, required: true },
  previousScore: { type: String },
  
  // Final
  address: { type: String, required: true },
  scholarship: { type: String, default: 'No' },
  referredBy: { type: String },
  
  status: { type: String, default: 'Pending Review' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admission', AdmissionSchema);
