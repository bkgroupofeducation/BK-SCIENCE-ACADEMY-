const mongoose = require('mongoose');

const ExamTimerSchema = new mongoose.Schema({
  examName: { type: String, required: true, unique: true }, // e.g. 'JEE', 'NEET', 'MHT-CET', 'Foundation'
  targetDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('ExamTimer', ExamTimerSchema);
