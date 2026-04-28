const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String },
  dob: { type: String },
  stream: { type: String },
  class: { type: String },
  board: { type: String },
  medium: { type: String },
  mode: { type: String },
  session: { type: String },
  program: { type: String },
  center: { type: String, default: 'BK Science Academy, Nashik' },
  location: { type: String, default: 'Nashik, Maharashtra' },
  registrationFee: { type: Number, default: 1000 },
  paymentStatus: { type: String, default: 'Pending' },
  paymentMethod: { type: String },
  transactionId: { type: String },
  status: { 
    type: String, 
    enum: ['Registered', 'Active', 'Inactive', 'Completed'],
    default: 'Registered' 
  },
  remarks: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Registration', RegistrationSchema);