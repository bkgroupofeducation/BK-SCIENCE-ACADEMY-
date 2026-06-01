const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');
const ScholarshipType = require('../models/ScholarshipType');
const ScholarshipConfig = require('../models/ScholarshipConfig');

// ────────── Scholarship Applications ──────────

// POST /api/scholarship/apply
router.post('/apply', async (req, res) => {
  console.log('🚀 SCHOLARSHIP APPLY ATTEMPT:', req.body);
  try {
    const { name, mobile, email, scholarshipType, class: studentClass, stream } = req.body;

    if (!name || !mobile || !email || !scholarshipType) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const application = await Scholarship.create({
      name,
      mobile,
      email,
      scholarshipType,
      class: studentClass,
      stream
    });

    res.status(201).json({
      success: true,
      message: 'Scholarship application submitted successfully!',
      data: application
    });
  } catch (err) {
    console.error('❌ SCHOLARSHIP APPLY ERROR:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ────────── Scholarship Types (Dynamic Config) ──────────

// GET /api/scholarship/types
router.get('/types', async (req, res) => {
  try {
    const types = await ScholarshipType.find({ isActive: true });
    res.json({ success: true, data: types });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch types' });
  }
});

// Admin routes for types
router.post('/types/manage', async (req, res) => {
  try {
    const type = await ScholarshipType.create(req.body);
    res.status(201).json({ success: true, data: type });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create type' });
  }
});

router.put('/types/:id', async (req, res) => {
  try {
    const type = await ScholarshipType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: type });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed' });
  }
});

router.delete('/types/:id', async (req, res) => {
  try {
    await ScholarshipType.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
});

// ────────── Scholarship Config (Stats) ──────────

// GET /api/scholarship/config
router.get('/config', async (req, res) => {
  try {
    let config = await ScholarshipConfig.findOne({ key: 'main' });
    if (!config) {
      config = await ScholarshipConfig.create({ key: 'main' });
    }
    res.json({ success: true, data: config.stats });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch config' });
  }
});

// PUT /api/scholarship/config (Admin)
router.put('/config', async (req, res) => {
  try {
    const config = await ScholarshipConfig.findOneAndUpdate(
      { key: 'main' },
      { stats: req.body },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: config.stats });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed' });
  }
});

module.exports = router;
