const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });
const Topper = require('../backend/models/Topper');

async function seedVideos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const videos = [
      {
        name: 'Aryan Sharma',
        rank: 'AIR 01',
        exam: 'JEE Advanced',
        score: '99.99%',
        category: 'JEE',
        quote: 'BK Science gave me the perfect strategy to crack JEE Advanced in my first attempt.',
        videoUrl: 'https://www.youtube.com/shorts/IB-LOAvTjg4',
        image: '/assets/ranker1.png'
      },
      {
        name: 'Sanskar Patil',
        rank: 'AIR 08',
        exam: 'NEET',
        score: '715/720',
        category: 'NEET',
        quote: 'The mock tests and mentorship program were game-changing for my NEET prep.',
        videoUrl: 'https://www.youtube.com/shorts/zQ_0c3Kxd1o',
        image: '/assets/sanskar.png'
      },
      {
        name: 'Sameer Khan',
        rank: 'AIR 45',
        exam: 'NIT Surat',
        score: '99.9%',
        category: 'JEE',
        quote: 'Structured learning and expert guidance helped me achieve 99.99 percentile.',
        videoUrl: 'https://www.youtube.com/shorts/4-gRtCfIZmU',
        image: '/assets/ranker3.png'
      }
    ];

    for (const v of videos) {
      await Topper.findOneAndUpdate({ name: v.name }, v, { upsert: true, new: true });
    }

    console.log('Successfully seeded 3 video toppers');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedVideos();
