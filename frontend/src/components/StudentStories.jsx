import React from 'react';
import SafeImage from './SafeImage';

const StudentStories = () => {
  const stories = [
    { name: 'Arnav Nigam', quote: 'The disciplined study environment, regular mock tests, and mentor support at BK Science Academy made preparation effective. Today, I\'m studying at IIT MUMBAI.', rank: 'JEE 2025 (AIR 11)', img: '/assets/ranker1.png', color: 'bg-orange-100/40' },
    { name: 'Prafful Solanki', quote: 'The best thing about BK Science Academy was how approachable the faculty was. I could walk into their cabins anytime with even the smallest doubts.', rank: 'NEET 2024 (AIR 71)', img: '/assets/ranker2.png', color: 'bg-blue-100/40' }
  ];

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-red-400/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="container mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-red uppercase tracking-tighter mb-3">
            Our Student Stories That <span className="text-brand-dark">Inspire You!</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center bg-white p-7 md:p-10 rounded-[32px] md:rounded-[40px] shadow-xl border border-gray-50 relative group">
          <div className="relative group/image flex-shrink-0">
            <div className={`w-56 md:w-64 aspect-square ${stories[0].color} rounded-[28px] md:rounded-[30px] overflow-hidden border-4 border-white shadow-lg relative z-10 grayscale group-hover:grayscale-0 transition duration-700`}>
              <SafeImage src={stories[0].img} alt={stories[0].name} className="w-full h-full object-cover object-top transition transform group-hover:scale-110 duration-700" fallbackText="Student" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left relative z-10 px-2 md:px-4">
            <span className="text-6xl md:text-7xl font-black text-brand-red/10 absolute -top-8 -left-2 md:-left-4 font-serif leading-none">&ldquo;</span>
            <p className="text-base md:text-lg font-black text-brand-dark mb-6 leading-relaxed">{stories[0].quote}</p>
            <h3 className="text-lg md:text-xl font-black text-brand-red uppercase tracking-widest">{stories[0].name}</h3>
            <p className="text-sm font-bold text-gray-400 tracking-widest uppercase mt-1">{stories[0].rank}</p>
          </div>
          <div className="absolute -bottom-4 md:-bottom-6 right-6 md:right-10 w-14 h-14 md:w-16 md:h-16 bg-indigo-900 rounded-full shadow-lg flex items-center justify-center text-white font-black text-2xl group-hover:scale-110 transition cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentStories;
