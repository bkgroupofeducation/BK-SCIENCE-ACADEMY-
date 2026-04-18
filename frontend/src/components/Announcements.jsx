import React from 'react';

const Announcements = ({ navigateTo }) => {
  const items = [
    { title: 'New Academic Session 2026-27', date: 'ADMISSIONS OPEN', icon: '📢', color: 'bg-red-50 text-brand-red' },
    { title: 'JEE Advanced Crash Course Starting Soon', date: 'BATCH: ENTHUSE', icon: '🚀', color: 'bg-blue-50 text-blue-600' },
    { title: 'Scholarship Test (BK Champions) Date Announced', date: '15TH APRIL 2026', icon: '📝', color: 'bg-yellow-50 text-brand-yellow' },
    { title: 'Download New NCERT Sample Papers', date: 'FREE RESOURCE', icon: '📚', color: 'bg-green-50 text-green-600' }
  ];

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden relative">
      <div className="container mx-auto px-5 md:px-8">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          <div className="lg:w-1/3 lg:sticky lg:top-32 mb-6 lg:mb-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-xs font-black mb-6 uppercase tracking-widest">
              <span className="w-2.5 h-2.5 bg-brand-red rounded-full animate-pulse"></span>
              Live Updates
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark uppercase tracking-tighter mb-4 leading-[0.9]">
              Latest
              <span className="text-brand-red block decoration-2 underline underline-offset-[8px] decoration-brand-red/20">News</span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 font-bold mb-8 leading-relaxed">
              Stay ahead with real-time updates regarding JEE, NEET, and Board Exams.
            </p>
            <div className="h-0.5 w-16 bg-brand-red hidden lg:block"></div>
          </div>

          <div className="lg:w-2/3 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => {
                    if (item.title.toLowerCase().includes('admissions') || item.date.toLowerCase().includes('admissions')) navigateTo('registration');
                    else if (item.title.toLowerCase().includes('jee')) navigateTo('jee');
                    else if (item.title.toLowerCase().includes('scholarship')) navigateTo('residential');
                  }}
                  className="group relative p-6 md:p-7 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-700 flex flex-col justify-between min-h-[200px] md:min-h-[220px] cursor-pointer"
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 transform group-hover:scale-110 transition duration-700`}>
                      {item.icon}
                    </div>
                    <div className="mt-auto">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-[0.15em] mb-2">{item.date}</p>
                      <h4 className="text-lg md:text-xl font-black text-brand-dark group-hover:text-brand-red transition-colors leading-tight">{item.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Announcements;
