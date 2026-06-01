const mongoose = require('mongoose');

const ScholarshipConfigSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  stats: {
    categories: { type: String, default: '4' },
    maxWaiver: { type: String, default: '100%' },
    awarded: { type: String, default: '500+' },
    disbursed: { type: String, default: '₹2Cr+' }
  }
}, { timestamps: true });

module.exports = mongoose.model('ScholarshipConfig', ScholarshipConfigSchema);
