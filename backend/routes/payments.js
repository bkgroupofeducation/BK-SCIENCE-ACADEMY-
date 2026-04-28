const express = require('express');
const router = express.Router();
const PaymentSubmission = require('../models/PaymentSubmission');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * ─── CREATE RAZORPAY ORDER ──────────────────────────────────────────
 * Generates an order ID for the frontend to initiate checkout.
 */
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount.' });
    }

    const options = {
      amount: Math.round(amount * 100), // Amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (err) {
    console.error('Razorpay Order Error:', err);
    res.status(500).json({ success: false, message: 'Failed to create payment order.' });
  }
});

/**
 * ─── VERIFY RAZORPAY PAYMENT ────────────────────────────────────────
 * Validates the payment signature and saves the record to the database.
 */
router.post('/verify', async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      name, phone, email, amount
    } = req.body;

    // 1. Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature. Potential fraud detected.' });
    }

    // 2. Save to Database
    const submission = await PaymentSubmission.create({
      name: name?.trim(),
      phone: phone?.trim(),
      email: email?.trim().toLowerCase(),
      amount: parseFloat(amount),
      paymentMethod: 'razorpay',
      transactionId: razorpay_payment_id,
      status: 'Verified', // Automatic verification via Razorpay
      remarks: `Razorpay Order: ${razorpay_order_id}`
    });

    res.json({
      success: true,
      message: 'Payment verified and recorded successfully.',
      referenceId: submission._id.toString().slice(-8).toUpperCase()
    });
  } catch (err) {
    console.error('Razorpay Verification Error:', err);
    res.status(500).json({ success: false, message: 'Payment verification failed.' });
  }
});

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
