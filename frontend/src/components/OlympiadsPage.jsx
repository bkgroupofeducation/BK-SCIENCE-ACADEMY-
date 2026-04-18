import React from 'react';
import CoursePage from './CoursePage';

const OlympiadsPage = ({ navigateTo }) => {
  const config = {
    heroTitle: 'Olympiad',
    heroHighlight: 'Program',
    heroDesc: 'Specialized preparation for JEE-level Olympiads - PRMO, RMO, NSEP, NSEC, and more. Build strong concepts and earn prestigious achievements.',
    heroPills: ['IIT-Level Concepts', 'National Rankings', 'Camp Selection', 'Expert Mentors'],
    shortName: 'Olympiads',
    gradient: 'from-yellow-500 via-orange-600 to-red-700',
    accentColor: 'bg-yellow-50',
    stats: [
      { value: '5,000+', label: 'Qualified', icon: '🏆' },
      { value: '85+', label: 'State Toppers', icon: '🥇' },
      { value: '42+', label: 'National Camp', icon: '🎯' },
      { value: '19+', label: 'Years', icon: '🏛️' },
    ],
    batches: [
      {
        name: 'OLYMPIAD NURTURE',
        target: 'Class 9-10 Students',
        duration: '2 Years',
        startDate: '1st April 2026',
        fees: '₹1,50,000 (2-Year Total)',
        classes: '4 Days',
        features: ['PRMO Foundation', 'RMO Preparation', 'Concept Deep Dive', 'Previous Year Papers', 'Monthly Tests', 'National Camp Focus'],
      },
      {
        name: 'OLYMPIAD ENTHUSE',
        target: 'Class 11-12 Students',
        duration: '2 Years',
        startDate: '1st April 2026',
        fees: '₹1,50,000 (2-Year Total)',
        classes: '4 Days',
        features: ['NSEP/NSEC/NSEB', 'INPhO/INChO/INBO', 'Advanced Problem Solving', 'Subject Olympiads', 'Camp Preparation', 'Mock Tests'],
      },
      {
        name: 'OLYMPIAD BOOSTER',
        target: 'Class 11-12 (Advanced)',
        duration: '2 Years',
        startDate: '1st July 2026',
        fees: '₹1,50,000 (2-Year Total)',
        classes: '3 Days',
        features: ['Intensive Revision', 'Previous Year Questions', 'Problem-Solving Tricks', 'Mock Olympiads', 'Exam Strategy', 'Last Minute Tips'],
      },
    ],
    syllabus: [
      { name: 'Mathematics', icon: '📐', topics: ['Number Theory', 'Combinatorics', 'Geometry', 'Algebra', 'Inequalities', 'Functional Equations', 'Graph Theory'] },
      { name: 'Physics', icon: '⚡', topics: ['Mechanics', 'Electromagnetism', 'Optics', 'Thermodynamics', 'Modern Physics', 'Fluid Mechanics', 'Waves & Oscillations'] },
      { name: 'Chemistry', icon: '🧪', topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Coordination Compounds', 'Thermodynamics', 'Electrochemistry'] },
      { name: 'Biology', icon: '🧬', topics: ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology', 'Plant Physiology', 'Biomolecules', 'Evolution'] },
    ],
    whyReasons: [
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>, title: 'National Recognition', desc: 'Olympiad achievements are recognized by IITs and top universities for admissions' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: 'Expert Faculty', desc: 'Learn from previous Olympiad medalists and IIT alumni with specialized training' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, title: 'Problem-Solving Skills', desc: 'Advanced problem-solving techniques that help in JEE Advanced as well' },
      { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, title: 'National Camp Access', desc: 'Top performers get selected for prestigious national training camps' },
    ],
    faqs: [
      { q: 'Which Olympiads do you cover?', a: 'We cover Mathematics (PRMO/RMO), Physics (NSEP/INPhO), Chemistry (NSEC/INChO), Biology (NSEB/INBO), and Astronomy (NSEA).' },
      { q: 'How is Olympiad different from JEE preparation?', a: 'Olympiads require deeper conceptual understanding and problem-solving at an advanced level. Our program builds extra depth beyond JEE.' },
      { q: 'When should I start preparing for Olympiads?', a: 'For PRMO/RMO, Class 9 is ideal. For NSEP/NSEC, Class 11 is recommended. Earlier start gives better results.' },
      { q: 'Do Olympiad achievements help in JEE?', a: 'Yes! Strong Olympiad concepts significantly boost JEE Advanced performance. Many top JEE rankers have Olympiad background.' },
      { q: 'How many students get selected for national camps?', a: 'From each subject, top 35-40 students from the entire country are selected for the national camp, where they train for International Olympiads.' },
    ],
  };

  return <CoursePage config={config} navigateTo={navigateTo} />;
};

export default OlympiadsPage;