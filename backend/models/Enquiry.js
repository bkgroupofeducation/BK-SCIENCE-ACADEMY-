const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  course: { type: String, required: true },
  message: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'],
    default: 'New'
  },
  remarks: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
