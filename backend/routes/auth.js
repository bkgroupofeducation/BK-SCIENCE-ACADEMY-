const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Admin = require('../models/Admin');

// POST /api/auth/login — validate admin credentials and return JWT
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // 1. Check Database
    let admin = await Admin.findOne({ username: { $regex: new RegExp(`^${username.trim()}$`, 'i') } });

    // 2. Migration: If no admins exist at all, or if this specific env admin is used for the first time
    const envUser = process.env.ADMIN_USERNAME || 'super admin';
    const envPass = process.env.ADMIN_PASSWORD || 'BK2026';

    if (!admin && username.toLowerCase().trim() === envUser.toLowerCase()) {
      if (password === envPass) {
        admin = await Admin.create({ 
          username: envUser, 
          password: envPass, // Should be hashed in production
          role: 'super-admin' 
        });
      }
    }

    if (!admin || admin.password !== password) {
      return res.status(401).json({ success: false, message: 'Access Denied: Invalid Credentials' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      token,
      expiresIn: 8 * 60 * 60 * 1000,
      admin: { username: admin.username, role: admin.role },
      message: 'Login successful'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// GET /api/auth/reset-now — instantly reset/force superadmin to superadmin / bk@admin2026
router.get('/reset-now', async (req, res) => {
  try {
    // Delete any old admin users that might conflict
    await Admin.deleteMany({ username: { $regex: /^superadmin$/i } });
    await Admin.deleteMany({ username: { $regex: /^super admin$/i } });
    
    // Create default superadmin
    const newAdmin = await Admin.create({
      username: 'superadmin',
      password: 'bk@admin2026',
      role: 'super-admin'
    });
    
    res.json({
      success: true,
      message: 'Super Admin credentials reset successfully!',
      credentials: {
        username: 'superadmin',
        password: 'bk@admin2026'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/verify — verify a token is still valid
router.post('/verify', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ success: false, valid: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ success: true, valid: true, admin: decoded });
  } catch {
    res.json({ success: false, valid: false });
  }
});

module.exports = router;
