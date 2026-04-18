import React, { useState, useEffect, useRef } from 'react';

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

const CountdownTimer = ({ targetDate }) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = new Date(targetDate).getTime() - now.getTime();
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-2">
      {[
        { value: countdown.days, label: 'Days' },
        { value: countdown.hours, label: 'Hours' },
        { value: countdown.minutes, label: 'Mins' },
        { value: countdown.seconds, label: 'Secs' }
      ].map((item, i) => (
        <div key={i} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-3 py-2 min-w-[55px] text-center">
          <div className="text-xl font-black text-white">{String(item.value).padStart(2, '0')}</div>
          <div className="text-[8px] text-white/50 uppercase tracking-wider">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

const CounterStat = ({ value, label, icon, delay }) => {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={`relative group bg-white/80 backdrop-blur-md border border-white/40 p-6 md:p-8 rounded-[2rem] shadow-2xl shadow-gray-200/40 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-red rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-brand-red/30 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark mb-1 tabular-nums tracking-tighter">
        {value}
      </div>
      <div className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.25em]">{label}</div>
    </div>
  );
};

const CoursePage = ({ config, navigateTo }) => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeBatch, setActiveBatch] = useState(0);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-brand-red selection:text-white pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-dark py-20 lg:py-0">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(192,0,0,0.1)_0%,_transparent_70%)]"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute -bottom-24 -right-24 w-[30rem] h-[30rem] bg-brand-yellow/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          
          {/* Custom Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ 
            backgroundImage: `linear-gradient(to right, #444 1px, transparent 1px), linear-gradient(to bottom, #444 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-5 md:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 mb-8">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-red"></span>
                </span>
                <span className="text-white/70 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">{config.shortName} ACADEMY • NASHIK</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                {config.heroTitle}
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-orange-400">
                  {config.heroHighlight}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed mb-8 font-medium">
                {config.heroDesc}
              </p>

              {/* Countdown Timer */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Exam Countdown</span>
                </div>
                <CountdownTimer targetDate="2026-05-15" />
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <button 
                  onClick={() => navigateTo('registration')}
                  className="group relative px-10 py-5 bg-brand-red text-white font-black rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-brand-red/40"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span className="relative z-10 text-sm uppercase tracking-widest">Enroll Now</span>
                </button>
                
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-brand-dark bg-gray-800 flex items-center justify-center text-xs font-bold text-white overflow-hidden shadow-xl">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="Student" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-brand-dark bg-brand-yellow flex items-center justify-center text-[10px] font-black text-brand-dark shadow-xl">
                    15K+
                  </div>
                </div>
              </div>
            </div>

            <div className={`relative hidden lg:block transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-[3rem] p-10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                <div className="space-y-8">
                  {config.heroPills.map((pill, i) => (
                    <div key={i} className="flex items-start gap-5 group">
                      <div className="w-10 h-10 rounded-xl bg-brand-red/20 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div>
                        <div className="text-white font-black text-lg uppercase tracking-tight mb-1">{pill}</div>
                        <div className="text-gray-500 text-sm font-medium">Professional guidance for excellence</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative Circle */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-white/10 rounded-full animate-spin-slow"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-brand-yellow/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3">
          <div className="text-[10px] font-black text-white/30 uppercase tracking-[.5em]">Explore</div>
          <div className="w-[2px] h-12 bg-gradient-to-b from-brand-red to-transparent rounded-full animate-bounce-slow"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative bg-gray-50/50">
        <div className="container mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {config.stats.map((s, i) => (
              <CounterStat key={i} value={s.value} label={s.label} icon={s.icon} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Batches Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-5 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-xl">
                <div className="inline-block px-4 py-1.5 bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">Course Streams</div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark leading-[0.95] tracking-tighter">
                  Choose Your <span className="text-brand-red">Batch</span>
                </h2>
                <p className="text-gray-500 mt-6 text-lg">Select the program that matches your current academic level and goals.</p>
              </div>
              
              <div className="flex gap-2 p-1.5 bg-gray-100 rounded-[1.5rem] self-start md:self-auto scrollbar-hide overflow-x-auto">
                {config.batches.map((batch, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveBatch(i)}
                    className={`px-6 py-3 rounded-2xl text-xs md:text-sm font-black transition-all duration-500 uppercase tracking-widest whitespace-nowrap
                      ${activeBatch === i ? 'bg-white text-brand-dark shadow-xl shadow-black/5' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {batch.name.split(' ')[1] || batch.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-12 transition-all duration-700 animate-slide-up">
              <BatchCard batch={config.batches[activeBatch]} gradient={config.gradient} navigateTo={navigateTo} />
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-24 md:py-32 bg-brand-dark relative overflow-hidden rounded-[3rem] mx-4 md:mx-8">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="container mx-auto px-5 md:px-10 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <div className="inline-block px-4 py-1.5 bg-white/5 text-brand-yellow text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6 border border-white/10">Academic Scope</div>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tighter mb-8">
                  Comprehensive <br />
                  <span className="text-brand-red">Syllabus</span> Map
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">Our curriculum is meticulously designed to cover both foundational concepts and advanced problem-solving techniques.</p>
                
                <div className="mt-12 space-y-6">
                  {config.syllabus.map((s, i) => (
                    <div key={i} className="flex items-center gap-4 text-white/50">
                      <div className="w-8 h-[1px] bg-brand-red"></div>
                      <span className="text-xs font-black uppercase tracking-widest">{s.name} Mastery</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1"></div>
            
            <div className="lg:col-span-6 space-y-6">
              {config.syllabus.map((subject, i) => (
                <div key={i} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:bg-white/10 hover:border-white/20">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-3xl bg-brand-red/20 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                        {subject.icon}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{subject.name}</h3>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest border border-white/5">
                      Core Subject
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {subject.topics.map((topic, j) => (
                      <span key={j} className="text-[11px] md:text-xs font-bold px-4 py-2 rounded-xl bg-white/5 text-gray-300 border border-white/5 transition-colors hover:bg-brand-red hover:text-white hover:border-brand-red">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-5 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter leading-[0.95] mb-6">
              The BK Science <span className="text-brand-red">Advantage</span>
            </h2>
            <p className="text-gray-500 text-lg">Why thousands of students trust us for their competitive exam journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {config.whyReasons.map((item, i) => (
              <div key={i} className="group relative bg-gray-50 rounded-[2.5rem] p-10 transition-all duration-500 hover:bg-brand-dark hover:-translate-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-brand-red mb-8 shadow-xl shadow-black/5 group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-brand-dark mb-4 tracking-tight group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">{item.desc}</p>
                
                {/* Decorative Arrow */}
                <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg className="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 rounded-t-[3rem]">
        <div className="container mx-auto px-5 md:px-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tighter mb-16 text-center">
              Curious About <span className="text-brand-red">Everything?</span>
            </h2>
            <div className="space-y-4">
              {config.faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 md:py-40 bg-brand-dark overflow-hidden rounded-b-[3rem] mx-4 md:mx-8 mb-8 shadow-2xl">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-brand-red/20 rounded-full blur-[180px]"></div>
        </div>
        
        <div className="container mx-auto px-5 md:px-10 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10">
              Your Future <br />
              <span className="text-brand-yellow">Starts Now.</span>
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl mb-16 leading-relaxed max-w-2xl mx-auto">
              Join the ranks of achievers at BK Science Academy. Admissions are now open for the {config.shortName} programs.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => navigateTo('registration')}
                className="w-full sm:w-auto px-12 py-6 bg-brand-red text-white font-black rounded-3xl text-sm uppercase tracking-[0.2em] shadow-2xl shadow-brand-red/30 hover:scale-105 active:scale-95 transition-all duration-500"
              >
                Secure Your Spot
              </button>
              <a 
                href="tel:+918888301363" 
                className="w-full sm:w-auto px-12 py-6 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-black rounded-3xl text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-500"
              >
                Get Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}} />
    </div>
  );
};

const BatchCard = ({ batch, gradient, navigateTo }) => {
  const [ref, isVisible] = useInView();

  return (
    <div ref={ref} className={`group relative bg-white border border-gray-100 rounded-[3.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <div className="grid lg:grid-cols-12">
        <div className={`lg:col-span-5 p-10 md:p-12 lg:p-16 bg-gradient-to-br ${gradient} text-white relative overflow-hidden`}>
          {/* Background Decorative Emojis */}
          <div className="absolute top-0 right-0 p-8 opacity-20 text-9xl select-none pointer-events-none transform translate-x-12 -translate-y-12">
            🚀
          </div>
          
          <div className="relative z-10">
            <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-8">
              {batch.target}
            </div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter mb-8">
              {batch.name}
            </h3>
            
            <div className="space-y-4">
              {batch.features.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-sm font-bold text-white/90 underline decoration-white/20 underline-offset-4">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-7 p-10 md:p-12 lg:p-16 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Duration</div>
              <div className="text-2xl font-black text-brand-dark">{batch.duration}</div>
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Starts On</div>
              <div className="text-2xl font-black text-brand-dark">{batch.startDate}</div>
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Program Fee</div>
              <div className="text-2xl font-black text-brand-dark">{batch.fees}</div>
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Intensity</div>
              <div className="text-2xl font-black text-brand-dark">{batch.classes}</div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="h-px bg-gray-100"></div>
            <div className="flex flex-wrap gap-2">
              {batch.features.map((f, i) => (
                <span key={i} className="text-[10px] font-black px-4 py-2 rounded-xl bg-gray-50 text-gray-500 border border-gray-100">
                  {f}
                </span>
              ))}
            </div>
            <button 
              onClick={() => navigateTo('registration')}
              className="w-full bg-brand-dark text-white py-6 rounded-3xl font-black text-sm uppercase tracking-[0.25em] shadow-xl shadow-black/10 hover:bg-brand-red transition-all duration-500"
            >
              Confirm Enrollment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`overflow-hidden rounded-[2rem] border transition-all duration-500 ${isOpen ? 'bg-white border-brand-red shadow-2xl shadow-brand-red/10' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-8 text-left group"
      >
        <span className="text-lg md:text-xl font-black text-brand-dark tracking-tight transition-colors group-hover:text-brand-red">{faq.q}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-brand-red text-white rotate-180' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </button>
      <div className={`transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-8 pb-8 pt-0">
          <p className="text-gray-500 text-lg leading-relaxed font-medium">{faq.a}</p>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
