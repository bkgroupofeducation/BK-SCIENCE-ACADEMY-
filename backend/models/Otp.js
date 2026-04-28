const mongoose = require('mongoose');

// Stores OTPs temporarily. TTL index auto-deletes records after 10 minutes.
const OtpSchema = new mongoose.Schema({
  mobile:    { type: String, required: true, index: true },
  otp:       { type: String, required: true },
  verified:  { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // auto-expire in 10 min
});

module.exports = mongoose.model('Otp', OtpSchema);
