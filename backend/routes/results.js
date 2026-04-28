const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Result = require('../models/Result');
const { requireAuth } = require('../middleware/auth');

// GET — public: student result lookup
router.get('/:studentId', async (req, res) => {
  try {
    const { track = 'Live Results', semester = 'Summer 2023' } = req.query;
    const { studentId } = req.params;

    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student identification record not found.' });
    }

    const report = await Result.findOne({ studentId, track, semester });
    
    res.json({
      student,
      report: report || { results: [], sgpa: 0, rank: 'N/A' }
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// PUT — admin-only: update student and result data
router.put('/:studentId', requireAuth, async (req, res) => {
  try {
    const { studentId } = req.params;
    const { student, report, track = 'Live Results', semester = 'Summer 2023' } = req.body;

    // Strip immutable MongoDB fields if they exist
    if (student) { delete student._id; delete student.__v; }
    if (report) { delete report._id; delete report.__v; }

    // Update Student Profile
    const updatedStudent = await Student.findOneAndUpdate(
      { studentId },
      { ...student, studentId: studentId }, // Guard studentId
      { new: true, upsert: true }
    );

    // Update Result Report
    const updatedReport = await Result.findOneAndUpdate(
      { studentId, track, semester },
      { ...report, studentId, track, semester },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: 'Database Updated Successfully!',
      data: { student: updatedStudent, report: updatedReport }
    });
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ success: false, message: 'Update failed', error: err.message });
  }
});

// POST /seed — public (temporarily for testing): seed sample data
router.post('/seed', async (req, res) => {
  try {
    // Clear existing
    await Student.deleteMany({});
    await Result.deleteMany({});

    // Create Sample Students
    const students = [
      {
        studentId: 'BK-171-101',
        name: 'Nasimul Nayon Ontar',
        dept: 'Computer Science Dept',
        batch: 'Batch 04',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ontar'
      },
      {
        studentId: 'BK-171-103',
        name: 'Amit Raj',
        dept: 'JEE Advanced',
        batch: '2026-27',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit'
      },
      {
        studentId: 'BK-171-105',
        name: 'Sara Khan',
        dept: 'NEET Medical',
        batch: '2026-27',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara'
      }
    ];

    await Student.insertMany(students);

    // Create Sample Results for each student
    const seedData = [
      {
        studentId: 'BK-171-101', track: 'Live Results', semester: 'Summer 2023',
        results: [
          { code: 'AC-101', title: 'Advanced Physics (Running)', credit: 3, grade: 'A+', point: 4.0 },
          { code: 'AC-102', title: 'Modern Biology (Running)', credit: 3, grade: 'A', point: 3.75 },
          { code: 'AC-103', title: 'Applied Maths (Running)', credit: 3, grade: 'A+', point: 4.0 },
        ],
        sgpa: 4.0, rank: 'Top 10%'
      },
      {
        studentId: 'BK-171-103', track: 'Live Results', semester: 'Summer 2023',
        results: [
          { code: 'JEE-P1', title: 'Physics: Thermodynamics', credit: 4, grade: 'A+', point: 4.0 },
          { code: 'JEE-C1', title: 'Chemistry: Bio-Molecules', credit: 3, grade: 'O', point: 4.0 },
          { code: 'JEE-M1', title: 'Maths: Integration', credit: 4, grade: 'A+', point: 4.0 },
        ],
        sgpa: 4.0, rank: 'Top 1%'
      },
      {
        studentId: 'BK-171-105', track: 'Live Results', semester: 'Summer 2023',
        results: [
          { code: 'NT-B1', title: 'Plant Physiology', credit: 4, grade: 'O', point: 4.0 },
          { code: 'NT-Z1', title: 'Human Anatomy', credit: 4, grade: 'A+', point: 4.0 },
          { code: 'NT-P1', title: 'Wave Optics', credit: 3, grade: 'O', point: 4.0 },
        ],
        sgpa: 4.0, rank: 'Top 2%'
      }
    ];

    await Result.insertMany(seedData);

    res.json({ message: 'Database Seeded Successfully', studentsCount: students.length, reportsCount: seedData.length });
  } catch (err) {
    res.status(500).json({ message: 'Seed failed', error: err.message });
  }
});

module.exports = router;
