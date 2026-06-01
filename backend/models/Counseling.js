const mongoose = require('mongoose');

const counselingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  studentName: { type: String, required: true },
  parentName: { type: String },
  mobile: { type: String },
  whatsapp: { type: String, required: true },
  gender: { type: String },
  schoolName: { type: String, required: true },
  currentClass: { type: String, required: true },
  medium: { type: String },
  stream: { type: String },
  careerInterest: { type: String, required: true },
  guidanceType: [{ type: String }],
  preferredLanguage: { type: String },
  appointmentDate: { type: String },
  appointmentTime: { type: String },
  declaration: { type: Boolean, default: false },
  presence: { type: String },
  status: { type: String, default: 'pending' },
  formNumber: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Counseling', counselingSchema);
