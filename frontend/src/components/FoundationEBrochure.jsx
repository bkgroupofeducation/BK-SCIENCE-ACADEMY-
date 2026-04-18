import React, { useState, useEffect, useRef } from 'react';
import SafeImage from './SafeImage';

const useInView = (options = { threshold: 0.1 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
};

const FoundationEBrochure = ({ navigateTo }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref1, isVisible1] = useInView();
  const [ref2, isVisible2] = useInView();

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const [expandedCourse, setExpandedCourse] = useState(null);

  const courses = [
    { 
      class: 'Class 6th', 
      title: 'Early Spark', 
      desc: 'Igniting the spirit of inquiry and building basic scientific temperament.', 
      icon: '🌱',
      details: ['Scientific Method Basics', 'Visual Mathematics', 'Logic & IQ Development', 'Introduction to Physics/Chemistry']
    },
    { 
      class: 'Class 7th', 
      title: 'Conceptual Base', 
      desc: 'Strengthening fundamental concepts in Mathematics and Science.', 
      icon: '📐',
      details: ['Algebraic Foundations', 'Life Science Concepts', 'Data Interpretation', 'Critical Thinking Labs']
    },
    { 
      class: 'Class 8th', 
      title: 'Pre-Foundation', 
      desc: 'Bridging the gap between school curriculum and competitive requirements.', 
      icon: '🧪',
      details: ['Kinematics & Force', 'Biological Systems', 'Olympiad Math Hub', 'Mental Ability Training']
    },
    { 
      class: 'Class 9th', 
      title: 'Foundation Pro', 
      desc: 'In-depth coverage of JEE/NEET basics and NTSE preparation.', 
      icon: '🚀',
      details: ['Advanced Mechanics', 'Atomic Structure', 'Euclidean Geo Pro', 'NTSE Stage 1 Prep']
    },
    { 
      class: 'Class 10th', 
      title: 'Elite Track', 
      desc: 'Advanced problem solving and stream selection guidance.', 
      icon: '🏆',
      details: ['Electromagnetism', 'Chemical Reactions', 'Trigonometry Mastry', 'Career Stream Mapping']
    },
  ];

  const features = [
    { title: 'Psychometric Analysis', desc: 'Understanding student potential and interest areas early on.', icon: '🧠' },
    { title: 'Olympiad Training', desc: 'Special sessions for NSO, IMO, IEO, and NTSE exams.', icon: '🎖️' },
    { title: 'Concept Visualization', desc: 'Using digital tools to make complex science concepts easy.', icon: '💻' },
    { title: 'Parent Workshops', desc: 'Guiding parents on how to support their child\'s early journey.', icon: '👨‍👩‍👧' },
  ];

  return (
    <div className={`min-h-screen bg-[#fafafa] selection:bg-brand-red selection:text-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* --- BROCHURE COVER --- */}
      <section className="relative min-h-[80vh] flex justify-center overflow-hidden bg-brand-dark pt-32 pb-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(192,0,0,0.2)_0%,_transparent_70%)]"></div>
          <div className="absolute inset-0 animate-grid-move bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-6 py-2 bg-brand-red/10 border border-brand-red/20 rounded-full text-brand-red text-xs font-black uppercase tracking-[0.4em] mb-12 animate-fade-up">
            Official E-Brochure 2026-27
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter mb-8 uppercase animate-fade-up stagger-1">
            Foundation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-orange-500 to-brand-red underline decoration-brand-red underline-offset-[15px]">Academy</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-gray-400 font-medium max-w-3xl mx-auto mb-16 animate-fade-up stagger-2 leading-relaxed italic">
            "Because the strongest buildings are built on the deepest foundations."
          </p>
          
          <div className="inline-flex flex-col md:flex-row items-center gap-8 bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-[3rem] animate-fade-up stagger-3 shadow-2xl">
            <button 
              onClick={() => navigateTo('registration')}
              className="px-10 py-5 bg-brand-red text-white font-black rounded-[2rem] shadow-xl shadow-brand-red/20 hover:bg-brand-red/90 hover:-translate-y-1 active:scale-95 transition-all duration-500 uppercase tracking-widest text-sm"
            >
              Secure Your Seat
            </button>
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-brand-dark bg-gray-800 shadow-lg overflow-hidden ring-4 ring-white/5">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 60}`} alt="Student" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-brand-dark bg-brand-red flex items-center justify-center text-[10px] font-black text-white ring-4 ring-white/5 shadow-lg">
                  +5K
                </div>
              </div>
              <div className="text-left">
                <div className="text-white text-xs font-black uppercase tracking-tighter">Academic Excellence</div>
                <div className="text-gray-400 text-[10px] font-medium uppercase tracking-widest">Trusted by 5,000+ Students</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] group-hover:text-brand-red transition-colors">Scroll to Read</span>
          <div className="w-px h-16 bg-gradient-to-b from-brand-red to-transparent animate-bounce-slow"></div>
        </div>
      </section>

      {/* --- WHY FOUNDATION? --- */}
      <section ref={ref1} className="py-32 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className={`lg:col-span-5 relative transition-all duration-[1.5s] ${isVisible1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl skew-x-1 transform hover:skew-x-0 transition-transform duration-1000 group">
                <SafeImage src="/assets/Campus.jpg" className="w-full h-auto brightness-90 group-hover:scale-110 transition-transform duration-[2s]" fallbackText="Academy Environment" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent"></div>
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-red/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-yellow/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
              
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full h-full flex items-center justify-center transition-all duration-1000 delay-700 ${isVisible1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/50 text-center max-w-xs rotate-2 animate-float">
                  <div className="text-5xl font-black text-brand-red mb-2 italic">13+</div>
                  <div className="text-xs font-black text-brand-dark uppercase tracking-widest leading-relaxed">
                    Years of Early Mentorship Excellence
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className={`inline-block px-4 py-1.5 bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 transition-all duration-700 ${isVisible1 ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>Pedagogy Philosophy</div>
              <h2 className={`text-4xl md:text-6xl font-black text-brand-dark leading-[0.95] tracking-tighter mb-10 uppercase transition-all duration-1000 delay-200 ${isVisible1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                Bridging the <br />
                <span className="text-brand-red italic underline decoration-gray-100 underline-offset-8">Curiosity Gap.</span>
              </h2>
              <div className={`space-y-8 text-gray-500 font-medium text-lg lg:text-xl leading-relaxed transition-all duration-1000 delay-400 ${isVisible1 ? 'opacity-100' : 'opacity-0'}`}>
                <p>
                  At BK Science, our foundation program isn't just about finishing the school book early. It's about developing the <span className="text-brand-dark font-black">Analytical mindset</span> needed for JEE & NEET years before the journey begins.
                </p>
                <div className="grid sm:grid-cols-2 gap-8 pt-8">
                  {features.map((f, i) => (
                    <div 
                      key={i} 
                      className={`flex gap-5 transition-all duration-700 group hover:-translate-y-1`}
                      style={{ transitionDelay: `${600 + (i * 150)}ms`, opacity: isVisible1 ? 1 : 0, transform: isVisible1 ? 'translateY(0)' : 'translateY(20px)' }}
                    >
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl shadow-sm border border-gray-100 group-hover:bg-brand-red group-hover:text-white transition-colors duration-500">{f.icon}</div>
                      <div>
                        <h4 className="font-black text-brand-dark uppercase text-sm mb-1 tracking-tight group-hover:text-brand-red transition-colors">{f.title}</h4>
                        <p className="text-xs">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VISIONARY MODULES --- */}
      <section ref={ref2} className="pt-32 pb-16 bg-brand-dark relative overflow-hidden rounded-[3rem] mx-4 md:mx-10 shadow-3xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-brand-red rounded-full blur-[150px] animate-pulse-slow"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center mb-24 transition-all duration-1000 ${isVisible2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6 drop-shadow-lg">
              Academic <span className="text-brand-yellow">Level-Ups</span>
            </h2>
            <div className="h-1 w-24 bg-brand-red mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 items-start">
            {courses.map((c, i) => (
              <div 
                key={i} 
                onClick={() => setExpandedCourse(expandedCourse === i ? null : i)}
                className={`group bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 transition-all duration-700 hover:bg-brand-red hover:shadow-2xl hover:shadow-brand-red/30 cursor-pointer overflow-hidden ${isVisible2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-8 transform group-hover:scale-125 transition-transform duration-500">{c.icon}</div>
                <div className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.3em] mb-3 group-hover:text-white transition-colors">{c.class}</div>
                <h3 className="text-xl font-black text-white mb-6 tracking-tight group-hover:text-white uppercase leading-none">{c.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-medium group-hover:text-white/80 transition-colors">{c.desc}</p>
                
                {/* Expandable Content Area */}
                <div className={`transition-all duration-700 ease-in-out ${expandedCourse === i ? 'max-h-60 mt-8 opacity-100' : 'max-h-0 mt-0 opacity-0 overflow-hidden'}`}>
                  <div className="pt-6 border-t border-white/10 space-y-3">
                    {c.details.map((detail, di) => (
                      <div key={di} className="flex items-center gap-3 text-white">
                        <div className="w-1 h-1 bg-brand-yellow rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-wider">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex justify-center">
                  <svg 
                    className={`w-6 h-6 text-white transition-transform duration-700 ${expandedCourse === i ? 'rotate-180' : 'animate-bounce-slow'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MENTORSHIP SECTION --- */}
      <section className="pt-16 pb-12 bg-[#fafafa]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-[4rem] border border-gray-100 p-10 md:p-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-full w-1.5 bg-brand-red"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                <div className="w-56 h-72 shrink-0 rounded-[2.5rem] overflow-hidden border-8 border-gray-50 shadow-2xl relative">
                  <div className="absolute inset-0 bg-brand-dark transition-opacity duration-700 opacity-0 group-hover:opacity-10 z-10"></div>
                  <SafeImage src="/assets/Founder.jpeg" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110" fallbackText="Dr. Adv. Er. Bhagwan Nivrutti Elmame" />
                </div>
                <div className="relative">
                  <div className="absolute -top-10 -left-6 text-[10rem] font-serif text-gray-50 select-none pointer-events-none">“</div>
                  <div className="inline-block px-4 py-1.5 bg-brand-dark text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 relative z-10">Honorable Secretary Message</div>
                  <p className="text-2xl md:text-3xl font-black text-brand-dark italic mb-10 leading-relaxed relative z-10 drop-shadow-sm">
                    "Our Foundation program is designed to turn 'I can't' into 'I can, because I know how.' We spark the flame that JEE & NEET later fuel."
                  </p>
                  <div>
                    <div className="text-xl font-black text-brand-red uppercase tracking-tight">Dr. Adv. Er. Bhagwan Nivrutti Elmame</div>
                    <div className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1 border-t border-gray-100 pt-2 inline-block">Secretary of the BK Educational and Welfare Society</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="pt-12 pb-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,_rgba(192,0,0,0.1)_0%,_transparent_60%)]"></div>
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-8xl font-black text-brand-dark tracking-tighter uppercase mb-12">
            The Journey <span className="text-brand-red">Begins</span> Here.
          </h2>
          
          <div className="max-w-2xl mx-auto bg-brand-dark p-12 md:p-16 rounded-[3.5rem] shadow-3xl text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <p className="text-lg md:text-xl font-medium text-gray-400 mb-12 italic">"Your child's potential is a diamond. Our Foundation program is the cutting and polishing process."</p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => navigateTo('registration')}
                className="bg-brand-red hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-brand-red/40 transition-all active:scale-95"
              >
                Enroll for Demo
              </button>
              <a 
                href="mailto:admission@bkscience.com" 
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all active:scale-95"
              >
                Contact Admissions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER BANNER --- */}
      <div className="bg-brand-red py-8 text-center mt-12">
        <span className="text-sm md:text-xl font-black text-white uppercase tracking-[0.3em]">
           BK Science Academy • Foundation Division • Nashik Center
        </span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fade-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
        .stagger-1 { animation-delay: 0.15s; }
        .stagger-2 { animation-delay: 0.3s; }
        .stagger-3 { animation-delay: 0.45s; }
        @keyframes grid-move { from { background-position: 0 0; } to { background-position: 50px 50px; } }
        .animate-grid-move { animation: grid-move 20s linear infinite; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        @keyframes float { 0% { transform: translate(0, 0) rotate(2deg); } 50% { transform: translate(0, -15px) rotate(3deg); } 100% { transform: translate(0, 0) rotate(2deg); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}} />
    </div>
  );
};

export default FoundationEBrochure;
