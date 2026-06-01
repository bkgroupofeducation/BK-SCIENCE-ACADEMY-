import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, Sparkles } from 'lucide-react';

const IMAGES = [
  '/assets/stud.jpeg',
  '/assets/succesfull/bk.png',
  '/assets/succesfull/bk1.png',
  '/assets/succesfull/Add_the_student_names_from_202606011459.jpeg',
  '/assets/succesfull/Change_the_background_to_solid_202606011459.jpeg',
  '/assets/succesfull/Take_that_name_in_the_202606011459.jpeg'
];

const SuccessCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(nextSlide, 4000);
    }
    return () => clearInterval(timerRef.current);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 rounded-full mb-4"
          >
            <Award size={16} className="text-brand-red" />
            <span className="text-brand-red font-black text-xs uppercase tracking-widest">Our Top Achievers</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter mb-3 leading-none">
            Wall of <span className="text-brand-red">Success</span>
          </h2>
          <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-sm">Real Results. Real Dreams. Real Success.</p>
        </div>

        <div className="max-w-2xl md:max-w-4xl mx-auto relative group">
          <div 
            className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border-4 border-white"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <img 
                  src={IMAGES[currentIndex]} 
                  alt={`Success Story ${currentIndex + 1}`}
                  className="w-full h-full object-contain bg-brand-dark p-1"
                  style={{ objectPosition: '55% center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* BK Science Academy Tagline */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md">
                  <Sparkles size={12} className="text-brand-red" />
                  <span className="text-brand-red font-black text-[10px] uppercase tracking-wider">BK Science Academy</span>
                </div>



              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
              <button 
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-brand-dark shadow-md pointer-events-auto hover:bg-brand-red hover:text-white transition-all transform hover:scale-110 active:scale-95"
              >
                <ChevronLeft size={20} strokeWidth={3} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-brand-dark shadow-md pointer-events-auto hover:bg-brand-red hover:text-white transition-all transform hover:scale-110 active:scale-95"
              >
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 transition-all duration-500 rounded-full ${
                  currentIndex === i ? 'w-12 bg-brand-red' : 'w-3 bg-gray-200 hover:bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCarousel;
