const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Brochure', 'Syllabus', 'Fee Structure', 'Result', 'Announcement', 'Other'],
    default: 'Other' 
  },
  description: { type: String, default: '' },
  fileUrl: { type: String, required: true }, // Path to the file in /uploads/
  visibleOnPage: { 
    type: String, 
    enum: ['none', 'home', 'admission', 'results', 'fees', 'brochure'],
    default: 'none'
  },
  uploadedBy: { type: String, default: 'Admin' },
}, { timestamps: true });

module.exports = mongoose.model('Pdf', PdfSchema);
