const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Popup = require('../models/Popup');
const { requireAuth } = require('../middleware/auth');
const { logAction } = require('../middleware/audit');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'popup-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit for high-quality popups
});

// GET /api/popups - Publicly fetch active popups
router.get('/', async (req, res) => {
  try {
    const popups = await Popup.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: popups });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/popups/all - Admin only fetch all popups
router.get('/all', requireAuth, async (req, res) => {
  try {
    const popups = await Popup.find().sort({ createdAt: -1 });
    res.json({ success: true, data: popups });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/popups/upload - Admin only upload new popup image
router.post('/upload', requireAuth, upload.single('image'), logAction('CREATE', 'POPUP'), async (req, res) => {
  try {
    const uploadedFile = req.file;
    if (!uploadedFile) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { title, link } = req.body;
    const imageUrl = `/uploads/${uploadedFile.filename}`;

    const popup = await Popup.create({
      title: title || 'Special Promotion',
      image: imageUrl,
      link: link || '',
      isActive: true
    });

    res.status(201).json({ success: true, data: popup });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/popups/:id/toggle - Admin only toggle popup active state
router.put('/:id/toggle', requireAuth, logAction('UPDATE', 'POPUP'), async (req, res) => {
  try {
    const popup = await Popup.findById(req.params.id);
    if (!popup) {
      return res.status(404).json({ success: false, message: 'Popup not found' });
    }

    popup.isActive = !popup.isActive;
    await popup.save();

    res.json({ success: true, data: popup });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/popups/:id - Admin only delete popup
router.delete('/:id', requireAuth, logAction('DELETE', 'POPUP'), async (req, res) => {
  try {
    const popup = await Popup.findById(req.params.id);
    if (!popup) {
      return res.status(404).json({ success: false, message: 'Popup not found' });
    }

    // Attempt to delete physical file
    if (popup.image && popup.image.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', popup.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await popup.deleteOne();
    res.json({ success: true, message: 'Popup deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
