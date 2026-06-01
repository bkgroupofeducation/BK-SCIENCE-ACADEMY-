import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Sparkles, Download } from 'lucide-react';

const AppPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=co.lazarus.qzrty&pcampaignid=web_share';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 12000); // 12 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const handleClick = () => {
    window.open(playStoreUrl, '_blank');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center pb-12 pointer-events-none">
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-[340px] px-4 pointer-events-auto"
            onClick={handleClick}
          >
            <div className="relative bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-gray-100 p-8 text-center overflow-hidden group cursor-pointer">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-red"></div>
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-red/5 rounded-full blur-2xl"></div>
              
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-red hover:text-white transition-all duration-300"
              >
                <X size={16} />
              </button>

              {/* Header */}
              <h3 className="text-brand-red text-3xl font-black tracking-tighter mb-2 uppercase">BK Science</h3>
              <p className="text-brand-dark font-black text-sm mb-8 leading-tight">
                Your One-Stop Destination <br /> for Learning.
              </p>

              {/* Student Image Circle */}
              <div className="relative w-36 h-36 mx-auto mb-8">
                <div className="absolute inset-0 bg-brand-red/5 animate-pulse rounded-full"></div>
                <div className="relative z-10 w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070" 
                    alt="Student" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Floating elements */}
                <div className="absolute -bottom-2 -right-2 bg-brand-yellow p-2 rounded-lg shadow-lg rotate-12">
                  <Sparkles size={16} className="text-brand-dark" />
                </div>
              </div>

              {/* Action Button */}
              <div className="bg-brand-dark text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-4 shadow-xl transition-all duration-300 group-hover:bg-brand-red group-hover:-translate-y-1 group-hover:shadow-brand-red/20">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Smartphone size={18} className="text-brand-yellow" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/50 leading-none mb-0.5">Available on</p>
                  <p className="text-xs font-black uppercase tracking-widest">Play Store</p>
                </div>
              </div>

              {/* Mini disclaimer */}
              <p className="mt-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Enhance your prep anytime!</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AppPopup;
