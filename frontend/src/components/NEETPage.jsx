import React from 'react';
import CoursePage from './CoursePage';

const NEETPage = ({ navigateTo }) => {
  const config = {
    heroTitle: 'NEET',
    heroHighlight: 'Preparation',
    heroDesc: 'Focused NEET (UG) preparation for aspiring doctors. Expert Biology faculty, NCERT-based approach, and proven results at our Nashik center.',
    heroPills: ['Expert Biology Faculty', 'NCERT Focus', 'Regular Mocks', 'Doubt Resolution'],
    shortName: 'NEET',
    gradient: 'from-red-600 via-red-700 to-red-900',
    accentColor: 'bg-red-50',
    stats: [
      { value: '12K+', label: 'Students', icon: '🎓' },
      { value: '92%', label: 'Selection', icon: '🏥' },
      { value: '40+', label: 'Faculty', icon: '👨‍🏫' },
      { value: '19+', label: 'Years', icon: '🏛️' },
    ],
    batches: [
      {
        name: 'NEET NURTURE',
        target: 'For Class 11th',
        duration: '2 Years',
        startDate: '1st April 2026',
        fees: '₹1,50,000 (2-Year Total)',
        classes: '6 Days',
        features: ['Complete Board + NEET Syllabus', 'Biology Deep Dive', 'Weekly Tests', 'NCERT Mastery', 'Study Material Included', 'Parent Counseling'],
      },
      {
        name: 'NEET ENTHUSE',
        target: 'For Class 12th',
        duration: '2 Years',
        startDate: '1st April 2026',
        fees: '₹1,50,000 (2-Year Total)',
        classes: '6 Days',
        features: ['Intensive NEET Preparation', 'Board + NEET Integration', 'All India Test Series', 'Biology Focus', 'Study Material Included', 'Rank Improvement Focus'],
      },
      {
        name: 'NEET DROPPER',
        target: 'For Class 12th Pass',
        duration: '2 Years',
        startDate: '1st June 2026',
        fees: '₹1,50,000 (2-Year Total)',
        classes: '6 Days',
        features: ['Full Syllabus Revision', 'NCERT Deep Analysis', 'Weekly Mock Tests', 'Weak Area Focus', 'Strategy Sessions', 'Medical Career Guidance'],
      },
    ],
    syllabus: [
      { name: 'Physics', icon: '⚡', topics: ['Mechanics', 'Thermodynamics', 'Electrostatics', 'Current Electricity', 'Magnetism', 'Optics', 'Modern Physics', 'Waves'] },
      { name: 'Chemistry', icon: '🧪', topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Biomolecules', 'Chemical Bonding', 'Equilibrium', 'Electrochemistry'] },
      { name: 'Biology', icon: '🧬', topics: ['Cell Biology', 'Genetics & Evolution', 'Human Physiology', 'Plant Physiology', 'Ecology', 'Biotechnology', 'Reproduction', 'Human Health & Disease'] },
    ],
    whyReasons: [
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: 'Biology Specialists', desc: 'Dedicated Biology faculty with medical background and NEET expertise' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, title: 'NCERT Mastery', desc: 'Our approach is NCERT-first, covering every line and diagram thoroughly' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, title: 'NEET Pattern Tests', desc: 'Tests designed to match exact NEET pattern with negative marking practice' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>, title: 'Medical Guidance', desc: 'Career counseling for medical aspirants including college selection support' },
    ],
    faqs: [
      { q: 'What is the NEET exam pattern?', a: 'NEET has 200 MCQs (180 to attempt) from Physics, Chemistry, and Biology. Total 720 marks with negative marking.' },
      { q: 'Is Biology the main focus?', a: 'Yes, Biology carries 360 marks (50% of total). Our program gives extra emphasis on Botany and Zoology while ensuring strong Physics and Chemistry.' },
      { q: 'When do NEET batches start?', a: 'Nurture and Enthuse batches start in April 2026. Dropper batch starts in June 2026 after NEET results.' },
      { q: 'Do you cover state board syllabus too?', a: 'Yes, we cover both CBSE and State Board syllabi along with NEET-specific topics.' },
      { q: 'What is the student-to-teacher ratio?', a: 'We maintain a maximum of 30 students per batch for personalized attention and regular doubt clearing.' },
    ],
  };

  return <CoursePage config={config} navigateTo={navigateTo} />;
};

export default NEETPage;
