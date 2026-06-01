const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// @route   POST /api/support/ticket
// @desc    Raise a support ticket
router.post('/ticket', async (req, res) => {
  try {
    console.log('📨 Ticket Payload:', req.body);
    const { name, phone, issue } = req.body;
    if (!name || !phone) {
      console.log('⚠️ Ticket Rejected: Missing name or phone');
      return res.status(400).json({ success: false, message: 'Name and Phone are required' });
    }
    const ticket = new Ticket({ name, phone, issue });
    await ticket.save();
    console.log('✅ Ticket Saved Successfully:', ticket._id);
    res.json({ success: true, data: ticket });
  } catch (err) {
    console.error('❌ Ticket Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
