const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');

// Create new admission record
router.post('/submit', async (req, res) => {
  try {
    console.log('📝 Incoming Admission Submission:', req.body);
    const admission = new Admission(req.body);
    await admission.save();
    console.log('✅ Admission Saved Successfully');
    res.status(201).json({ 
      success: true, 
      message: 'Admission form submitted successfully!',
      data: admission
    });
  } catch (error) {
    console.error('❌ Admission Submit Error:', error);
    res.status(500).json({ success: false, message: 'Server error during admission submission', error: error.message });
  }
});

module.exports = router;
