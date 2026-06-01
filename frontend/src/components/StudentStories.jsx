import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from './SafeImage';

const StudentStories = () => {
  const stories = [
    { name: 'Arnav Nigam', quote: 'The disciplined study environment, regular mock tests, and mentor support at BK Science Academy made preparation effective. Today, I\'m studying at IIT MUMBAI.', rank: 'JEE 2025 (AIR 11)', img: '/assets/ranker1.png', color: 'bg-orange-100/40' },
    { name: 'Prafful Solanki', quote: 'The best thing about BK Science Academy was how approachable the faculty was. I could walk into their cabins anytime with even the smallest doubts.', rank: 'NEET 2024 (AIR 71)', img: '/assets/ranker2.png', color: 'bg-blue-100/40' }
  ];

  return (
    <section className="pt-4 pb-8 mesh-gradient-pink overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="container mx-auto px-5 md:px-8">
        <div className="text-center mb-6 md:mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-white/50 backdrop-blur-sm text-brand-red text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] rounded-full mb-3 border border-brand-red/10 shadow-sm"
          >
            Success Stories
          </motion.div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-dark uppercase tracking-tighter mb-2 leading-[1] text-center">
            Inspiring <span className="text-brand-red">Journeys</span>
          </h2>
          <div className="w-16 h-1 bg-brand-red/20 mx-auto rounded-full mt-3"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {stories.map((story, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 40px 80px -20px rgba(0,0,0,0.15)"
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col md:flex-row gap-6 md:gap-8 items-center bg-white/70 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] shadow-2xl border border-white relative group"
            >
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-brand-red/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className={`w-32 md:w-40 aspect-square ${story.color} rounded-[2rem] overflow-hidden border-4 border-white shadow-xl relative z-10 transition duration-700`}>
                  <SafeImage src={story.img} alt={story.name} className="w-full h-full object-cover object-top transition transform group-hover:scale-110 duration-1000" fallbackText="Student" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left relative z-10">
                <div className="text-5xl md:text-7xl font-black text-brand-red/5 absolute -top-8 md:-top-12 -left-2 md:-left-6 select-none">&ldquo;</div>
                <p className="text-sm md:text-lg font-black text-brand-dark mb-4 md:mb-6 leading-relaxed">" {story.quote} "</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-brand-red uppercase tracking-widest leading-none mb-1">{story.name}</h3>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 tracking-[0.2em] uppercase">{story.rank}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 group/btn cursor-pointer">
                    <span className="text-[9px] font-black text-brand-dark uppercase tracking-widest group-hover:text-brand-red transition-colors">Read Full Story</span>
                    <div className="w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white group-hover:bg-brand-red group-hover:translate-x-1 transition-all duration-300 shadow-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.div 
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentStories;
