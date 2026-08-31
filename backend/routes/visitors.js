const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

const INITIAL_BASE_COUNT = 15480;

// GET visitor count
router.get('/', async (req, res) => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await Visitor.create({ count: INITIAL_BASE_COUNT });
    } else if (visitor.count < INITIAL_BASE_COUNT) {
      visitor.count = INITIAL_BASE_COUNT;
      await visitor.save();
    }
    res.json({ success: true, count: visitor.count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, fallbackCount: INITIAL_BASE_COUNT });
  }
});

// POST - increment visitor count (called per session)
router.post('/increment', async (req, res) => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await Visitor.create({ count: INITIAL_BASE_COUNT + 1 });
    } else {
      visitor.count += 1;
      await visitor.save();
    }
    res.json({ success: true, count: visitor.count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST - update visitor count (Admin / Manual seed)
router.post('/update', async (req, res) => {
  try {
    const { count } = req.body;
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await Visitor.create({ count: Number(count) || INITIAL_BASE_COUNT });
    } else {
      visitor.count = Number(count) || visitor.count;
      await visitor.save();
    }
    res.json({ success: true, count: visitor.count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
