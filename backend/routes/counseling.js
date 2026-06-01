const express = require('express');
const router = express.Router();
const Counseling = require('../models/Counseling');

// Submit counseling request
router.post('/submit', async (req, res) => {
  try {
    // Generate a simple form number (count + 1)
    const count = await Counseling.countDocuments();
    const counselingData = {
      ...req.body,
      formNumber: 1000 + count + 1
    };

    const counseling = new Counseling(counselingData);
    await counseling.save();
    res.status(201).json({ 
      success: true, 
      message: 'Counseling request submitted successfully!',
      data: counseling 
    });
  } catch (err) {
    console.error('Counseling submission error:', err);
    res.status(500).json({ success: false, message: 'Failed to submit counseling request.' });
  }
});

// Get all counseling requests (Admin only - though we don't have middleware here yet, following existing patterns)
router.get('/all', async (req, res) => {
  try {
    const requests = await Counseling.find().sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch counseling requests.' });
  }
});

// Update status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    await Counseling.findByIdAndUpdate(req.params.id, { status });
    res.json({ success: true, message: 'Status updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
});

// Delete request
router.delete('/:id', async (req, res) => {
  try {
    await Counseling.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Request deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete request' });
  }
});

module.exports = router;
