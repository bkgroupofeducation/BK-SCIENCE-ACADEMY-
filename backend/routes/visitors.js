const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// GET visitor count
router.get('/', async (req, res) => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await Visitor.create({ count: 0 });
    }
    res.json({ success: true, count: visitor.count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST - increment visitor count (called once per session)
router.post('/increment', async (req, res) => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await Visitor.create({ count: 1 });
    } else {
      visitor.count += 1;
      await visitor.save();
    }
    res.json({ success: true, count: visitor.count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
