const mongoose = require('mongoose');

const ScholarshipTypeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  icon: { type: String, default: '🎓' },
  description: { type: String },
  discount: { type: String },
  eligibility: { type: String },
  benefits: { type: [String], default: [] },
  tag: { type: String },
  tagColor: { type: String, default: 'bg-brand-yellow text-brand-dark' },
  gradient: { type: String, default: 'from-blue-600 to-blue-800' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('ScholarshipType', ScholarshipTypeSchema);
