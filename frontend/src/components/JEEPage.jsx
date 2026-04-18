import React from 'react';
import CoursePage from './CoursePage';

const JEEPage = ({ navigateTo }) => {
  const config = {
    heroTitle: 'JEE Main +',
    heroHighlight: 'Advanced',
    heroDesc: 'Comprehensive JEE preparation at our Nashik center. Expert faculty, structured curriculum, and proven results to help you crack IIT-JEE.',
    heroPills: ['Expert Faculty', 'All India Test Series', 'Doubt Sessions', 'Personal Mentorship'],
    shortName: 'JEE',
    gradient: 'from-indigo-600 via-indigo-700 to-indigo-900',
    accentColor: 'bg-indigo-50',
    stats: [
      { value: '15K+', label: 'Students', icon: '🎓' },
      { value: '95%', label: 'Selection', icon: '🏆' },
      { value: '50+', label: 'Faculty', icon: '👨‍🏫' },
      { value: '19+', label: 'Years', icon: '🏛️' },
    ],
    batches: [
      {
        name: 'JEE NURTURE',
        target: 'For Class 11th',
        duration: '2 Years',
        startDate: '1st April 2026',
        fees: '₹1,50,000 (2-Year Total)',
        classes: '6 Days',
        features: ['Complete Board + JEE Syllabus', 'Foundation Building', 'Weekly Tests', 'Doubt Sessions', 'Study Material Included', 'Parent Counseling'],
      },
      {
        name: 'JEE ENTHUSE',
        target: 'For Class 12th',
        duration: '2 Years',
        startDate: '1st April 2026',
        fees: '₹1,50,000 (2-Year Total)',
        classes: '6 Days',
        features: ['Intensive JEE Preparation', 'Board + JEE Integration', 'All India Test Series', 'Doubt Sessions', 'Study Material Included', 'Rank Improvement Focus'],
      },
      {
        name: 'JEE DROPPER',
        target: 'For Class 12th Pass',
        duration: '2 Years',
        startDate: '1st June 2026',
        fees: '₹1,50,000 (2-Year Total)',
        classes: '6 Days',
        features: ['Full Syllabus Revision', 'Intensive Problem Solving', 'Weekly Mock Tests', 'Weak Area Analysis', 'Strategy Sessions', 'Result Guaranteed Focus'],
      },
    ],
    syllabus: [
      { name: 'Physics', icon: '⚡', topics: ['Mechanics', 'Thermodynamics', 'Electrostatics', 'Current Electricity', 'Magnetism', 'Optics', 'Modern Physics', 'Waves & Oscillations'] },
      { name: 'Chemistry', icon: '🧪', topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Chemical Bonding', 'Thermodynamics', 'Equilibrium', 'Redox Reactions'] },
      { name: 'Mathematics', icon: '📐', topics: ['Algebra', 'Calculus', 'Coordinate Geometry', 'Trigonometry', 'Vectors', '3D Geometry', 'Probability', 'Matrices & Determinants'] },
    ],
    whyReasons: [
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: 'IIT Alumni Faculty', desc: 'Learn from IIT/NIT alumni who have cracked JEE themselves' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, title: 'Proven Material', desc: 'Research-backed study material updated with latest JEE patterns' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, title: 'Test Series', desc: 'All-India test series with detailed rank analysis and predictions' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, title: 'Small Batches', desc: 'Limited students per batch for personalized attention' },
    ],
    faqs: [
      { q: 'What is the difference between JEE Main and Advanced?', a: 'JEE Main is for NITs, IIITs, and other engineering colleges. JEE Advanced is only for IITs. Our course prepares you for both.' },
      { q: 'When do the JEE batches start?', a: 'Nurture and Enthuse batches start in April 2026. Dropper batch starts in June 2026 after board results.' },
      { q: 'Is the fee inclusive of study material?', a: 'Yes, the annual fee includes complete study material, test series, and all classroom sessions.' },
      { q: 'Can I switch between classroom and online mode?', a: 'Yes, you can switch modes with a 30-day notice. Fee adjustments will be made accordingly.' },
      { q: 'Do you provide hostel facilities?', a: 'We are located in Nashik and do not offer hostel facilities currently. Students from outside Nashik can find affordable PG options nearby.' },
    ],
  };

  return <CoursePage config={config} navigateTo={navigateTo} />;
};

export default JEEPage;
