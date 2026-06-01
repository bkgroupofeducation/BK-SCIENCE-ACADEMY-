const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Should be hashed
  role: { 
    type: String, 
    enum: ['super-admin', 'admin'],
    default: 'admin' 
  },
  lastLogin: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);
