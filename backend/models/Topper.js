const mongoose = require('mongoose');

const TopperSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rank: { type: String, required: true },
  exam: { type: String, required: true },
  score: { type: String, required: true },
  quote: { type: String }, // To display in testimonials
  videoUrl: { type: String }, // YouTube Shorts or video link
  category: { type: String, enum: ['Star Performer', 'JEE', 'NEET', 'MHT-CET'], default: 'JEE' },
  year: { type: String, default: '2026' },
  image: { type: String }, // Path to the uploaded image
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Topper', TopperSchema);
