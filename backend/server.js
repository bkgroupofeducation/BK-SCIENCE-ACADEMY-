// 1. MUST BE LINE 1: Load environment variables BEFORE importing ANY other files
const path = require('path');
const dotenvResult = require('dotenv').config({ path: path.resolve(__dirname, '.env') });

if (dotenvResult.error) {
  console.warn('⚠️ WARNING: No .env file found. Proceeding with system environment variables.');
}

// 2. Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 3. Initialize App & Variables
const app = express();
const PORT = process.env.PORT || 5057;
const isProd = process.env.NODE_ENV === 'production';

console.log(`\n🚀 [INIT] SERVER STARTING ON PORT ${PORT} in ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);

// 4. Global Middlewares
app.use(cors({
  origin: '*', // For strict production, change this to: ['https://bkscience.in']
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'bypass-tunnel-reminder']
}));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Logging Middleware (Only log warnings/errors in production to save PM2 memory)
app.use((req, res, next) => {
  if (!isProd) {
    console.log(`📡 [REQ] ${req.method} ${req.url}`);
  }
  next();
});

// 5. Database Connection (Production Grade)
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ FATAL: MONGODB_URI is missing from environment variables.');
  process.exit(1); // Safely exit if DB string is entirely missing
}

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}).then(() => {
  console.log('✅ [DB] MongoDB Connected Successfully');
}).catch(err => {
  console.error('❌ [DB] MongoDB Connection Error:', err.message);
});

// Monitor DB connection drops
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ [DB] MongoDB disconnected. Attempting to reconnect...');
});

// 6. Mount Routes (Loaded AFTER dotenv is configured)
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/results',      require('./routes/results'));
app.use('/api/counseling',   require('./routes/counseling'));
app.use('/api/registration', require('./routes/registration'));
app.use('/api/admission',    require('./routes/admission'));
app.use('/api/enquiry',      require('./routes/enquiry'));
app.use('/api/scholarship',  require('./routes/scholarship'));
app.use('/api/admin/pdfs',   require('./routes/pdfs')); 
app.use('/api/admin',        require('./routes/admin'));
app.use('/api/otp',          require('./routes/otp'));
app.use('/api/associate',    require('./routes/associate'));
app.use('/api/grievance',    require('./routes/grievance'));
app.use('/api/payments',     require('./routes/payments'));
app.use('/api/support',      require('./routes/support'));
app.use('/api/toppers',      require('./routes/toppers'));
app.use('/api/popups',       require('./routes/popups'));
app.use('/api/visitors',     require('./routes/visitors'));

// Health Check Endpoint (crucial for PM2/Nginx monitoring)
app.get('/api/health', (req, res) => res.status(200).json({ 
  status: 'ok', 
  message: 'BK Science Academy API is Running.', 
  version: '2.0',
  timestamp: new Date().toISOString()
}));

// 7. Static File Serving (For VPS Nginx setup)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// SPA Fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// 8. Global Error Handler (Prevents crashes from unhandled route errors)
app.use((err, req, res, next) => {
  console.error('❌ [ERROR]', err.message || err);
  res.status(err.status || 500).json({ 
    success: false, 
    message: isProd ? 'Internal server error' : err.message 
  });
});

// 9. Start Server
const server = app.listen(PORT, () => {
  console.log(`🌐 [LIVE] HTTP Server running on port ${PORT}`);
});

// 10. Graceful Shutdown & Process Handlers (Prevents Port locking and corrupt DB writes)
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 [SHUTDOWN] ${signal} received. Closing resources gracefully...`);
  
  server.close(() => {
    console.log('📡 [SHUTDOWN] HTTP server closed.');
    mongoose.connection.close(false).then(() => {
      console.log('💾 [SHUTDOWN] MongoDB connection closed.');
      process.exit(0);
    });
  });

  setTimeout(() => {
    console.error('⚠️ [SHUTDOWN] Force closing after 10 seconds');
    process.exit(1);
  }, 10000);
};

// Catch PM2 stop commands and Docker signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Catch unexpected exceptions so PM2 doesn't immediately enter an infinite crash loop
process.on('uncaughtException', (err) => {
  console.error('❌ [FATAL] Uncaught Exception:', err);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ [FATAL] Unhandled Rejection at:', promise, 'reason:', reason);
  // Do not crash immediately, let the error handler catch it if possible
});
