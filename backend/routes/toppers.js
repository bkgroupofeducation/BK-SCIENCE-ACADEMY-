const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Topper = require('../models/Topper');
const { requireAuth } = require('../middleware/auth');
const { logAction } = require('../middleware/audit');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'topper-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// GET /api/admin/toppers (Publicly accessible for website)
router.get('/', async (req, res) => {
  try {
    const toppers = await Topper.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: toppers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/admin/toppers/upload
router.post('/upload', requireAuth, upload.any(), logAction('CREATE', 'TOPPER'), async (req, res) => {
  try {
    console.log('🚀 TOPPER UPLOAD START');
    console.log('📋 Request Headers:', req.headers);
    console.log('📦 Request Body:', req.body);
    console.log('📄 Request Files:', req.files);
    
    const uploadedFile = (req.files || []).find(f => f.fieldname === 'image');
    console.log('File:', uploadedFile ? uploadedFile.filename : 'No file');
    const { name, rank, score, exam, category, year, quote, videoUrl } = req.body;
    let imageUrl = req.body.imageUrl; // Fallback if no file

    if (uploadedFile) {
      imageUrl = `/uploads/${uploadedFile.filename}`;
    }

    const topper = await Topper.create({
      name,
      rank,
      score,
      exam,
      category,
      year,
      quote,
      videoUrl,
      image: imageUrl
    });

    res.status(201).json({ success: true, data: topper });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
