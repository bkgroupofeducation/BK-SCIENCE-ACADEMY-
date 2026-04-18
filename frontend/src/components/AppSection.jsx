import React from 'react';
import SafeImage from './SafeImage';

const AppSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden relative">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-400/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-[120px]"></div>
      <div className="container mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
        <div className="text-center md:text-left">
          <div className="inline-block px-6 md:px-8 py-2.5 md:py-3 bg-brand-red text-white text-xl md:text-2xl lg:text-3xl font-black rounded-lg md:rounded-xl mb-8 md:mb-10 shadow-xl shadow-brand-red/20 uppercase tracking-tighter">
            BK SCIENCE ACADEMY App
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-indigo-900 mb-5 md:mb-6 leading-none">
            Best Exam Prep
            <span className="text-brand-red block">App For</span>
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-brand-dark mb-6 md:mb-8 uppercase tracking-tighter opacity-80">
            JEE | NEET | Foundation | Olympiad
          </h3>
          <p className="text-base md:text-lg text-gray-500 font-medium mb-8 md:mb-10 max-w-lg mx-auto md:mx-0">
            Download the BK Science Academy App & enhance your exam preparation anytime, anywhere! Get access to live and recorded lectures on your fingertips.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <div className="bg-brand-dark text-white p-3.5 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 cursor-pointer hover:bg-black transition shadow-2xl">
              <span className="text-2xl md:text-3xl text-brand-yellow">▶️</span>
              <div className="text-left font-black">
                <p className="text-xs uppercase font-bold tracking-widest text-gray-400">Get it on</p>
                <p className="text-lg md:text-xl leading-none">Google Play</p>
              </div>
            </div>
            <div className="bg-brand-dark text-white p-3.5 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 cursor-pointer hover:bg-black transition shadow-2xl">
              <span className="text-2xl md:text-3xl text-brand-yellow">🍎</span>
              <div className="text-left font-black">
                <p className="text-xs uppercase font-bold tracking-widest text-gray-400">Download on the</p>
                <p className="text-lg md:text-xl leading-none">App Store</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-900/5 rounded-full blur-3xl group-hover:scale-110 transition duration-1000"></div>
          <div className="relative z-10 w-full max-w-[340px] md:max-w-[400px] mx-auto bg-gray-900 p-3.5 md:p-4 rounded-[50px] md:rounded-[60px] shadow-2xl border-6 md:border-8 border-gray-800 transform rotate-3 group-hover:rotate-0 transition duration-700">
            <div className="relative bg-white rounded-[40px] md:rounded-[45px] overflow-hidden aspect-[9/19]">
              <div className="absolute inset-0 bg-brand-gray p-6 md:p-8 flex flex-col items-center justify-center text-center">
                <h4 className="text-brand-red text-3xl md:text-4xl font-black tracking-tighter mb-3 md:mb-4">BK Science</h4>
                <p className="text-brand-dark font-black text-base md:text-lg mb-6 md:mb-8">Your One-Stop Destination for Learning and Innovation.</p>
                <div className="w-full aspect-square bg-white rounded-full p-3 md:p-4 shadow-xl mb-6 md:mb-8 transform group-hover:scale-110 transition duration-700">
                  <SafeImage src="/assets/hero.png" alt="App Preview" className="w-full h-full object-cover rounded-full" fallbackText="App Preview" />
                </div>
                <div className="h-10 md:h-12 w-full bg-indigo-900 rounded-full shadow-indigo-900/40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
