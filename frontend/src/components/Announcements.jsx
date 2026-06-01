import React from 'react';
import { motion } from 'framer-motion';

const Announcements = ({ navigateTo }) => {
  const items = [
    { title: 'New Academic Session 2026-27', date: 'ADMISSIONS OPEN', icon: '📢', color: 'bg-red-500', glow: 'shadow-red-500/20' },
    { title: 'Scholarship Test (BK Champions) Date Announced', date: '15TH APRIL 2026', icon: '📝', color: 'bg-brand-yellow', glow: 'shadow-brand-yellow/20' }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden relative">
      {/* 3D Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4"></div>
      
      <div className="container mx-auto px-5 md:px-10 relative z-10">
        {/* Centered Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 bg-brand-red/10 text-brand-red text-[12px] md:text-[14px] font-black uppercase tracking-[0.4em] rounded-full mb-2 shadow-sm border border-brand-red/5"
          >
            Live Updates
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-dark uppercase tracking-tighter mb-3 md:mb-4 leading-[1.1]">
            Latest <span className="text-brand-red inline-block">News</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-500 font-bold max-w-2xl mx-auto leading-relaxed">
            Stay ahead with real-time updates regarding JEE, NEET, and Board Exams.
          </p>
        </div>

        {/* 2 Column Grid */}
        <div className="max-w-6xl mx-auto [perspective:2000px]">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-12">
            {items.map((item, i) => (
              <motion.div 
                key={i} 
                onClick={() => {
                  if (item.title.toLowerCase().includes('admissions') || item.date.toLowerCase().includes('admissions')) navigateTo('registration');
                  else if (item.title.toLowerCase().includes('jee')) navigateTo('jee');
                  else if (item.title.toLowerCase().includes('scholarship')) navigateTo('scholarship');
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                  rotateY: i % 2 === 0 ? 8 : -8, 
                  rotateX: 5,
                  scale: 1.05,
                  translateZ: 50
                }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border border-white/20 shadow-2xl overflow-hidden cursor-pointer"
              >
                {/* 3D Glass Glow */}
                <div className="absolute -inset-1 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[4rem]"></div>
                
                <div className="relative z-10 flex flex-col gap-8">
                  <div className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center text-4xl shadow-xl ${item.glow} group-hover:scale-110 transition-transform duration-500`}>
                    {item.icon}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse"></span>
                      <span className="text-xs md:text-sm font-black text-gray-400 uppercase tracking-widest">{item.date}</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-black text-brand-dark leading-tight group-hover:text-brand-red transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Floating Shine */}
                <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
