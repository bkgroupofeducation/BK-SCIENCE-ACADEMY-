import React from 'react';
import SafeImage from './SafeImage';

const BoosterCourses = ({ navigateTo }) => {
  const courses = [
    { title: 'JEE/NEET Complete Online Preparation', subtitle: 'AMRIT COURSE- Recorded Video Lectures', price: '@1800*', img: '/assets/ranker1.png' },
    { title: 'NCERT Practice Books For 10th, 11th, 12th & 12th Pass', subtitle: 'Ab JEE/NEET ki preparation ke sath NCERT ke bhi concepts honge strong!', img: '/assets/ranker2.png' },
    { title: 'Study Material Package For Class 11th, 12th & 12th Pass', subtitle: 'Bridging gaps between you & your success', img: '/assets/hero.png' }
  ];

  return (
    <section className="py-16 md:py-20 bg-[#a01a1a] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
      <div className="container mx-auto px-5 md:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3">
          Performance Booster <span className="text-white opacity-80">Courses</span>
        </h2>
        <p className="text-base md:text-lg font-medium opacity-70 mb-12 max-w-xl mx-auto">
          Keep up with short-term courses for long-term success.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {courses.map((course, i) => (
            <div key={i} className="bg-white text-brand-dark p-6 rounded-3xl shadow-lg transform transition hover:-translate-y-2 duration-500 flex flex-col justify-between text-left">
              <div>
                <SafeImage src={course.img} alt={course.title} className="w-full aspect-video object-cover object-top rounded-2xl mb-5 shadow-md" fallbackText="Course" />
                <h4 className="text-xs font-black text-brand-red uppercase tracking-widest mb-2 leading-tight">{course.subtitle}</h4>
                <h3 className="text-lg md:text-xl font-black mb-3 leading-tight">{course.title}</h3>
                {course.price && <p className="text-2xl font-black text-brand-red mb-4">{course.price}</p>}
              </div>
              <button 
                onClick={() => navigateTo('online-courses')}
                className="w-full py-3 rounded-xl border-2 border-brand-red text-brand-red font-black uppercase text-sm tracking-widest hover:bg-brand-red hover:text-white transition"
              >
                Explore Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoosterCourses;
