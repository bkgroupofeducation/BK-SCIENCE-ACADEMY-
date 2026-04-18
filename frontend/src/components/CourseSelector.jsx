import React, { useState } from 'react';
import SafeImage from './SafeImage';

const CourseSelector = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState('JEE');

  const courses = {
    'JEE': [
      { name: 'JEE NURTURE', target: 'Class 11th', batch: 'April 2026', img: '/assets/ranker1.png', gradient: 'from-blue-600 to-indigo-900', shadow: 'shadow-blue-500/20' },
      { name: 'JEE ENTHUSE', target: 'Class 12th', batch: 'April 2026', img: '/assets/ranker2.png', gradient: 'from-indigo-600 to-indigo-900', shadow: 'shadow-indigo-500/20' },
      { name: 'JEE DROPPER', target: 'Repeater', batch: 'June 2026', img: '/assets/hero.png', gradient: 'from-indigo-800 to-slate-900', shadow: 'shadow-slate-500/20' }
    ],
    'NEET': [
      { name: 'NEET NURTURE', target: 'Class 11th', batch: 'April 2026', img: '/assets/ranker2.png', gradient: 'from-red-600 to-rose-900', shadow: 'shadow-red-500/20' },
      { name: 'NEET ENTHUSE', target: 'Class 12th', batch: 'April 2026', img: '/assets/ranker1.png', gradient: 'from-rose-600 to-red-900', shadow: 'shadow-rose-500/20' },
      { name: 'NEET DROPPER', target: 'Repeater', batch: 'June 2026', img: '/assets/hero.png', gradient: 'from-red-800 to-zinc-900', shadow: 'shadow-zinc-500/20' }
    ],
    'Foundation': [
      { name: '9TH CLASS', target: 'Foundation', batch: 'April 2026', img: '/assets/ranker1.png', gradient: 'from-amber-500 to-orange-700', shadow: 'shadow-amber-500/20' },
      { name: '10TH CLASS', target: 'Foundation', batch: 'April 2026', img: '/assets/ranker2.png', gradient: 'from-orange-500 to-red-700', shadow: 'shadow-orange-500/20' },
      { name: 'KVPY/OLYMPIAD', target: 'Special', batch: 'April 2026', img: '/assets/hero.png', gradient: 'from-yellow-600 to-orange-800', shadow: 'shadow-yellow-500/20' }
    ]
  };

  return (
    <section className="py-24 md:py-32 bg-gray-50/50 overflow-hidden relative">
      <div className="container mx-auto px-5 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1.5 bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">Course Explorer</div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-dark tracking-tighter leading-[0.95] mb-6">
              Empowering Your <br />
              <span className="text-brand-red italic">Academic Future</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xl font-medium">Select your goal and let us guide you to the pinnacle of success.</p>
          </div>
          
          <div className="flex p-1.5 bg-white border border-gray-200 rounded-[2rem] shadow-xl shadow-black/5 self-start md:self-auto overflow-x-auto scrollbar-hide">
            {['JEE', 'NEET', 'Foundation'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`flex-1 py-4 px-8 md:px-12 rounded-[1.5rem] text-sm md:text-base font-black transition-all duration-500 whitespace-nowrap uppercase tracking-widest ${
                  activeTab === item ? 'bg-brand-dark text-white shadow-lg scale-[1.05]' : 'text-gray-400 hover:text-brand-dark'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {courses[activeTab].map((course, i) => (
            <div 
              key={i} 
              onClick={() => navigateTo(activeTab.toLowerCase())}
              className="group relative bg-white rounded-[3.5rem] overflow-hidden border border-gray-100 shadow-2xl shadow-black/[0.03] transition-all duration-700 hover:-translate-y-4 hover:shadow-black/[0.08] cursor-pointer"
            >
              <div className="p-10 flex flex-col justify-between min-h-[500px]">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-[2px] bg-brand-red"></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{course.batch}</span>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-black text-brand-dark mb-4 leading-tight group-hover:text-brand-red transition-colors duration-500">{course.name}</h3>
                  
                  <div className="inline-flex items-center gap-2 px-5 py-2 bg-gray-50 rounded-full border border-gray-100 mb-8 transition-colors group-hover:bg-brand-red/5 group-hover:border-brand-red/20">
                    <span className="w-2 h-2 rounded-full bg-brand-red"></span>
                    <span className="text-xs font-black text-brand-dark uppercase tracking-widest">{course.target}</span>
                  </div>
                </div>
                
                <div className="relative mb-10">
                  <div className={`absolute -inset-4 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-10 rounded-[3rem] transition-all duration-700`}></div>
                  <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                    <SafeImage src={course.img} alt={course.name} className="w-full h-full object-cover object-top transition duration-1000 transform group-hover:scale-110" fallbackText="Course" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                  
                  {/* Floating Action Button */}
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-brand-red text-white flex items-center justify-center rounded-[2rem] shadow-2xl shadow-brand-red/40 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
                
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-center mt-auto">Click to Explore Syllabus</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSelector;
