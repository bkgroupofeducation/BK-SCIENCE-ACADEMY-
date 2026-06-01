import React from 'react';
import { useParams } from 'react-router-dom';
import CoursePage from './CoursePage';
import { COURSE_DATA } from '../data/courses';

const CourseLevelDetail = ({ type, navigateTo }) => {
  const { level } = useParams();
  
  // Find correct config from central data
  const courseConfig = COURSE_DATA[type]?.[level];
  
  if (!courseConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-black text-brand-dark mb-4">Course Level Not Found</h1>
          <p className="text-gray-500 mb-8 font-bold">The page you are looking for does not exist yet.</p>
          <button onClick={() => navigateTo('home')} className="bg-brand-red text-white py-3 px-8 rounded-xl font-bold uppercase tracking-widest text-sm">Return Home</button>
        </div>
      </div>
    );
  }

  return <CoursePage config={courseConfig} navigateTo={navigateTo} />;
};

export default CourseLevelDetail;
