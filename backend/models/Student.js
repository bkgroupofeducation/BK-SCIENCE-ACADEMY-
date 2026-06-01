const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dept: { type: String, default: 'Science' },
  batch: { type: String, default: 'Regular' },
  avatar: { type: String, default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ontar' }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
