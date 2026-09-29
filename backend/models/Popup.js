const mongoose = require('mongoose');

const PopupSchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String, required: true }, // Path to the uploaded image
  link: { type: String }, // Clicking the popup navigates here (optional)
  isActive: { type: Boolean, default: true },
  orientation: { type: String, enum: ['vertical', 'horizontal'], default: 'vertical' },
  scale: { type: Number, default: 100 }, // percentage: 60 to 150
  showOverlay: { type: Boolean, default: false }, // whether to show gradient & title overlay or clean flyer
  rotation: { type: Number, default: 0 } // 0, 90, 180, 270 degrees
}, { timestamps: true });

module.exports = mongoose.model('Popup', PopupSchema);
