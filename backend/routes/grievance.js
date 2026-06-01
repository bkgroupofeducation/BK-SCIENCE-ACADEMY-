const express = require('express');
const router = express.Router();
const Grievance = require('../models/Grievance');

// POST /api/grievance/submit
router.post('/submit', async (req, res) => {
  try {
    const { formType, fullName, phone, studentId, category, message } = req.body;

    if (!formType || !fullName || !phone || !category || !message) {
      return res.status(400).json({ success: false, message: 'Full name, phone, category, and message are required.' });
    }

    if (!['feedback', 'grievance'].includes(formType)) {
      return res.status(400).json({ success: false, message: 'Invalid form type.' });
    }

    if (!/^\d{10}$/.test(phone.replace(/\D/g, '').slice(-10))) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number.' });
    }

    const entry = await Grievance.create({
      formType,
      fullName: fullName.trim(),
      phone: phone.trim(),
      studentId: studentId ? studentId.trim() : '',
      category: category.trim(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Your submission has been received. Our team will review it shortly.',
      id: entry._id,
    });
  } catch (err) {
    console.error('Grievance Submit Error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
