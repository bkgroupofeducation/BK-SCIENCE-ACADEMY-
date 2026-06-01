const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Brochure', 'Syllabus', 'Fee Structure', 'Result', 'Announcement', 'Walkthrough', 'Other'],
    default: 'Other' 
  },
  description: { type: String, default: '' },
  fileUrl: { type: String, required: false }, // Optional if videoUrl is present
  videoUrl: { type: String, default: '' },
  visibleOnPage: { 
    type: String, 
    enum: ['none', 'home', 'admission', 'results', 'fees', 'brochure', 'study-center'],
    default: 'none'
  },
  uploadedBy: { type: String, default: 'Admin' },
}, { timestamps: true });

module.exports = mongoose.model('Pdf', PdfSchema);
