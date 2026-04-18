import React from 'react';

const StatsSection = () => {
  const stats = [
    { title: '19+ Years', desc: 'OF EDUCATIONAL LEGACY', icon: '🏛️', color: 'from-blue-50 to-indigo-50 border-indigo-100 text-indigo-900' },
    { title: '10 Lakh+', desc: 'TRUSTED STUDENTS', icon: '🎓', color: 'from-red-50 to-orange-50 border-red-100 text-brand-red' },
    { title: 'Nashik', desc: 'PRIME ACADEMIC CENTER', icon: '📍', color: 'from-orange-50 to-amber-50 border-orange-100 text-orange-600' },
    { title: '10 Lakh+', desc: 'SELECTIONS DELIVERED', icon: '🏆', color: 'from-yellow-50 to-amber-50 border-yellow-100 text-brand-yellow' }
  ];

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-red/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-brand-yellow/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-5 md:px-10 relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-block px-4 py-1.5 bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">Our Impact</div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-brand-dark tracking-tighter leading-tight drop-shadow-sm">
            Delivering Academic
            <span className="block italic text-brand-red font-black">Excellence Since 2007</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`group relative p-10 rounded-[2.5rem] border bg-gradient-to-br transform transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-black/5 overflow-hidden flex flex-col items-center text-center ${stat.color}`}
            >
              {/* Massive background number for depth */}
              <div className="absolute -bottom-6 -right-4 text-9xl font-black opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-700 group-hover:scale-110 pointer-events-none">
                {i + 1}
              </div>
              
              <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-black/5 flex items-center justify-center text-4xl mb-8 transform group-hover:rotate-12 group-hover:scale-110 transition duration-700">
                {stat.icon}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">{stat.title}</h3>
              <p className="font-black opacity-60 uppercase tracking-[0.2em] text-[10px] md:text-xs max-w-[150px] leading-relaxed">
                {stat.desc}
              </p>
              
              {/* Bottom decorative bar */}
              <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-current transition-all duration-700 group-hover:w-full opacity-20"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
