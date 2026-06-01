import React from 'react';

const StatsSection = () => {
  const stats = [
    { title: '5K+', desc: '11TH STUDENTS', icon: '🌱', color: 'from-blue-50 to-indigo-50 border-indigo-100 text-indigo-900' },
    { title: '100%', desc: 'BOARD COVERAGE', icon: '📄', color: 'from-red-50 to-orange-50 border-red-100 text-brand-red' },
    { title: '40+', desc: 'IIT MENTORS', icon: '👨‍🎓', color: 'from-orange-50 to-amber-50 border-orange-100 text-orange-600' },
    { title: '10+', desc: 'CENTERS', icon: '📍', color: 'from-yellow-50 to-amber-50 border-yellow-100 text-brand-yellow' }
  ];

  return (
    <section className="pt-6 pb-2 md:pt-10 md:pb-4 bg-brand-dark relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(192,0,0,0.1)_0,transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-6 md:mb-8">
          <div className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md text-brand-yellow text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] rounded-full mb-4 border border-white/10">
            Our Impact
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-[1] mb-4 uppercase">
            Excellence Since <span className="text-brand-red">2007</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-brand-red via-brand-yellow to-brand-red rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="group relative p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-xl transform transition-all duration-700 hover:-translate-y-2 hover:bg-white/10 overflow-hidden flex flex-col items-center text-center shadow-xl"
            >
              {/* Internal Glow */}
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-brand-red/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-brand-red to-orange-600 shadow-xl flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition duration-700 relative z-10">
                {stat.icon}
              </div>
              
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-2 tracking-tighter leading-none relative z-10">{stat.title}</h3>
              <p className="font-black text-brand-yellow uppercase tracking-[0.2em] text-[9px] md:text-xs max-w-full leading-tight opacity-80 relative z-10">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
