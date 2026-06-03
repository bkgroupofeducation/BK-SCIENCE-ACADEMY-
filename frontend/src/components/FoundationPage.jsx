import React from 'react';
import CoursePage from './CoursePage';

const FoundationPage = ({ navigateTo }) => {
  const config = {
    heroTitle: 'Foundation',
    heroHighlight: 'Program',
    heroDesc: 'Build a rock-solid foundation for future JEE/NEET success. Early start programs for Class 6th to 10th students at our Nashik center.',
    heroPills: ['Concept Building', 'Critical Thinking', 'NCERT Mastery', 'Competitive Edge'],
    shortName: 'Foundation',
    gradient: 'from-amber-500 via-yellow-600 to-orange-700',
    accentColor: 'bg-yellow-50',
    stats: [
      { value: '5K+', label: 'Students', icon: '🎓' },
      { value: '98%', label: 'Board Toppers', icon: '🏆' },
      { value: '30+', label: 'Faculty', icon: '👨‍🏫' },
      { value: '19+', label: 'Years', icon: '🏛️' },
    ],
    batches: [
      {
        name: '11 & 12 PCM GROUP',
        target: 'For Class 11th & 12th',
        duration: '2 Years',
        startDate: '1st April 2026',
        fees: '₹1,50,000 (2-Year Total)',
        classes: '5 Days',
        features: ['Board + Foundation Integration', 'Pre-JEE/NEET Concepts', 'Advanced Problem Solving', 'Science & Math Mastery', 'Weekly Tests', 'Career Counseling'],
      },
      {
        name: '11 & 12 PCB GROUP',
        target: 'For Class 11th & 12th',
        duration: '2 Years',
        startDate: '1st April 2026',
        fees: '₹1,50,000 (2-Year Total)',
        classes: '5 Days',
        features: ['Board Excellence + JEE/NEET Base', 'Analytical Skills', 'Stream Selection Guidance', 'Advanced Problem Solving', 'Mock Board Exams', 'Entrance Prep Foundation'],
      },
    ],
    syllabus: [
      { name: 'Mathematics', icon: '📐', topics: ['Number Systems', 'Algebra Basics', 'Geometry', 'Mensuration', 'Data Handling', 'Trigonometry Intro', 'Coordinate Geometry', 'Polynomials'] },
      { name: 'Science', icon: '🔬', topics: ['Matter & Materials', 'Life Processes', 'Light & Sound', 'Electricity Basics', 'Chemical Reactions', 'Force & Motion', 'Cell Structure', 'Ecosystems'] },
      { name: 'Mental Ability', icon: '🧠', topics: ['Logical Reasoning', 'Pattern Recognition', 'Verbal Reasoning', 'Non-Verbal Reasoning', 'Series & Sequences', 'Coding-Decoding', 'Blood Relations', 'Direction Sense'] },
    ],
    whyReasons: [
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, title: 'Early Advantage', desc: 'Starting early builds concepts that give students a massive edge in competitive exams' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: 'Competitive Edge', desc: 'Starting early builds concepts that give students a massive edge in school and competitive environments' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, title: 'NCERT Excellence', desc: 'Our foundation program ensures 95%+ marks in school board exams' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: 'Fun Learning', desc: 'Activity-based, interactive teaching that makes learning enjoyable for younger students' },
    ],
    faqs: [
      { q: 'When should my child start Foundation coaching?', a: 'Ideally from Class 8th or 9th. However, we have programs starting from Class 6th for early starters.' },
      { q: 'Is Foundation only for JEE/NEET aspirants?', a: 'Not necessarily. Foundation builds strong concepts useful for any competitive exam or academic pursuit.' },

      { q: 'How is Foundation different from school tuition?', a: 'Foundation goes beyond school syllabus. It builds advanced problem-solving skills, logical thinking, and competitive exam readiness.' },
      { q: 'What is the Tapasya program?', a: 'Tapasya is our intensive Foundation track for highly motivated students aiming for top engineering and medical ranks and early JEE/NEET preparation.' },
    ],
  };

  return <CoursePage config={config} navigateTo={navigateTo} />;
};

export default FoundationPage;
