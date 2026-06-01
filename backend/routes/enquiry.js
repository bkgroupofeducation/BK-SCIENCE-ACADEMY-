const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Enquiry = require('../models/Enquiry');

// POST /api/enquiry/submit
router.post('/submit', async (req, res) => {
  console.log('📨 Enquiry submission request received:', req.body);
  try {
    const { name, mobile, email, course, message } = req.body;
    
    if (!name || !mobile || !course) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, mobile, and course are required' 
      });
    }

    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid 10-digit mobile number' 
      });
    }

    const enquiry = await Enquiry.create({ name, mobile, email, course, message });
    console.log('✅ Enquiry saved successfully:', enquiry._id);

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted! Our team will call you within 24 hours.',
      id: enquiry._id
    });
  } catch (err) {
    console.error('❌ Enquiry Submission Error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again.', 
      error: err.message 
    });
  }
});

module.exports = router;
