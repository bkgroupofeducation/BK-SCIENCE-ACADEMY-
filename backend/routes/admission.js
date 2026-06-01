const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/admissions';
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

// Create new admission record with support for multipart/form-data
router.post('/submit', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('📝 Incoming Admission Submission:', req.body);
    
    // Parse nested objects if they arrive as strings (from FormData)
    const data = { ...req.body };
    ['edu10th', 'edu12th', 'currentAddress', 'permanentAddress', 'courses'].forEach(key => {
      if (typeof data[key] === 'string') {
        try {
          data[key] = JSON.parse(data[key]);
        } catch (e) {
          console.warn(`Could not parse ${key}:`, e.message);
        }
      }
    });

    // Add file paths to data
    if (req.files) {
      if (req.files.photo) data.photo = req.files.photo[0].path;
      if (req.files.signature) data.signature = req.files.signature[0].path;
    }

    // Auto-increment Form Number
    const lastAdmission = await Admission.findOne().sort({ formNumber: -1 });
    const nextFormNo = lastAdmission && lastAdmission.formNumber ? lastAdmission.formNumber + 1 : 1;
    data.formNumber = nextFormNo;

    const admission = new Admission(data);
    await admission.save();
    
    console.log('✅ Admission Saved Successfully');
    res.status(201).json({ 
      success: true, 
      message: 'Admission form submitted successfully!',
      data: admission
    });
  } catch (error) {
    console.error('❌ Admission Submit Error:', error);
    res.status(500).json({ success: false, message: 'Server error during admission submission', error: error.message });
  }
});

module.exports = router;
