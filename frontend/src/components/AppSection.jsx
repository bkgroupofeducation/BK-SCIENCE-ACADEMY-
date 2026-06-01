import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from './SafeImage';

const AppSection = () => {
  return (
    <section className="pt-8 pb-12 bg-slate-50 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-brand-red/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-brand-yellow/10 rounded-full blur-[100px] animate-float-slow"></div>
      
      <div className="container mx-auto px-5 md:px-10 grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="text-center md:text-left relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-block px-5 py-2 bg-brand-red text-white text-[12px] md:text-sm font-black rounded-full mb-8 shadow-xl shadow-brand-red/30 uppercase tracking-[0.2em]"
          >
            BK Science Academy App
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-dark mb-6 tracking-tighter leading-[1.1] uppercase">
            Best Exam Prep <span className="text-brand-red underline decoration-brand-yellow/30 underline-offset-8">App For</span>
          </h2>
          
          <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
            {['JEE', 'NEET', 'Foundation'].map((tag, i) => (
              <span key={i} className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl text-[10px] md:text-xs font-black text-brand-dark shadow-sm uppercase tracking-widest">{tag}</span>
            ))}
          </div>

          <p className="text-lg md:text-xl text-gray-500 font-medium mb-12 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Download the BK Science Academy App & enhance your exam preparation anytime, anywhere! Get access to live and recorded lectures on your fingertips.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <motion.div 
              onClick={() => window.open('https://play.google.com/store/apps/details?id=co.lazarus.qzrty&pcampaignid=web_share', '_blank')}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-dark text-white p-5 rounded-3xl flex items-center gap-5 cursor-pointer shadow-2xl transition-all border border-white/5 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-brand-yellow group-hover:text-brand-dark transition-colors">▶️</div>
              <div className="text-left relative z-10">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 leading-none mb-1">Get it on</p>
                <p className="text-xl md:text-2xl font-black leading-none">Play Store</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative group perspective-1000">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-red/5 rounded-full blur-3xl group-hover:scale-110 transition duration-1000"></div>
          
          <motion.div 
            initial={{ rotateY: 20, rotateX: 10 }}
            whileInView={{ rotateY: 5, rotateX: 0 }}
            whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
            className="relative z-10 w-full max-w-[320px] mx-auto bg-gray-900 p-4 rounded-[50px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-4 border-gray-800 transition duration-700"
          >
            <div className="relative bg-white rounded-[40px] overflow-hidden aspect-[9/19] border-2 border-black/5">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white p-8 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-2 bg-gray-100 rounded-full mb-8"></div>
                <h4 className="text-brand-red text-4xl font-black tracking-tighter mb-4 leading-none">BK Science</h4>
                <p className="text-brand-dark font-black text-lg mb-10 leading-snug">Your One-Stop Destination for Learning.</p>
                <div className="w-full aspect-square bg-white rounded-full p-4 shadow-2xl mb-10 transform group-hover:scale-110 transition duration-1000 relative">
                  <div className="absolute inset-0 bg-brand-red/5 animate-pulse rounded-full"></div>
                  <SafeImage src="/assets/hero.png" alt="App Preview" className="w-full h-full object-cover rounded-full relative z-10" fallbackText="App Preview" />
                </div>
                <div 
                  onClick={() => window.open('https://play.google.com/store/apps/details?id=co.lazarus.qzrty&pcampaignid=web_share', '_blank')}
                  className="bg-brand-dark text-white py-4 px-8 rounded-full flex items-center justify-center gap-3 cursor-pointer hover:bg-brand-red transition-all shadow-xl w-full group/inner"
                >
                  <span className="text-xl">▶️</span>
                  <span className="text-[10px] font-black uppercase tracking-widest group-hover/inner:translate-x-1 transition-transform">Get it on Play Store</span>
                </div>
              </div>
            </div>
            
            {/* Camera Hole Mockup */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-full z-20 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-2"></div>
              <div className="w-8 h-1 bg-gray-800 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
