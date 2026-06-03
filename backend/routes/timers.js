const express = require('express');
const router = express.Router();
const ExamTimer = require('../models/ExamTimer');

// GET /api/timers — Fetch all active exam countdown timers
router.get('/', async (req, res) => {
  try {
    const timers = await ExamTimer.find({ isActive: true });
    res.json({ success: true, data: timers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/timers/:examName — Fetch a specific exam timer by name (case-insensitive)
router.get('/:examName', async (req, res) => {
  try {
    const { examName } = req.params;
    const timer = await ExamTimer.findOne({
      examName: { $regex: new RegExp(`^${examName.trim()}$`, 'i') },
      isActive: true
    });
    res.json({ success: true, data: timer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
