const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
  // Personal Info
  salutation:    { type: String },
  firstName:     { type: String, required: true },
  middleName:    { type: String },
  surname:       { type: String, required: true },
  firstNameLocal: { type: String },
  middleNameLocal: { type: String },
  surnameLocal:  { type: String },
  
  fatherName:    { type: String },
  motherName:    { type: String },
  dob:           { type: String },
  age:           { type: Number },
  gender:        { type: String },
  
  // Contact (Made optional to resolve validation errors)
  email:         { type: String, required: false },
  mobileSelf:    { type: String, required: false },
  mobileParents: { type: String },
  
  // Academic
  schoolName:    { type: String },
  examCategory:  { type: String },
  courses:       [{ type: String }],
  edu10th:       { board: String, year: String, marks: String },
  edu12th:       { board: String, year: String, marks: String },
  
  // Address
  currentAddress: { door: String, street: String, city: String, taluka: String, district: String, state: String, pincode: String },
  permanentAddress: { door: String, street: String, city: String, taluka: String, district: String, state: String, pincode: String },
  
  // Assets
  photo:         { type: String },
  signature:     { type: String },
  
  status: { 
    type: String, 
    enum: ['Pending Review', 'Approved', 'Rejected', 'On Hold'],
    default: 'Pending Review' 
  },
  formNumber: { type: Number, unique: true },
  remarks: { type: String, default: '' }
}, { timestamps: true });

// Check if model already exists before defining it
module.exports = mongoose.models.Admission || mongoose.model('Admission', AdmissionSchema);
