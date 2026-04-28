const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Pdf = require('../models/Pdf');
const AdminLog = require('../models/AdminLog');
const jwt = require('jsonwebtoken');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Auth Middleware (simple version for this route)
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDFs are allowed'), false);
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST /api/admin/pdfs/upload
router.post('/upload', authenticate, upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const { title, category, description, visibleOnPage } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;

    const pdf = await Pdf.create({
      title,
      category,
      description,
      fileUrl,
      visibleOnPage,
      uploadedBy: req.admin.username
    });

    await AdminLog.create({
      adminUsername: req.admin.username,
      action: 'UPLOAD',
      resource: 'PDF',
      details: `Uploaded PDF: ${title}`
    });

    res.status(201).json({ success: true, pdf });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/pdfs
router.get('/', authenticate, async (req, res) => {
  try {
    const pdfs = await Pdf.find().sort({ createdAt: -1 });
    res.json({ success: true, pdfs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/pdfs/:id
router.put('/:id', authenticate, async (req, res) => {
  try {
    const pdf = await Pdf.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    await AdminLog.create({
      adminUsername: req.admin.username,
      action: 'UPDATE',
      resource: 'PDF',
      details: `Updated PDF metadata: ${pdf.title}`
    });

    res.json({ success: true, pdf });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/pdfs/:id
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) return res.status(404).json({ success: false, message: 'PDF not found' });

    // Delete file from disk
    const filePath = path.join(__dirname, '..', pdf.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Pdf.findByIdAndDelete(req.params.id);

    await AdminLog.create({
      adminUsername: req.admin.username,
      action: 'DELETE',
      resource: 'PDF',
      details: `Deleted PDF: ${pdf.title}`
    });

    res.json({ success: true, message: 'PDF deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
