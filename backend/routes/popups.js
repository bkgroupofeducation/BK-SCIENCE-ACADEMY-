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

    const { title, link, orientation, scale, showOverlay, rotation } = req.body;
    const imageUrl = `/uploads/${uploadedFile.filename}`;

    const parsedScale = parseInt(scale, 10);
    const validScale = (!isNaN(parsedScale) && parsedScale >= 50 && parsedScale <= 160) ? parsedScale : 100;
    const validOrientation = ['horizontal', 'vertical'].includes(orientation) ? orientation : 'vertical';
    const validOverlay = showOverlay === 'true' || showOverlay === true;
    const validRotation = [0, 90, 180, 270].includes(Number(rotation)) ? Number(rotation) : 0;

    const popup = await Popup.create({
      title: title || 'Special Promotion',
      image: imageUrl,
      link: link || '',
      orientation: validOrientation,
      scale: validScale,
      showOverlay: validOverlay,
      rotation: validRotation,
      isActive: true
    });

    res.status(201).json({ success: true, data: popup });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/popups/:id - Admin only update popup settings
router.put('/:id', requireAuth, logAction('UPDATE', 'POPUP'), async (req, res) => {
  try {
    const popup = await Popup.findById(req.params.id);
    if (!popup) {
      return res.status(404).json({ success: false, message: 'Popup not found' });
    }

    const { title, link, orientation, scale, showOverlay, rotation, isActive } = req.body;
    if (title !== undefined) popup.title = title;
    if (link !== undefined) popup.link = link;
    if (orientation !== undefined && ['horizontal', 'vertical'].includes(orientation)) {
      popup.orientation = orientation;
    }
    if (scale !== undefined) {
      const parsedScale = parseInt(scale, 10);
      if (!isNaN(parsedScale) && parsedScale >= 50 && parsedScale <= 160) {
        popup.scale = parsedScale;
      }
    }
    if (showOverlay !== undefined) {
      popup.showOverlay = showOverlay === 'true' || showOverlay === true;
    }
    if (rotation !== undefined && [0, 90, 180, 270].includes(Number(rotation))) {
      popup.rotation = Number(rotation);
    }
    if (isActive !== undefined) {
      popup.isActive = Boolean(isActive);
    }

    await popup.save();
    res.json({ success: true, data: popup });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

const { execSync } = require('child_process');

// PUT /api/popups/:id/rotate - Admin only rotate +90deg & auto-swap orientation
router.put('/:id/rotate', requireAuth, logAction('UPDATE', 'POPUP'), async (req, res) => {
  try {
    const popup = await Popup.findById(req.params.id);
    if (!popup) {
      return res.status(404).json({ success: false, message: 'Popup not found' });
    }

    const { direction } = req.body || {}; // 'cw' (default 90 deg clockwise) or 'ccw' (90 deg counter-clockwise)
    const pilDegrees = direction === 'ccw' ? 90 : 270; // In PIL, 270 is 90 deg clockwise

    if (popup.image && popup.image.startsWith('/uploads/')) {
      const fullPath = path.join(__dirname, '..', popup.image.split('?')[0]);
      if (fs.existsSync(fullPath)) {
        try {
          execSync(`python -c "from PIL import Image; im = Image.open(r'''${fullPath}'''); im.rotate(${pilDegrees}, expand=True).save(r'''${fullPath}''')"`);
        } catch (pyErr) {
          console.warn('Physical rotation failed, falling back to rotation property:', pyErr.message);
        }
      }
    }

    const currentRotation = popup.rotation || 0;
    popup.rotation = (currentRotation + (direction === 'ccw' ? 270 : 90)) % 360;

    // Auto-swap orientation: if vertical -> horizontal, if horizontal -> vertical
    popup.orientation = popup.orientation === 'horizontal' ? 'vertical' : 'horizontal';

    // Touch image path with timestamp to invalidate browser cache
    const basePath = popup.image.split('?')[0];
    popup.image = `${basePath}?t=${Date.now()}`;

    await popup.save();
    res.json({ success: true, data: popup });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/popups/:id/auto-adjust - Automatically detect dimensions & set optimal orientation and scale
router.put('/:id/auto-adjust', requireAuth, logAction('UPDATE', 'POPUP'), async (req, res) => {
  try {
    const popup = await Popup.findById(req.params.id);
    if (!popup) {
      return res.status(404).json({ success: false, message: 'Popup not found' });
    }

    if (popup.image && popup.image.startsWith('/uploads/')) {
      const fullPath = path.join(__dirname, '..', popup.image.split('?')[0]);
      if (fs.existsSync(fullPath)) {
        try {
          const output = execSync(`python -c "from PIL import Image; im = Image.open(r'''${fullPath}'''); print(f'{im.size[0]},{im.size[1]}')"`).toString().trim();
          const [w, h] = output.split(',').map(Number);
          if (w && h) {
            popup.orientation = w >= h ? 'horizontal' : 'vertical';
          }
        } catch (pyErr) {
          console.warn('Auto adjust failed:', pyErr.message);
        }
      }
    }

    popup.scale = 100;
    popup.showOverlay = false; // Keep clean flyer view
    await popup.save();
    res.json({ success: true, data: popup });
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
