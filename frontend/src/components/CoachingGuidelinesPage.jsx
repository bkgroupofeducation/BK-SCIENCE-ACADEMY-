import React, { useEffect, useState } from 'react';

const CoachingGuidelinesPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const guidelines = [
    {
      title: "Academic Integrity",
      icon: "📚",
      content: "We uphold the highest standards of academic honesty. Students are expected to maintain original work and utilize official academy resources for all assessments."
    },
    {
      title: "Digital Discipline",
      icon: "💻",
      content: "Our online platforms are dedicated spaces for learning. Professionalism and respectful interaction are mandatory in all live sessions and discussion forums."
    },
    {
      title: "Attendance & Punctuality",
      icon: "⏰",
      content: "Regularity is the cornerstone of success. 100% attendance is highly encouraged, and students must join sessions at least 5 minutes before the scheduled start."
    },
    {
      title: "Self-Study Protocol",
      icon: "✍️",
      content: "Classroom learning must be supplemented by at least 6 hours of daily self-study. Completion of Daily Practice Problems (DPPs) is mandatory for session access."
    },
    {
      title: "Evaluation Ethics",
      icon: "⚖️",
      content: "Tests are diagnostic tools, not just ranks. Students must approach every 'Brahmastra' and 'Vajra' test with the same intensity as the final competitive exam."
    },
    {
      title: "Mentor Connectivity",
      icon: "🤝",
      content: "Students are assigned personal mentors. Weekly check-ins are required to discuss strategy, mental well-being, and academic hurdles."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-brand-dark py-24 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 text-[15rem] font-black leading-none -skew-x-12 translate-x-1/4 select-none uppercase">
            ETHOS
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className={`inline-block h-1 w-20 bg-brand-red mb-8 transition-all duration-1000 ${isVisible ? 'w-20' : 'w-0'}`}></div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
            Coaching<br/><span className="text-brand-red">Guidelines</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-bold leading-relaxed">
            The standard of excellence we uphold at BK Science Academy to ensure every student reaches their full potential.
          </p>
        </div>
      </section>

      {/* Guidelines Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {guidelines.map((g, i) => (
              <div 
                key={i} 
                className={`group relative bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:border-brand-red/20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 inline-block">{g.icon}</div>
                <h3 className="text-xl font-black text-brand-dark mb-4 uppercase tracking-tight">{g.title}</h3>
                <p className="text-gray-500 leading-relaxed font-bold text-sm">
                  {g.content}
                </p>
                
                {/* Subtle numbering overlay */}
                <div className="absolute bottom-6 right-8 text-5xl font-black text-gray-50 group-hover:text-brand-red/5 transition-colors pointer-events-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-brand-gray border-y border-gray-100 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter leading-none mb-8">
                Consistency over <br/><span className="text-brand-red">Intensity</span>
              </h2>
              <div className="space-y-6 text-gray-600 font-bold leading-relaxed text-sm md:text-base">
                <p>
                  At BK Science Academy, we believe that academic success is not a sprint, but a marathon of discipline. Our guidelines are not just rules, but a framework designed to build the mental stamina required for India's toughest exams.
                </p>
                <p>
                  We focus on 'Atomic Habits'—small, daily commitments that compound into extraordinary results. By following these guidelines, a student transforms from an aspirant into a performer.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="relative z-10 bg-brand-dark p-12 rounded-[3rem] shadow-2xl skew-x-1">
                  <blockquote className="text-2xl font-black text-white italic leading-tight">
                    "Success is the sum of small efforts, repeated day in and day out."
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-0.5 w-12 bg-brand-red"></div>
                    <span className="text-brand-red font-black uppercase tracking-widest text-xs">BK Team Philosophy</span>
                  </div>
               </div>
               {/* Decorative blobs */}
               <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl animate-pulse"></div>
               <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto bg-brand-dark p-12 md:p-20 rounded-[4rem] relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                Ready to <span className="text-brand-yellow">Commit?</span>
              </h2>
              <p className="text-gray-400 mb-10 font-bold">
                Join our disciplined ecosystem and start your journey towards academic excellence today.
              </p>
              <button 
                onClick={() => window.location.href = '/registration'}
                className="bg-brand-red text-white font-black py-4 px-12 rounded-2xl hover:bg-red-700 transition-all duration-500 shadow-xl shadow-brand-red/30 uppercase tracking-widest text-sm hover:scale-105 active:scale-95"
              >
                Enroll Now
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

export default CoachingGuidelinesPage;
