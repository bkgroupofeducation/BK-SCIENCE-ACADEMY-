const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST /api/auth/login — validate admin credentials and return JWT
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  const validUsername = process.env.ADMIN_USERNAME || 'super admin';
  const validPassword = process.env.ADMIN_PASSWORD || 'BK2026';

  if (username.toLowerCase().trim() !== validUsername.toLowerCase() || password !== validPassword) {
    return res.status(401).json({ success: false, message: 'Access Denied: Invalid Credentials' });
  }

  const token = jwt.sign(
    { username: validUsername, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({
    success: true,
    token,
    expiresIn: 8 * 60 * 60 * 1000, // 8 hours in ms
    message: 'Login successful'
  });
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
