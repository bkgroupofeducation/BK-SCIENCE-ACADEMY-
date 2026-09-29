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

// Helper to normalize popup object so images are accessed via /api/uploads (proxied by Nginx)
const normalizePopup = (popupDoc) => {
  const popup = popupDoc && popupDoc.toObject ? popupDoc.toObject() : { ...popupDoc };
  if (popup && popup.image && typeof popup.image === 'string') {
    if (popup.image.startsWith('/uploads/')) {
      popup.image = `/api/uploads/${popup.image.replace(/^\/uploads\//, '')}`;
    }
  }
  return popup;
};

// GET /api/popups - Publicly fetch active popups
router.get('/', async (req, res) => {
  try {
    const popups = await Popup.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: popups.map(normalizePopup) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/popups/all - Admin only fetch all popups
router.get('/all', requireAuth, async (req, res) => {
  try {
    const popups = await Popup.find().sort({ createdAt: -1 });
    res.json({ success: true, data: popups.map(normalizePopup) });
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
    // Always store as /api/uploads/... so that frontend and Nginx directly proxy to Express
    const imageUrl = `/api/uploads/${uploadedFile.filename}`;

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

    res.status(201).json({ success: true, data: normalizePopup(popup) });
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
    res.json({ success: true, data: normalizePopup(popup) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

const { execSync } = require('child_process');

// Helper to resolve physical file path from any image URL format (/api/uploads/... or /uploads/...)
const getPhysicalFilePath = (imgUrl) => {
  if (!imgUrl) return null;
  const filename = path.basename(imgUrl.split('?')[0]);
  return path.join(uploadDir, filename);
};

// PUT /api/popups/:id/rotate - Admin only rotate +90deg & auto-swap orientation
router.put('/:id/rotate', requireAuth, logAction('UPDATE', 'POPUP'), async (req, res) => {
  try {
    const popup = await Popup.findById(req.params.id);
    if (!popup) {
      return res.status(404).json({ success: false, message: 'Popup not found' });
    }

    const { direction } = req.body || {}; // 'cw' (default 90 deg clockwise) or 'ccw' (90 deg counter-clockwise)
    const pilDegrees = direction === 'ccw' ? 90 : 270; // In PIL, 270 is 90 deg clockwise

    const fullPath = getPhysicalFilePath(popup.image);
    if (fullPath && fs.existsSync(fullPath)) {
      const pyCode = `from PIL import Image; im = Image.open(r'''${fullPath}'''); im.rotate(${pilDegrees}, expand=True).save(r'''${fullPath}''')`;
      const pythonBins = process.platform === 'win32' ? ['python', 'py', 'python3'] : ['python3', 'python'];
      let rotated = false;
      for (const bin of pythonBins) {
        try {
          execSync(`${bin} -c "${pyCode}"`, { stdio: 'pipe' });
          rotated = true;
          break;
        } catch (e) {}
      }
      if (!rotated) {
        console.warn('Physical rotation command could not run python/PIL.');
      }
    }

    const currentRotation = popup.rotation || 0;
    popup.rotation = (currentRotation + (direction === 'ccw' ? 270 : 90)) % 360;

    // Auto-swap orientation: if vertical -> horizontal, if horizontal -> vertical
    popup.orientation = popup.orientation === 'horizontal' ? 'vertical' : 'horizontal';

    // Touch image path with timestamp to invalidate browser cache
    const cleanImgPath = popup.image.split('?')[0];
    const normalizedImg = cleanImgPath.startsWith('/uploads/') ? `/api/uploads/${cleanImgPath.replace(/^\/uploads\//, '')}` : cleanImgPath;
    popup.image = `${normalizedImg}?t=${Date.now()}`;

    await popup.save();
    res.json({ success: true, data: normalizePopup(popup) });
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

    const fullPath = getPhysicalFilePath(popup.image);
    if (fullPath && fs.existsSync(fullPath)) {
      const pyCode = `from PIL import Image; im = Image.open(r'''${fullPath}'''); print(f'{im.size[0]},{im.size[1]}')`;
      const pythonBins = process.platform === 'win32' ? ['python', 'py', 'python3'] : ['python3', 'python'];
      for (const bin of pythonBins) {
        try {
          const output = execSync(`${bin} -c "${pyCode}"`, { stdio: 'pipe' }).toString().trim();
          const [w, h] = output.split(',').map(Number);
          if (w && h) {
            popup.orientation = w >= h ? 'horizontal' : 'vertical';
            break;
          }
        } catch (e) {}
      }
    }

    popup.scale = 100;
    popup.showOverlay = false; // Keep clean flyer view
    const cleanImgPath = popup.image.split('?')[0];
    if (cleanImgPath.startsWith('/uploads/')) {
      popup.image = `/api/uploads/${cleanImgPath.replace(/^\/uploads\//, '')}`;
    }

    await popup.save();
    res.json({ success: true, data: normalizePopup(popup) });
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

    res.json({ success: true, data: normalizePopup(popup) });
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
    const filePath = getPhysicalFilePath(popup.image);
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (unlinkErr) {}
    }

    await popup.deleteOne();
    res.json({ success: true, message: 'Popup deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
