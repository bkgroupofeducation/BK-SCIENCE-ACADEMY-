const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  issue: { type: String, required: true },
  status: { type: String, default: 'New', enum: ['New', 'In Progress', 'Resolved', 'Closed'] },
  priority: { type: String, default: 'Medium' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);
