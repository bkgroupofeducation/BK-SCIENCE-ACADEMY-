const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Inline schema for enquiry — keeps it simple without polluting models/
const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  course: { type: String, required: true },
  message: { type: String, default: '' },
}, { timestamps: true });

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);

// POST /api/enquiry/submit
router.post('/submit', async (req, res) => {
  try {
    const { name, mobile, course, message } = req.body;

    if (!name || !mobile || !course) {
      return res.status(400).json({ success: false, message: 'Name, mobile, and course are required' });
    }

    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number' });
    }

    const enquiry = await Enquiry.create({ name, mobile, course, message });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted! Our team will call you within 24 hours.',
      id: enquiry._id
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error. Please try again.', error: err.message });
  }
});

module.exports = router;
