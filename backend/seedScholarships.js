const mongoose = require('mongoose');
const ScholarshipType = require('./models/ScholarshipType');
require('dotenv').config();

const defaultTypes = [
  {
    title: 'Scholarship Test',
    subtitle: 'Merit Based',
    icon: '📝',
    description: 'Appear for our scholarship test and earn up to 100% fee waiver based on your performance. The test covers Physics, Chemistry, Mathematics/Biology fundamentals.',
    benefits: ['Up to 100% Fee Waiver', 'Free Study Material', 'Priority Batch Selection', 'Mentorship Program'],
    discount: 'Up to 100%',
    eligibility: 'Students of Class 8th to 12th (Science stream)',
    gradient: 'from-brand-red via-red-700 to-red-900',
    tag: 'Most Popular',
    tagColor: 'bg-brand-yellow text-brand-dark'
  },
  {
    title: 'Board Toppers',
    subtitle: 'Academic Excellence',
    icon: '🏆',
    description: 'Special scholarships for students who have secured more than 90% in their board examinations. Direct admission and fee waivers available.',
    benefits: ['Direct Fee Concession', 'No Test Required', 'Top Batch Allocation', 'Certificate of Merit'],
    discount: 'Flat 50%',
    eligibility: '90%+ in 10th or 12th Boards',
    gradient: 'from-amber-400 via-amber-600 to-amber-800',
    tag: 'Direct Entry',
    tagColor: 'bg-green-500 text-white'
  },
  {
    title: 'EWS Scholarship',
    subtitle: 'Need Based Support',
    icon: '🤝',
    description: 'We believe talent should not be limited by financial constraints. Economically weaker students can apply for need-based scholarships with income proof.',
    benefits: ['Up to 80% Fee Waiver', 'Free Books', 'Counseling Support', 'Flexible Payment'],
    discount: 'Up to 80%',
    eligibility: 'Family income below ₹3,00,000/year with valid proof',
    gradient: 'from-blue-600 via-blue-700 to-blue-900',
    tag: 'Support',
    tagColor: 'bg-blue-500 text-white'
  },
  {
    title: 'Special Talent Exam',
    subtitle: 'Summer Scholarship',
    icon: '🚀',
    description: 'A special summer talent quest to identify and support bright minds. Test sessions will be held on select dates next month.',
    benefits: ['June 28 (Sunday)', 'July 1 (Wednesday)', 'July 5 (Sunday)'],
    discount: 'Up to 90%',
    eligibility: 'Class 10th, 11th, and 12th students',
    gradient: 'from-purple-600 via-purple-700 to-indigo-900',
    tag: 'Limited Seats',
    tagColor: 'bg-purple-500 text-white'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  await ScholarshipType.deleteMany({});
  await ScholarshipType.insertMany(defaultTypes);
  console.log('Seeded Scholarship Types');
  process.exit();
}

seed();
