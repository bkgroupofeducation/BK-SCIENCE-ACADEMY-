import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from './SafeImage';

const BoosterCourses = ({ navigateTo }) => {
  const lectures = [
    { 
      title: 'Rotational Motion - Full Concept', 
      subject: 'PHYSICS', 
      teacher: 'Star Faculty',
      id: 'NiwCUx8nCUU',
      url: 'https://youtu.be/NiwCUx8nCUU'
    },
    { 
      title: 'Sexual Reproduction in Flowering Plants', 
      subject: 'BIOLOGY', 
      teacher: 'Star Faculty',
      id: 'n0JK6LRwNrc',
      url: 'https://youtu.be/n0JK6LRwNrc'
    },
    { 
      title: 'Application of Derivatives - One Shot', 
      subject: 'MATHEMATICS', 
      teacher: 'Star Faculty',
      id: 'iemAC3yKh_M',
      url: 'https://youtu.be/iemAC3yKh_M'
    },
    { 
      title: 'Solid State - JEE/NEET Revision', 
      subject: 'CHEMISTRY', 
      teacher: 'Star Faculty',
      id: 'AAmYhzxmnNg',
      url: 'https://youtu.be/AAmYhzxmnNg'
    }
  ];

  return (
    <section className="pt-4 pb-8 md:pt-8 md:pb-12 mesh-gradient-pink relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full blur-[80px] animate-float-slow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] animate-float-delayed"></div>
      
      <div className="container mx-auto px-5 md:px-10 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-block px-5 py-2 bg-white border border-gray-100 text-brand-red text-[11px] md:text-[13px] font-black uppercase tracking-[0.4em] rounded-full mb-6 shadow-sm"
        >
          Knowledge Hub
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-3 md:mb-4 leading-[1.1] text-brand-dark">
          Video <span className="text-brand-red">Lectures</span>
        </h2>
        
        <p className="text-lg md:text-xl font-medium text-gray-500 mb-10 max-w-2xl mx-auto leading-snug">
          Learn complex concepts through high-quality video tutorials by our lead academic mentors.
        </p>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 max-w-7xl mx-auto [perspective:2000px]">
          {lectures.map((lecture, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.4 }
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative glass-panel p-4 md:p-6 rounded-[2.5rem] transition-all duration-500 flex flex-col justify-between text-left cursor-pointer border border-white"
              onClick={() => window.open(lecture.url, '_blank')}
            >
              <div className="relative z-10">
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-2xl group-hover:shadow-brand-red/30 transition-all duration-500">
                  <img 
                    src={`https://img.youtube.com/vi/${lecture.id}/maxresdefault.jpg`} 
                    alt={lecture.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-brand-dark/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]">
                    <div className="w-14 h-14 bg-brand-red rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-brand-red shadow-sm">
                    {lecture.subject}
                  </div>
                </div>
                
                <h3 className="text-sm md:text-lg font-black mb-6 leading-tight tracking-tight text-brand-dark group-hover:text-brand-red transition-colors duration-300 line-clamp-2">
                  {lecture.title}
                </h3>
              </div>

              <div className="flex items-center justify-between group/btn">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Watch Now</span>
                <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center transform group-hover/btn:translate-x-2 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.div 
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoosterCourses;
