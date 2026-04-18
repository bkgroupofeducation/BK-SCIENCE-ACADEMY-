const express = require('express');
const router = express.Router();
const Counseling = require('../models/Counseling');

// Post a new counseling request (Lead generation)
router.post('/book', async (req, res) => {
  try {
    const { fullName, email, mobile, targetExam, location } = req.body;
    
    // Validation
    if (!fullName || !email || !mobile || !targetExam) {
      return res.status(400).json({ message: 'Missing mandatory fields' });
    }

    const lead = await Counseling.create({
      fullName,
      email,
      mobile,
      targetExam,
      location
    });

    res.status(201).json({ 
      success: true, 
      message: 'Demo Class Booked Successfully! Our expert will contact you within 2 hours.',
      id: lead._id 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error during booking', error: err.message });
  }
});

module.exports = router;
