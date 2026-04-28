const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { requireAuth, requireSuperAdmin } = require('../middleware/auth');
const { logAction } = require('../middleware/audit');

// Models
const Registration = require('../models/Registration');
const Admission = require('../models/Admission');
const Counseling = require('../models/Counseling');
const Enquiry = require('../models/Enquiry');
const Result = require('../models/Result');
const PaymentSubmission = require('../models/PaymentSubmission');
const Grievance = require('../models/Grievance');
const AssociateConsultant = require('../models/AssociateConsultant');
const AdminLog = require('../models/AdminLog');
const Admin = require('../models/Admin');
const Pdf = require('../models/Pdf');

// All admin routes require basic admin authentication
router.use(requireAuth);

/**
 * ─── HELPER: GENERIC CRUD ───────────────────────────────────────────
 */
const getModel = (type) => {
  const map = {
    registrations: Registration,
    admissions: Admission,
    counseling: Counseling,
    enquiries: Enquiry,
    results: Result,
    payments: PaymentSubmission,
    grievances: Grievance,
    associates: AssociateConsultant,
    admins: Admin,
    logs: AdminLog,
    pdfs: Pdf
  };
  return map[type];
};

/**
 * ─── DASHBOARD OVERVIEW ─────────────────────────────────────────────
 */
router.get('/stats', async (req, res) => {
  try {
    const [regs, leads, adms, enquiries, payments, grievances] = await Promise.all([
      Registration.countDocuments(),
      Counseling.countDocuments(),
      Admission.countDocuments(),
      Enquiry.countDocuments(),
      PaymentSubmission.countDocuments({ status: 'Pending Verification' }),
      Grievance.countDocuments({ status: 'Open' })
    ]);

    const recent = await AdminLog.find().sort({ createdAt: -1 }).limit(10).lean();

    res.json({
      success: true,
      data: {
        totalRegistrations: regs,
        totalLeads: leads,
        totalAdmissions: adms,
        totalEnquiries: enquiries,
        pendingPayments: payments,
        openGrievances: grievances,
        recentLogs: recent
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * ─── GENERIC LISTING (SEARCH, FILTER, SORT) ─────────────────────────
 */
router.get('/:module', async (req, res) => {
  try {
    const { module } = req.params;
    const { search, page = 1, limit = 50, status } = req.query;
    const Model = getModel(module);
    if (!Model) return res.status(404).json({ success: false, message: 'Module not found' });

    let query = {};
    if (status) query.status = status;
    
    if (search) {
      const searchFields = ['name', 'fullName', 'email', 'mobile', 'studentId', 'phone', 'username'];
      query.$or = searchFields.map(field => ({ [field]: { $regex: search, $options: 'i' } }));
    }

    const data = await Model.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    const total = await Model.countDocuments(query);
    res.json({ success: true, data, total, page: Number(page) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * ─── GENERIC CRUD OPERATIONS ────────────────────────────────────────
 */

// UPDATE
router.put('/:module/:id', logAction('UPDATE', 'MODULE'), async (req, res) => {
  try {
    const { module, id } = req.params;
    const Model = getModel(module);
    if (!Model) return res.status(404).json({ success: false, message: 'Module not found' });

    const item = await Model.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE (Super Admin only for sensitive modules)
router.delete('/:module/:id', requireSuperAdmin, logAction('DELETE', 'MODULE'), async (req, res) => {
  try {
    const { module, id } = req.params;
    const Model = getModel(module);
    if (!Model) return res.status(404).json({ success: false, message: 'Module not found' });

    await Model.findByIdAndDelete(id);
    res.json({ success: true, message: 'Record deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * ─── ADMIN MANAGEMENT (Super Admin Only) ────────────────────────────
 */
router.post('/admins/create', requireSuperAdmin, logAction('CREATE', 'ADMIN'), async (req, res) => {
  try {
    const { username, password, role } = req.body;
    // Note: In real production, hash password here using bcrypt
    const admin = await Admin.create({ username, password, role });
    res.status(201).json({ success: true, admin: { username: admin.username, role: admin.role } });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Username already exists or invalid data' });
  }
});

/**
 * ─── RESULTS MANAGEMENT ─────────────────────────────────────────────
 */
router.post('/results/create', logAction('CREATE', 'RESULT'), async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
