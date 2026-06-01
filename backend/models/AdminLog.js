const mongoose = require('mongoose');

const AdminLogSchema = new mongoose.Schema({
  adminUsername: { type: String, required: true },
  action: { type: String, required: true }, // e.g., 'CREATE', 'UPDATE', 'DELETE', 'LOGIN'
  resource: { type: String, required: true }, // e.g., 'REGISTRATION', 'PDF', 'RESULT'
  details: { type: String, default: '' },
  ipAddress: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('AdminLog', AdminLogSchema);
