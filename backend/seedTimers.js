const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const ExamTimer = require('./models/ExamTimer');

const defaultTimers = [
  { examName: 'JEE', targetDate: new Date('2026-05-15T09:00:00') },
  { examName: 'NEET', targetDate: new Date('2026-05-04T14:00:00') },
  { examName: 'MHT-CET', targetDate: new Date('2026-05-02T09:00:00') },
  { examName: 'NDA', targetDate: new Date('2026-04-19T10:00:00') },
  { examName: 'Foundation', targetDate: new Date('2026-03-15T10:00:00') }
];

async function seed() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI is missing');
      process.exit(1);
    }
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding timers...');

    for (const t of defaultTimers) {
      await ExamTimer.findOneAndUpdate(
        { examName: t.examName },
        t,
        { upsert: true, new: true }
      );
      console.log(`🚀 Seeded/Updated timer for ${t.examName}`);
    }

    console.log('🎉 Seeding timers completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding timers:', err.message);
    process.exit(1);
  }
}

seed();
