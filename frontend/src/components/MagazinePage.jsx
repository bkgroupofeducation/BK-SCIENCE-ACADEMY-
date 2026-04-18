import React, { useEffect, useState } from 'react';

const MagazinePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const issues = [
    {
      month: "April 2025",
      title: "The Quantum Leap",
      tag: "Latest Issue",
      description: "Exploring the future of competitive exams and deep dives into Advanced Physics concepts.",
      coverColor: "bg-brand-red"
    },
    {
      month: "March 2025",
      title: "Bio-Gen Nexus",
      tag: "Popular",
      description: "Special edition focusing on NEET biology hacks and organic chemistry shortcuts.",
      coverColor: "bg-brand-dark"
    },
    {
      month: "February 2025",
      title: "The Math Matrix",
      tag: "Archive",
      description: "Mastering calculus and algebraic structures with Ranker's perspectives.",
      coverColor: "bg-blue-900"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="flex flex-col items-center">
             <span className="text-brand-red font-black uppercase tracking-[0.3em] text-xs mb-4">Official Publication</span>
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-dark uppercase tracking-tighter leading-none mb-8">
               Science <span className="text-red-600">Plus</span>
             </h1>
             <div className="h-2 w-32 bg-brand-dark rounded-full mb-8"></div>
             <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-bold leading-relaxed">
               Your monthly dose of academic excellence, ranker insights, and cutting-edge science updates.
             </p>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-brand-dark overflow-hidden relative">
         <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20rem] font-black text-white/5 whitespace-nowrap pointer-events-none select-none -skew-x-12 px-20 uppercase">
           BK MAGAZINE 2025
         </div>
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
               <div className="lg:w-1/2">
                  <div className="relative group">
                     {/* Magazine Cover Mockup */}
                     <div className="w-[300px] md:w-[400px] h-[400px] md:h-[550px] bg-brand-red rounded-r-[2rem] shadow-2xl relative overflow-hidden transition-transform duration-700 group-hover:rotate-2">
                        <div className="absolute inset-y-0 left-0 w-8 bg-black/20"></div>
                        <div className="p-12 h-full flex flex-col justify-between">
                           <div>
                              <div className="text-white/40 font-black text-sm tracking-widest uppercase mb-4">Issue 24 | April 2025</div>
                              <h3 className="text-white text-5xl font-black leading-none uppercase tracking-tighter">Science<br/>Plus</h3>
                           </div>
                           <div>
                              <div className="text-white font-black text-2xl mb-2">The Quantum Leap</div>
                              <p className="text-white/60 text-sm font-bold">Unlocking the secrets of sub-atomic physics for JEE Advanced.</p>
                           </div>
                        </div>
                        {/* Interactive Shine */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                     </div>
                     {/* Decorative Elements */}
                     <div className="absolute -z-10 top-10 right-10 w-full h-full border-2 border-brand-red/30 rounded-r-[2rem] transform translate-x-4 translate-y-4"></div>
                  </div>
               </div>
               
               <div className="lg:w-1/2">
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                    Discover the <br/><span className="text-brand-yellow">Digital Edition</span>
                  </h2>
                  <p className="text-gray-400 font-bold leading-relaxed mb-10 text-lg">
                    Dive into our latest issue featuring exclusive interviews with last year's JEE/NEET toppers, chapter-wise analysis by our head HODs, and mental fitness strategies for the final month.
                  </p>
                  <div className="space-y-6">
                     <button className="w-full md:w-auto bg-brand-red text-white font-black py-4 px-12 rounded-2xl hover:bg-brand-yellow hover:text-brand-dark transition-all duration-500 shadow-xl shadow-brand-red/20 uppercase tracking-widest text-sm flex items-center justify-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/></svg>
                        Download PDF
                     </button>
                     <p className="text-white/20 text-xs font-black uppercase tracking-widest">Available for Registered Students Only</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Archives */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[2px] w-12 bg-brand-red"></div>
            <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tight">Recent Archives</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {issues.map((issue, i) => (
              <div 
                key={i} 
                className={`group cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`aspect-[3/4] ${issue.coverColor} rounded-2xl mb-6 relative overflow-hidden transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1 shadow-lg`}>
                   <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                     {issue.tag}
                   </div>
                   <div className="p-8 h-full flex flex-col justify-end">
                      <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{issue.month}</div>
                      <h4 className="text-white text-2xl font-black uppercase leading-tight">{issue.title}</h4>
                   </div>
                </div>
                <p className="text-gray-500 font-bold text-sm leading-relaxed px-2">
                  {issue.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription */}
      <section className="py-20 bg-brand-gray border-t border-gray-100">
         <div className="container mx-auto px-6 text-center">
            <div className="max-w-xl mx-auto">
               <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tight mb-4">Never Miss an Issue</h2>
               <p className="text-gray-500 font-bold text-sm mb-8">Get notified directly on your WhatsApp when a new edition drops.</p>
               <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    placeholder="Mobile Number" 
                    className="flex-1 bg-white border-2 border-transparent focus:border-brand-red px-6 py-4 rounded-2xl outline-none font-bold text-brand-dark transition-all shadow-sm"
                  />
                  <button className="bg-brand-dark text-white font-black py-4 px-8 rounded-2xl hover:bg-brand-red transition-all duration-500 uppercase tracking-widest text-xs">
                    Notify Me
                  </button>
               </div>
            </div>
         </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}} />
    </div>
  );
};

export default MagazinePage;
