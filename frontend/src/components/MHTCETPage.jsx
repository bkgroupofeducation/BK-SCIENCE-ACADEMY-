import React from 'react';
import CoursePage from './CoursePage';

const MHTCETPage = ({ navigateTo }) => {
  const config = {
    heroTitle: 'MHT-CET',
    heroHighlight: 'Engineering & Pharmacy',
    heroDesc: 'Top-tier MHT-CET coaching in Nashik. Meticulously designed curriculum focusing on state-board syllabus mastery, speed tricks, and mock test rigor to secure top state ranks.',
    heroPills: ['State-Board Focused', 'Speed & Accuracy Drills', 'Topic-wise Mock Tests', 'COEP/VJTI Alumni Mentors'],
    shortName: 'MHT-CET',
    gradient: 'from-blue-600 via-blue-700 to-indigo-900',
    accentColor: 'bg-blue-50',
    stats: [
      { value: '8K+', label: 'Students Trained', icon: '🎓' },
      { value: '98%', label: 'Success Rate', icon: '🏆' },
      { value: '35+', label: 'Expert Faculty', icon: '👨‍🏫' },
      { value: '10+', label: 'COEP Selections', icon: '🏛️' },
    ],
    batches: [
      {
        name: 'MHT-CET CRASH COURSE',
        target: 'For Class 12th Appearing',
        duration: '3 Months (Intensive)',
        startDate: '1st April 2026',
        fees: '₹1,50,000 Per Year',
        classes: '6 Days a Week',
        features: ['Full Syllabus Revision (Phy, Chem, Math/Bio)', '50+ Dedicated Mock Tests', 'Shortcut tricks & formula revision sheets', 'Personal Mentorship & Doubt Solvers', 'State Board + CET Sync', 'All-India Ranking Analysis'],
      },
      {
        name: 'MHT-CET INTEGRATED',
        target: 'For Class 11th & 12th',
        duration: '2 Years',
        startDate: '1st April 2026',
        fees: '₹1,50,000 Per Year',
        classes: '6 Days a Week',
        features: ['Full 11th & 12th Board Syllabus', 'In-depth Conceptual Foundations', 'Weekly Classroom Tests', 'Study Material & Revision Modules', 'Parent-Teacher Consultations', 'Continuous Rank Boosting Focus'],
      },
      {
        name: 'MHT-CET ACHIEVER BATCH',
        target: 'For Class 12th Pass (Droppers)',
        duration: '1 Year',
        startDate: '1st June 2026',
        fees: '₹1,50,000 Per Year',
        classes: '6 Days a Week',
        features: ['Rigorous MCQ Solving Sessions', 'Daily Practice Papers (DPP)', 'Weekly All-Maharashtra Mock Tests', 'Detailed Error Analysis', 'Focus on High-weightage Topics', 'Dedicated Doubt Clearing Desk'],
      },
    ],
    syllabus: [
      { name: 'Physics', icon: '⚡', topics: ['Rotational Dynamics', 'Thermodynamics', 'Electrostatics', 'Current Electricity', 'Electromagnetic Induction', 'Wave Optics', 'Modern Physics', 'Oscillations'] },
      { name: 'Chemistry', icon: '🧪', topics: ['Chemical Thermodynamics', 'Electrochemistry', 'Chemical Kinetics', 'Coordination Compounds', 'Organic Compounds', 'Biomolecules', 'Polymers', 'Green Chemistry'] },
      { name: 'Mathematics', icon: '📐', topics: ['Mathematical Logic', 'Matrices', 'Trigonometric Functions', 'Vectors', 'Three Dimensional Geometry', 'Linear Programming', 'Calculus', 'Probability Distribution'] },
    ],
    whyReasons: [
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: 'Speed Techniques', desc: 'Master unique shortcut methods to solve CET MCQs in less than 45 seconds.' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, title: 'MH-State Board Focus', desc: '100% alignment with the Maharashtra State Board textbook curriculum.' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, title: 'All-Maharashtra Mocks', desc: 'Weekly online simulation tests to measure your rank against state-wide competition.' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, title: 'Personal Mentorship', desc: '1:1 performance mapping and college counseling support for VJTI, COEP, PICT, etc.' },
    ],
    faqs: [
      { q: 'What is the format of MHT-CET?', a: 'MHT-CET is a computer-based test (CBT) consisting of Multiple Choice Questions. For Engineering (PCM), it is 200 marks total (100 marks for Math, and 50 marks each for Physics and Chemistry).' },
      { q: 'Is there negative marking in MHT-CET?', a: 'No, there is no negative marking in the MHT-CET exam, making it crucial to attempt all questions using smart guessing and elimination techniques.' },
      { q: 'How is the syllabus divided between Class 11 and 12?', a: 'Approximately 80% of the weightage is given to the Class 12 Maharashtra State Board syllabus, and 20% weightage is given to specific chapters of the Class 11 State Board syllabus.' },
      { q: 'Is the course fee inclusive of all mock tests and books?', a: 'Yes, the annual comprehensive program fee includes all books, complete test series (both online and offline), shortcut handbooks, and specialized formula cards.' },
    ],
  };

  return <CoursePage config={config} navigateTo={navigateTo} />;
};

export default MHTCETPage;
