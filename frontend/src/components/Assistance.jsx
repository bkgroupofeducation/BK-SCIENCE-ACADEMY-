import React from 'react';
import SafeImage from './SafeImage';

const Assistance = ({ navigateTo }) => {
  return (
    <section className="pt-8 pb-24 md:pb-32 bg-white overflow-hidden relative">
      <div className="container mx-auto px-5 md:px-8 max-w-7xl">
        <div className="relative group overflow-hidden bg-indigo-950 p-10 md:p-16 lg:p-20 rounded-[40px] md:rounded-[50px] lg:rounded-[60px] shadow-[0_50px_100px_-20px_rgba(30,27,75,0.4)] border border-white/5 flex flex-col md:flex-row items-center justify-between text-white">
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-[0.9] text-white">
              Happy to
              <span className="text-brand-red block decoration-4 decoration-white/5 underline underline-offset-[12px] md:underline-offset-[16px]">
                Assist You!
              </span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl font-medium mb-10 md:mb-12 opacity-70 leading-relaxed">
              Unlock your potential with BK Science Academy experts.
            </p>
            <button 
              onClick={() => navigateTo('centers')}
              className="bg-brand-red text-white py-4 md:py-5 px-8 md:px-12 rounded-xl md:rounded-2xl text-lg md:text-2xl font-black uppercase tracking-widest hover:scale-105 transition shadow-2xl shadow-brand-red/40"
            >
              Ask to Experts
            </button>
          </div>

          <div className="relative mt-12 md:mt-0 z-10">
            <div className="relative w-60 md:w-80 lg:w-96 aspect-square">
              <div className="absolute inset-0 border-4 border-dashed border-white/20 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-4 bg-indigo-900 rounded-full overflow-hidden border-8 border-indigo-900 shadow-2xl">
                <SafeImage src="/assets/ranker2.png" alt="Expert" className="w-full h-full object-cover grayscale transition duration-1000 group-hover:grayscale-0 group-hover:scale-110" fallbackText="Expert" />
              </div>
              <div 
                onClick={() => window.open('https://wa.me/918888301363', '_blank')}
                className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 bg-brand-yellow text-brand-dark px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-2xl font-black text-lg md:text-2xl animate-bounce-slow cursor-pointer hover:scale-105 transition-transform"
              >
                Talk Now!
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}} />
    </section>
  );
};

export default Assistance;
