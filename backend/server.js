const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// ────────── Middleware ──────────
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));

// ────────── Database ──────────
console.log('⏳ Connecting to MongoDB at', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected to BK Science Academy Local Instance'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ────────── Routes ──────────
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/results',      require('./routes/results'));
app.use('/api/counseling',   require('./routes/counseling'));
app.use('/api/registration', require('./routes/registration'));
app.use('/api/admission',    require('./routes/admission'));
app.use('/api/enquiry',      require('./routes/enquiry'));
app.use('/api/admin',        require('./routes/admin'));
app.use('/api/admin/pdfs',   require('./routes/pdfs'));
app.use('/api/otp',          require('./routes/otp'));
app.use('/api/associate',    require('./routes/associate'));
app.use('/api/grievance',    require('./routes/grievance'));
app.use('/api/payments',     require('./routes/payments'));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ────────── Health Check ──────────
app.get('/', (req, res) => res.json({ message: 'BK Science Academy API is Running.', version: '2.0' }));

// ────────── 404 Handler ──────────
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// ────────── Error Handler ──────────
app.use((err, req, res, next) => {
  console.error('❌ Unhandled Error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ────────── Start ──────────
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
