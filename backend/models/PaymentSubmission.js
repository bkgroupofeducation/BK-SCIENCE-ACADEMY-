const mongoose = require('mongoose');

const PaymentSubmissionSchema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true },
  phone:         { type: String, required: true, trim: true },
  email:         { type: String, required: true, trim: true, lowercase: true },
  amount:        { type: Number, required: true },
  paymentMethod: { type: String, required: true, enum: ['upi', 'card', 'netbanking', 'qr', 'razorpay'] },
  transactionId: { type: String, required: true, trim: true },
  status:        { type: String, default: 'Pending Verification', enum: ['Pending Verification', 'Verified', 'Rejected'] },
  remarks:       { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('PaymentSubmission', PaymentSubmissionSchema);
