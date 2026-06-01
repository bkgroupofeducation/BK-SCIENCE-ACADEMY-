const mongoose = require('mongoose');

const PopupSchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String, required: true }, // Path to the uploaded image
  link: { type: String }, // Clicking the popup navigates here (optional)
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Popup', PopupSchema);
