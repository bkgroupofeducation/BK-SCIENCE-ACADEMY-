const express = require('express');
const router = express.Router();
const PaymentSubmission = require('../models/PaymentSubmission');

/**
 * ─── MANUAL SUBMISSION ──────────────────────────────────────────────
 * Keep existing manual submission for backup/offline payments.
 */
router.post('/submit', async (req, res) => {
  try {
    const { name, phone, email, amount, paymentMethod, transactionId } = req.body;

    if (!name || !phone || !email || !amount || !paymentMethod || !transactionId) {
      return res.status(400).json({ success: false, message: 'All payment fields are required.' });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Please enter a valid payment amount.' });
    }

    const submission = await PaymentSubmission.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      amount: parsedAmount,
      paymentMethod,
      transactionId: transactionId.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Payment details submitted successfully! Verification will be completed within 24 hours.',
      id: submission._id,
      referenceId: submission._id.toString().slice(-8).toUpperCase(),
    });
  } catch (err) {
    console.error('Payment Submit Error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
