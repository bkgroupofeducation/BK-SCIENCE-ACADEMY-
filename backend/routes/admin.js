const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Counseling = require('../models/Counseling');
const Admission = require('../models/Admission');
const { requireAuth } = require('../middleware/auth');

// All admin routes require authentication
router.use(requireAuth);

// GET /api/admin/stats — unified dashboard counts + recent activity
router.get('/stats', async (req, res) => {
  try {
    const regCount = await Registration.countDocuments();
    const leadCount = await Counseling.countDocuments();
    const admCount = await Admission.countDocuments();

    const [recentRegs, recentLeads, recentAdms] = await Promise.all([
      Registration.find().sort({ createdAt: -1 }).limit(5).lean(),
      Counseling.find().sort({ createdAt: -1 }).limit(5).lean(),
      Admission.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const consolidated = [...recentRegs, ...recentLeads, ...recentAdms]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    res.json({
      success: true,
      data: {
        totalRegistrations: regCount,
        totalLeads: leadCount,
        totalAdmissions: admCount,
        recent: consolidated
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Admin Stats Fetch Error', error: error.message });
  }
});

// GET /api/admin/admissions — all admissions with optional search
router.get('/admissions', async (req, res) => {
  try {
    const { search, page = 1, limit = 50 } = req.query;
    const query = search
      ? { $or: [
          { fullName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { mobile: { $regex: search, $options: 'i' } }
        ]}
      : {};
    const adms = await Admission.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();
    const total = await Admission.countDocuments(query);
    res.json({ success: true, data: adms, total, page: Number(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Admission Fetch Error' });
  }
});

// GET /api/admin/registrations — all registrations with optional search
router.get('/registrations', async (req, res) => {
  try {
    const { search, page = 1, limit = 50 } = req.query;
    const query = search
      ? { $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { mobile: { $regex: search, $options: 'i' } },
          { studentId: { $regex: search, $options: 'i' } }
        ]}
      : {};
    const regs = await Registration.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();
    const total = await Registration.countDocuments(query);
    res.json({ success: true, data: regs, total, page: Number(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration Fetch Error' });
  }
});

// GET /api/admin/leads — all counseling leads with optional search
router.get('/leads', async (req, res) => {
  try {
    const { search, page = 1, limit = 50 } = req.query;
    const query = search
      ? { $or: [
          { fullName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { mobile: { $regex: search, $options: 'i' } }
        ]}
      : {};
    const leads = await Counseling.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();
    const total = await Counseling.countDocuments(query);
    res.json({ success: true, data: leads, total, page: Number(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lead Fetch Error' });
  }
});

module.exports = router;
