const mongoose = require('mongoose');

const CounselingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  targetExam: { type: String, required: true },
  location: { type: String },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Counseling', CounselingSchema);
