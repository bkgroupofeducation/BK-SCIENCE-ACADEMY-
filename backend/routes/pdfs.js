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
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST /api/admin/pdfs/upload
router.post('/upload', authenticate, upload.any(), async (req, res) => {
  try {
    console.log('🚀 PDF UPLOAD START');
    console.log('📋 Request Headers:', req.headers);
    console.log('📦 Request Body:', req.body);
    console.log('📄 Request Files:', req.files);
    
    // Find the 'pdf' file if it exists in the array
    const uploadedFile = (req.files || []).find(f => f.fieldname === 'pdf');
    console.log('📄 Incoming PDF File:', uploadedFile);

    const title = req.body.title;
    const category = req.body.category || 'Other';
    const description = req.body.description || '';
    const visibleOnPage = req.body.visibleOnPage || 'none';
    const videoUrl = req.body.videoUrl || '';

    // A file is only considered uploaded if it has a size > 0
    const fileUrl = (uploadedFile && uploadedFile.size > 0) ? `/uploads/${uploadedFile.filename}` : '';

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    if (!fileUrl && (!videoUrl || videoUrl.trim() === '')) {
      return res.status(400).json({ success: false, message: 'Either a PDF file or a Video URL is required' });
    }

    const adminUser = req.admin?.username || 'Admin';

    const pdf = await Pdf.create({
      title,
      category,
      description,
      fileUrl,
      videoUrl: videoUrl.trim(),
      visibleOnPage,
      uploadedBy: adminUser
    });

    // Log the action defensively
    try {
      await AdminLog.create({
        adminUsername: adminUser,
        action: 'UPLOAD',
        resource: 'PDF',
        details: `Uploaded ${category}: ${title}`
      });
    } catch (logErr) {
      console.error('⚠️ AdminLog Error (non-fatal):', logErr);
    }

    res.status(201).json({ success: true, message: 'Asset uploaded successfully', pdf });
  } catch (err) {
    console.error('❌ Upload Route Exception:', err);
    res.status(500).json({ 
      success: false, 
      message: err.message || 'Internal server error',
      error: err.name === 'ValidationError' ? err.errors : null
    });
  }
});

// GET /api/admin/pdfs
router.get('/', authenticate, async (req, res) => {
  try {
    const data = await Pdf.find().sort({ createdAt: -1 });
    const total = await Pdf.countDocuments();
    res.json({ success: true, data, total });
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

    res.json({ success: true, data: pdf });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/pdfs/:id
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) return res.status(404).json({ success: false, message: 'PDF not found' });

    // Delete file from disk if it exists
    if (pdf.fileUrl && typeof pdf.fileUrl === 'string' && pdf.fileUrl.trim().length > 0) {
      try {
        const normalizedPath = pdf.fileUrl.startsWith('/') ? pdf.fileUrl : `/${pdf.fileUrl}`;
        const filePath = path.resolve(path.join(__dirname, '..', normalizedPath));
        const uploadsBase = path.resolve(path.join(__dirname, '..', 'uploads'));
        
        console.log('🗑️ Delete request:', {
          fileUrl: pdf.fileUrl,
          resolved: filePath,
          isWithinUploads: filePath.startsWith(uploadsBase)
        });

        if (filePath.startsWith(uploadsBase) && filePath !== uploadsBase && fs.existsSync(filePath)) {
          const stats = fs.lstatSync(filePath);
          if (stats.isFile()) {
            try {
              fs.unlinkSync(filePath);
              console.log('✅ File unlinked successfully');
            } catch (err) {
              console.error('❌ File locked or busy, skipping unlink:', err.message);
            }
          }
        }
      } catch (unlinkErr) {
        console.error('❌ Error during file unlink process:', unlinkErr);
      }
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

// GET /api/pdfs (Public)
router.get('/public', async (req, res) => {
  try {
    const pdfs = await Pdf.find().sort({ createdAt: -1 });
    res.json({ success: true, pdfs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
