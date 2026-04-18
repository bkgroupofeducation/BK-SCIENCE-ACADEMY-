import React from 'react';
import SafeImage from './SafeImage';

const WhyBKScience = ({ navigateTo }) => {
  const highlights = [
    {
      title: "Expert Mentorship",
      description: "Learn from the best minds in the industry. Our faculty members are renowned experts with a proven track record of producing top rankers in JEE and NEET.",
      icon: "🎓"
    },
    {
      title: "Comprehensive Study Material",
      description: "Meticulously researched and curated study materials designed to simplify complex concepts and enhance problem-solving skills.",
      icon: "📚"
    },
    {
      title: "Personalized Attention",
      description: "Every student is unique. We provide personalized mentoring and doubt-clearing sessions to ensure no student is left behind.",
      icon: "👤"
    },
    {
      title: "State-of-the-art Infrastructure",
      description: "Modern classrooms equipped with digital tools and a disciplined campus environment conducive to high-level academic focus.",
      icon: "🏢"
    },
    {
      title: "Regular Assessment",
      description: "Continuous evaluation through rigorous testing and detailed performance analysis to help students identify and improve their weak areas.",
      icon: "📊"
    },
    {
      title: "Holistic Growth",
      description: "We don't just teach for exams; we build character, confidence, and critical thinking skills essential for lifelong success.",
      icon: "🌱"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 bg-brand-dark overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full animate-grid-move bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red opacity-20 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-yellow opacity-10 blur-[100px] rounded-full"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight animate-fade-up">
              Why <span className="text-brand-red">BK Science</span>?
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed animate-fade-up stagger-1">
              For over a decade, we have been the benchmark for excellence in medical and engineering entrance preparation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-brand-gray relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <div className="mb-4 inline-block px-4 py-1.5 bg-brand-red/10 border border-brand-red/20 rounded-full">
                <span className="text-brand-red font-black text-xs uppercase tracking-[0.2em]">Our Legacy</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-8 leading-tight">
                Empowering Dreams, <br />
                <span className="text-brand-red underline decoration-brand-red/20 decoration-8 underline-offset-4">Delivering Results.</span>
              </h2>
              <div className="space-y-6 text-gray-600 font-medium leading-relaxed text-lg">
                <p>
                  At BK Science Academy, we believe that every student has the potential to excel. Our mission is to provide the perfect platform where that potential meets opportunity.
                </p>
                <p>
                  Founded with a vision to revolutionize coaching in India, we have consistently stayed ahead of the curve by evolving our teaching methodologies and integrating technology with traditional wisdom.
                </p>
              </div>
            </div>
            
            <div className="relative animate-fade-up stagger-2">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700 bg-brand-dark">
                <SafeImage 
                  src="/assets/Classroom.jpg" 
                  className="w-full h-full object-cover opacity-80" 
                  fallbackText="BK Science Academy Classroom" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-yellow rounded-3xl -z-10 shadow-xl"></div>
              <div className="absolute -top-8 -left-8 w-32 h-32 border-4 border-brand-red rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Are Different - Stats */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="bg-brand-gray rounded-[2.5rem] p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
              </svg>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 text-center">
              {[
                { label: "Selections", value: "5000+", sub: "In Top Colleges" },
                { label: "Experience", value: "15+", sub: "Years of Excellence" },
                { label: "Centers", value: "10+", sub: "Across the Region" },
                { label: "Trust", value: "1 Lakh+", sub: "Students Mentored" }
              ].map((stat, idx) => (
                <div key={idx} className="animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="text-3xl md:text-5xl font-black text-brand-red mb-2">{stat.value}</div>
                  <div className="text-sm font-black text-brand-dark uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500 font-bold">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Factors Grid */}
      <section className="py-24">

        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-4 uppercase">The BK Advantage</h2>
            <div className="w-24 h-2 bg-brand-red mx-auto mb-6"></div>
            <p className="text-gray-500 max-w-2xl mx-auto font-bold uppercase tracking-widest text-sm">What sets us apart from the rest</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {highlights.map((item, index) => (
              <div 
                key={index} 
                className={`group p-10 bg-white rounded-3xl border-2 border-brand-gray hover:border-brand-red/10 hover:shadow-[0_20px_60px_-15px_rgba(192,0,0,0.1)] transition-all duration-500 animate-fade-up stagger-${(index % 3) + 1}`}
              >
                <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500 inline-block">{item.icon}</div>
                <h3 className="text-xl font-black text-brand-dark mb-4 uppercase tracking-tight group-hover:text-brand-red transition-colors">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed group-hover:text-gray-700 transition-colors">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Quote */}
      <section className="py-24 bg-brand-red text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 text-[15rem] leading-none font-black opacity-5 select-none -translate-y-1/2 translate-x-1/2">"</div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-4xl font-bold italic mb-12 animate-fade-up">
              "BK Science Academy doesn't just prepare you for JEE or NEET; it prepares you for life by instilling a discipline and passion for excellence that stays with you forever."
            </p>
            <div className="flex items-center justify-center gap-4 animate-fade-up stagger-1">
              <div className="w-16 h-1 w-brand-yellow"></div>
              <span className="font-black uppercase tracking-[0.3em] text-brand-yellow">Leading The Future Of Education</span>
              <div className="w-16 h-1 w-brand-yellow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-brand-dark rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden animate-fade-up">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red opacity-10 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow opacity-10 blur-[80px] rounded-full"></div>
            
            <h2 className="text-3xl md:text-6xl font-black text-white mb-8 uppercase leading-tight">
              Ready to Start Your <br />
              <span className="text-brand-red">Success Story?</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
              Join the league of top rankers and secure your future with India's most trusted coaching academy.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => navigateTo('registration')}
                className="w-full md:w-auto px-10 py-5 bg-brand-red text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:text-brand-dark transition-all duration-500 shadow-xl hover:shadow-brand-red/20 active:scale-95 cursor-pointer"
              >
                Enroll Now
              </button>
              <button 
                onClick={() => navigateTo('centers')}
                className="w-full md:w-auto px-10 py-5 bg-white/10 text-white font-black uppercase tracking-widest rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                Find A Center
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyBKScience;
