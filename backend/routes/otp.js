const express = require('express');
const router = express.Router();
const Otp = require('../models/Otp');

/**
 * OTP Service
 * ----------
 * When OTP_DEV_MODE=true (or no SMS provider configured), the backend
 * generates the OTP and logs it to the console for development use.
 * In production, replace the sendSms() stub with a real SMS provider
 * (MSG91, Twilio, etc.) using the env variables below.
 *
 * Required env vars for production:
 *   OTP_DEV_MODE=false
 *   SMS_PROVIDER=msg91|twilio
 *   MSG91_AUTH_KEY=<key>
 *   MSG91_TEMPLATE_ID=<template>
 *   TWILIO_ACCOUNT_SID=<sid>
 *   TWILIO_AUTH_TOKEN=<token>
 *   TWILIO_FROM_NUMBER=<phone>
 */

const DEV_MODE = process.env.OTP_DEV_MODE !== 'false'; // default dev mode ON

function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function sendSms(mobile, otp) {
  if (DEV_MODE) {
    // In dev mode: log OTP to console instead of sending SMS
    console.log(`\n📱 [OTP DEV MODE] Mobile: ${mobile} → OTP: ${otp}\n`);
    return true;
  }

  // --- Production SMS Provider stub ---
  // Uncomment and configure for production:
  //
  // const provider = process.env.SMS_PROVIDER;
  // if (provider === 'msg91') {
  //   const response = await fetch('https://api.msg91.com/api/v5/otp', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json', 'authkey': process.env.MSG91_AUTH_KEY },
  //     body: JSON.stringify({ template_id: process.env.MSG91_TEMPLATE_ID, mobile: `91${mobile}`, otp })
  //   });
  //   const data = await response.json();
  //   if (data.type !== 'success') throw new Error('SMS send failed');
  // }
  // if (provider === 'twilio') {
  //   const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  //   await twilio.messages.create({ body: `Your BK Science OTP is ${otp}`, from: process.env.TWILIO_FROM_NUMBER, to: `+91${mobile}` });
  // }

  return true;
}

// POST /api/otp/send
router.post('/send', async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number.' });
    }

    // Delete any existing OTP for this mobile
    await Otp.deleteMany({ mobile });

    const otp = generateOtp();
    await Otp.create({ mobile, otp });

    await sendSms(mobile, otp);

    res.json({
      success: true,
      message: DEV_MODE
        ? 'OTP generated (dev mode). Check server console for the code.'
        : 'OTP sent to your mobile number.',
      devMode: DEV_MODE,
    });
  } catch (err) {
    console.error('OTP Send Error:', err);
    res.status(500).json({ success: false, message: 'Failed to send OTP. Please try again.' });
  }
});

// POST /api/otp/verify
router.post('/verify', async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({ success: false, message: 'Mobile and OTP are required.' });
    }

    const record = await Otp.findOne({ mobile }).sort({ createdAt: -1 });

    if (!record) {
      return res.status(400).json({ success: false, message: 'OTP not found or expired. Please request a new one.' });
    }

    if (record.otp !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'Invalid OTP. Please check and try again.' });
    }

    // Mark as verified and clean up
    await Otp.deleteMany({ mobile });

    res.json({ success: true, message: 'Mobile number verified successfully.' });
  } catch (err) {
    console.error('OTP Verify Error:', err);
    res.status(500).json({ success: false, message: 'Verification failed. Please try again.' });
  }
});

module.exports = router;
