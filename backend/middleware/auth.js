const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authorization token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

const requireSuperAdmin = (req, res, next) => {
  requireAuth(req, res, () => {
    if (req.admin.role === 'super-admin') {
      next();
    } else {
      return res.status(403).json({ success: false, message: 'Super-admin access required' });
    }
  });
};

module.exports = { requireAuth, requireSuperAdmin };
