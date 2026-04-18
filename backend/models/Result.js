const mongoose = require('mongoose');

const ResultItemSchema = new mongoose.Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  credit: { type: Number, required: true },
  grade: { type: String, required: true },
  point: { type: Number, required: true }
});

const ResultSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  track: { type: String, required: true, enum: ['Live Results', 'JEE', 'NEET', 'Olympiads'] },
  semester: { type: String, required: true },
  results: [ResultItemSchema],
  sgpa: { type: Number, default: 4.0 },
  rank: { type: String, default: 'Top 10%' }
}, { timestamps: true });

// Ensure unique combination of student + track + semester
ResultSchema.index({ studentId: 1, track: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model('Result', ResultSchema);
