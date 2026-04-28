const express = require('express');
const router = express.Router();
const AssociateConsultant = require('../models/AssociateConsultant');

// POST /api/associate/apply
router.post('/apply', async (req, res) => {
  try {
    const { fullName, phone, email, profession, description } = req.body;

    if (!fullName || !phone || !email) {
      return res.status(400).json({ success: false, message: 'Full name, phone, and email are required.' });
    }

    if (!/^\d{10,15}$/.test(phone.replace(/[\s+\-()]/g, ''))) {
      return res.status(400).json({ success: false, message: 'Please provide a valid contact number.' });
    }

    const entry = await AssociateConsultant.create({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      profession: profession || 'Education Consultant',
      description: description || '',
    });

    res.status(201).json({
      success: true,
      message: 'Your partnership application has been received! Our team will contact you within 24 hours.',
      id: entry._id,
    });
  } catch (err) {
    console.error('Associate Consultant Apply Error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
