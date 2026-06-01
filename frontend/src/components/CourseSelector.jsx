import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SafeImage from './SafeImage';

const CourseSelector = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState('JEE');
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const courses = {
    'JEE': [
      { name: 'JEE FLOW', target: 'Class 11th', batch: 'April 2026', img: '/assets/jeeflow.png', gradient: 'from-blue-600 to-indigo-900', shadow: 'shadow-blue-500/20', price: '60,000 Per Year' },
      { name: 'JEE TITAN', target: 'Class 12th', batch: 'April 2026', img: '/assets/jeetitan.png', gradient: 'from-indigo-600 to-indigo-900', shadow: 'shadow-indigo-500/20', price: '60,000 Per Year' },
      { name: 'JEE RISE', target: 'Repeater', batch: 'June 2026', img: '/assets/jeerise.png', gradient: 'from-indigo-800 to-slate-900', shadow: 'shadow-slate-500/20', price: '60,000 Per Year' }
    ],
    'NEET': [
      { name: 'NEET NOVA', target: 'Class 11th', batch: 'April 2026', img: '/assets/neetnova.png', gradient: 'from-red-600 to-rose-900', shadow: 'shadow-red-500/20', price: '1,50,000 Per Year' },
      { name: 'NEET PRIME', target: 'Class 12th', batch: 'April 2026', img: '/assets/neetprime.png', gradient: 'from-rose-600 to-red-900', shadow: 'shadow-rose-500/20', price: '1,50,000 Per Year' },
      { name: 'NEET VECTOR', target: 'Repeater', batch: 'June 2026', img: '/assets/neetvector.png', gradient: 'from-red-800 to-zinc-900', shadow: 'shadow-zinc-500/20', price: '1,50,000 Per Year' }
    ],
    '11th & 12th': [
      { name: '11 & 12 PCM GROUP', target: 'Class 11 & 12', batch: 'April 2026', img: '/assets/Closest image/pcm.jpeg', gradient: 'from-amber-500 to-orange-700', shadow: 'shadow-amber-500/20', price: '1,50,000 Per Year' },
      { name: '11 & 12 PCB GROUP', target: 'Class 11 & 12', batch: 'April 2026', img: '/assets/Closest image/pcb.jpeg', gradient: 'from-orange-500 to-red-700', shadow: 'shadow-orange-500/20', price: '1,50,000 Per Year' }
    ],
    'MHT-CET': [
      { name: 'MHT-CET CRASH COURSE', target: 'Class 12th', batch: 'April 2026', img: '/assets/Closest image/cet.png', gradient: 'from-blue-500 to-indigo-700', shadow: 'shadow-blue-500/20', price: '1,50,000 Per Year' }
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current && window.innerWidth < 768) {
        const container = scrollRef.current;
        const totalCourses = courses[activeTab].length;
        const nextIndex = (currentIndex + 1) % totalCourses;
        
        const cardWidth = container.scrollWidth / totalCourses;
        container.scrollTo({
          left: nextIndex * cardWidth,
          behavior: 'smooth'
        });
        
        setCurrentIndex(nextIndex);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [currentIndex, activeTab]);

  return (
    <section className="pt-4 pb-4 md:pt-8 md:pb-8 mesh-gradient-light overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="container mx-auto px-5 md:px-10 relative z-10">
        <div className="flex flex-col items-center text-center gap-6 mb-10">
          <div className="w-full max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-5 py-2 bg-white/50 backdrop-blur-sm text-brand-red text-[11px] md:text-[13px] font-black uppercase tracking-[0.4em] rounded-full mb-4 border border-brand-red/10 shadow-sm"
            >
              Academic Future
            </motion.div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-dark tracking-tighter leading-[1.1] mb-4 md:mb-6 uppercase">
              The Path To <span className="text-brand-red">Excellence</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-snug">
              Select your goal and let us guide you to the pinnacle of success with our curated academic programs.
            </p>
          </div>
          
          <div className="w-full md:w-auto overflow-hidden">
            <div className="flex gap-1.5 p-1.5 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">
              {['JEE', 'NEET', 'MHT-CET', '11th & 12th'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveTab(item);
                    setCurrentIndex(0);
                    if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }}
                  className={`py-3.5 px-8 md:px-12 rounded-[2rem] text-[10px] md:text-sm font-black transition-all duration-500 whitespace-nowrap uppercase tracking-widest snap-center ${
                    activeTab === item 
                      ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30 scale-[1.02]' 
                      : 'text-gray-500 hover:text-brand-dark hover:bg-gray-50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex flex-row md:grid md:grid-cols-3 gap-6 md:gap-10 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 md:pb-0 [perspective:2000px]"
        >
          {courses[activeTab].map((course, i) => (
            <motion.div 
              key={i} 
              onClick={() => navigateTo(activeTab.toLowerCase())}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.4 }
              }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 cursor-pointer min-w-[85vw] md:min-w-0 snap-center flex flex-col"
            >
              <div className="relative overflow-hidden aspect-[4/3] w-full shrink-0">
                 <SafeImage src={course.img} alt={course.name} className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-1000" fallbackText="Course" />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="p-5 md:p-8 flex flex-col justify-between flex-1">

                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="w-8 md:w-16 h-[2px] bg-brand-red/20 group-hover:w-full transition-all duration-700 origin-left"></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{course.batch}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-brand-dark mb-2 leading-tight group-hover:text-brand-red transition-colors duration-500">{course.name}</h3>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 mb-4 transition-colors group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red">
                    <span className="w-2 h-2 rounded-full bg-brand-red group-hover:bg-white animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest">{course.target}</span>
                  </div>
                </div>
                
                <div className="mt-auto flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-black text-brand-dark tracking-tighter leading-none group-hover:scale-110 transition-transform flex flex-col items-center sm:flex-row sm:items-baseline gap-1">
                    ₹{course.price.split(' ')[0]}
                    {course.price.includes(' ') && (
                      <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest block">
                        {course.price.split(' ').slice(1).join(' ')}
                      </span>
                    )}
                  </span>
                  <div className="hidden md:block text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] text-center mt-3 group-hover:text-brand-red transition-colors">Click to Explore Details</div>
                </div>

                {/* Subtle Shimmer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.div 
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSelector;
