const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

const generateStudentId = () => {
  const prefix = 'BKSA';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

router.post('/register', async (req, res) => {
  try {
    const { name, mobile, email, gender, dob, stream, class: studentClass, board, medium, mode, session, program } = req.body;

    const existingStudent = await Registration.findOne({ 
      $or: [{ mobile }, { email }] 
    });

    if (existingStudent) {
      return res.status(400).json({ 
        success: false, 
        message: 'Registration already exists with this mobile or email' 
      });
    }

    const studentId = generateStudentId();

    const registration = new Registration({
      studentId,
      name,
      mobile,
      email,
      gender,
      dob,
      stream,
      class: studentClass,
      board,
      medium,
      mode,
      session,
      program
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully!',
      data: {
        studentId: registration.studentId,
        name: registration.name,
        email: registration.email,
        mobile: registration.mobile,
        program: registration.program
      }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
});

router.get('/all', async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json({ success: true, data: registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching registrations' });
  }
});

router.get('/:studentId', async (req, res) => {
  try {
    const registration = await Registration.findOne({ studentId: req.params.studentId });
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    res.json({ success: true, data: registration });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching registration' });
  }
});

router.put('/payment/:studentId', async (req, res) => {
  try {
    const { paymentMethod, transactionId } = req.body;
    
    const registration = await Registration.findOneAndUpdate(
      { studentId: req.params.studentId },
      { 
        paymentStatus: 'Completed',
        paymentMethod,
        transactionId 
      },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    res.json({
      success: true,
      message: 'Payment updated successfully!',
      data: registration
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating payment' });
  }
});

module.exports = router;