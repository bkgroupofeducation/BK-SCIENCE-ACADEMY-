const mongoose = require('mongoose');

const GrievanceSchema = new mongoose.Schema({
  formType:    { type: String, required: true, enum: ['feedback', 'grievance'] },
  fullName:    { type: String, required: true, trim: true },
  phone:       { type: String, required: true, trim: true },
  studentId:   { type: String, default: '', trim: true },
  category:    { type: String, required: true }, // Department or Grievance Type
  message:     { type: String, required: true },
  status:      { type: String, default: 'Open', enum: ['Open', 'Under Review', 'Resolved', 'Closed'] },
  remarks:     { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Grievance', GrievanceSchema);
