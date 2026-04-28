const mongoose = require('mongoose');

const AssociateConsultantSchema = new mongoose.Schema({
  fullName:    { type: String, required: true, trim: true },
  phone:       { type: String, required: true, trim: true },
  email:       { type: String, required: true, trim: true, lowercase: true },
  profession:  { type: String, default: 'Education Consultant' },
  description: { type: String, default: '' },
  status:      { type: String, default: 'Pending', enum: ['Pending', 'Contacted', 'Onboarded', 'Rejected'] },
  remarks:     { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('AssociateConsultant', AssociateConsultantSchema);
