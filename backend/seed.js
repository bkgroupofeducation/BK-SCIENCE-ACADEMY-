const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const Student = require('./models/Student');
const Result = require('./models/Result');

const seed = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected.');

    await Student.deleteMany({});
    await Result.deleteMany({});

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
    console.log('🚀 Database Seeded Successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed Error:', err);
    process.exit(1);
  }
};

seed();
