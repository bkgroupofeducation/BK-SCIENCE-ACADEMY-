const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });
const Topper = require('../backend/models/Topper');

async function updateVideos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Remove existing toppers to start fresh as requested
    await Topper.deleteMany({});
    console.log('Cleared existing toppers');

    const videos = [
      {
        name: 'Vaishnavi Patil',
        rank: 'Topper',
        exam: 'Success Story',
        score: '100%',
        category: 'Star Performer',
        quote: 'BK Science Academy transformed my learning experience completely.',
        videoUrl: 'https://www.youtube.com/shorts/3Qz9HNcdNRk',
        image: '/assets/ranker1.png',
        isActive: true
      },
      {
        name: 'Rohan Dusane',
        rank: 'Topper',
        exam: 'Success Story',
        score: '100%',
        category: 'Star Performer',
        quote: 'The mentorship here is unmatched. I highly recommend it!',
        videoUrl: 'https://www.youtube.com/shorts/luutp7wZfrI',
        image: '/assets/sanskar.png',
        isActive: true
      },
      {
        name: 'Sneha More',
        rank: 'Topper',
        exam: 'Success Story',
        score: '100%',
        category: 'Star Performer',
        quote: 'Achieving my goals was possible only with BK Academy guidance.',
        videoUrl: 'https://www.youtube.com/shorts/N5-mw7NLlVI',
        image: '/assets/ranker3.png',
        isActive: true
      }
    ];

    await Topper.insertMany(videos);
    console.log('Successfully seeded the 3 new YouTube Shorts toppers');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateVideos();
