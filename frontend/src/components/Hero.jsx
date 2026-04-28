import React, { useState, useEffect } from 'react';
import {
  Trophy,
  GraduationCap,
  ArrowRight,
  Zap,
  Play,
  Award,
  Users,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { API_BASE } from '../api';


const Hero = ({ navigateTo }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    targetExam: '',
    location: ''
  });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    { name: 'Aryan Sharma', college: 'IIT Bombay', quote: 'BK Science gave me the perfect strategy to crack JEE Advanced in my first attempt.', year: '2025', image: '/assets/ranker1.png' },
    { name: 'Priya Patel', college: 'AIIMS Delhi', quote: 'The mock tests and mentorship program were game-changing for my NEET prep.', year: '2025', image: '/assets/ranker2.png' },
    { name: 'Sameer Khan', college: 'NIT Surat', quote: 'Structured learning and expert guidance helped me achieve 99.99 percentile.', year: '2025', image: '/assets/ranker3.png' }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide for testimonials every 4 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [testimonials.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/api/counseling/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setFormData({ fullName: '', email: '', mobile: '', targetExam: '', location: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Server connection issue. Please try again.');
    }
  };

  return (
    <section className="relative min-h-screen bg-brand-dark overflow-hidden flex items-center pt-24 lg:pt-32">

      {/* --- REFINED BACKGROUND LAYER WITH PARALLAX --- */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute inset-0 animated-gradient"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Ambient Glows with Parallax */}
        <div 
          className="absolute parallax-bg top-0 right-0 w-[50%] h-[50%] bg-brand-red/5 rounded-full blur-[150px] transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        ></div>
        <div 
          className="absolute parallax-bg bottom-0 left-0 w-[40%] h-[40%] bg-brand-yellow/5 rounded-full blur-[150px] transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="container mx-auto px-5 md:px-8 relative z-10 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* --- LEFT SIDE: THE BRANDING --- */}
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full animate-fade-up">
              <Zap size={14} className="text-brand-red" />
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] font-outfit">Admissions Open 2026-27</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-[7rem] font-black leading-[0.85] tracking-tighter uppercase font-outfit text-white">
                Crack 
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-400">JEE & NEET</span>
                <span className="text-white/20">2026-27</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                Experience the science of high-performance coaching with <span className="text-white border-b border-brand-red/50">India's Lead Academic Mentors</span>. 
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 items-center py-2">
              {[
                { icon: Award, label: 'ISO 9001:2015 Certified' },
                { icon: GraduationCap, label: '15+ Years Experience' },
                { icon: Users, label: '50,000+ Students' }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/5">
                  <badge.icon size={16} className="text-brand-red" />
                  <span className="text-white/70 text-xs font-medium whitespace-nowrap">{badge.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-up stagger-5">
              <button 
                onClick={() => navigateTo('registration')} 
                className="group px-10 py-5 bg-brand-red text-white font-bold uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-3 text-sm pulse-glow"
              >
                Enroll Now <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={() => navigateTo('jee')}
                className="px-10 py-5 border border-white/10 text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-white/5 transition-all duration-500 backdrop-blur-md text-sm"
              >
                View Courses
              </button>
              <button 
                onClick={() => navigateTo('study-center')}
                title="Download page opens from Study Center"
                className="px-6 py-5 text-white/60 font-medium hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                <BookOpen size={16} />
                Download Syllabus
              </button>
            </div>

            {/* Targeted Visibility Overlay for Stats — Instruction 1, 3, 4, 5 */}
            <div className="stats-visibility-overlay -mx-4 px-4 py-6 rounded-2xl">
              <div className="flex gap-8">
                 {[
                   { label: 'Selections', value: '8500+', icon: Trophy },
                   { label: 'Success Rate', value: '98%', icon: TrendingUp },
                   { label: 'Expert Mentors', value: '150+', icon: Users }
                 ].map((s, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center">
                       <s.icon size={18} className="text-brand-red" />
                     </div>
                     <div className="text-shadow-soft">
                       <div className="text-xl font-black text-white">{s.value}</div>
                       <div className="text-[9px] font-bold text-white/70 uppercase tracking-widest">{s.label}</div>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: COMPACT SHOWCASE + TESTIMONIALS --- */}
          <div className="relative w-full max-w-[550px] mx-auto lg:mr-0 flex flex-col gap-6">
            
            {/* Success Showcase Ribbon */}
            <div className="relative w-full h-[480px] overflow-hidden rounded-[48px] border border-white/5 group bg-[#050508] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
              <div className="absolute inset-0 z-10" style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
              }}>
                <div className="showcase-track py-12">
                  {[...Array(2)].map((_, loopIndex) => (
                    <div key={loopIndex} className="flex flex-col gap-20">
                      {[
                        { name: 'Aryan Sharma', achievement: 'AIR 01 • IIT BOMBAY', stats: 'JEE ADVANCED TOPPER', img: '/assets/ranker1.png', tag: 'IIT JEE CORE', color: 'from-brand-red to-orange-500' },
                        { name: 'Priya Patel', achievement: 'AIR 08 • AIIMS DELHI', stats: 'NEET • 715/720', img: '/assets/ranker2.png', tag: 'NEET SUPER', color: 'from-emerald-400 to-teal-500' },
                        { name: 'Sameer Khan', achievement: 'AIR 45 • NIT SURAT', stats: '99.99 PERCENTILE', img: '/assets/ranker3.png', tag: 'JEE MAIN', color: 'from-blue-500 to-indigo-600' },
                        { name: 'Ananya Iyer', achievement: 'AIR 112 • BITS PILANI', stats: 'JEE MAIN • 295/300', img: '/assets/ranker4.png', tag: 'JEE HUB', color: 'from-purple-500 to-pink-500' },
                        { name: 'Rohan Patil', achievement: 'AIR 88 • IIT KATHMANDU', stats: 'ADVANCED • 98.4%', img: '/assets/ranker1.png', tag: 'ELITE BATCH', color: 'from-amber-400 to-red-600' },
                        { name: 'Sneha Deshmukh', achievement: 'AIR 21 • AFMC PUNE', stats: 'NEET • 705/720', img: '/assets/ranker2.png', tag: 'NEET CRACKERS', color: 'from-cyan-400 to-blue-600' }
                      ].map((student, i) => (
                        <div 
                          key={`${loopIndex}-${i}`}
                          className="student-card relative w-[90%] mx-auto h-[500px] rounded-[56px] overflow-hidden bg-[#0a0a0f] border border-white/5 transition-all duration-700 cursor-pointer group/card shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] perspective-1000"
                          style={{ perspective: '1000px' }}
                        >
                          {/* 3D Tilt Container */}
                          <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover/card:rotate-x-[2deg] group-hover/card:rotate-y-[-5deg] group-hover/card:scale-[1.02]">
                            
                            {/* Inner Precision Glow */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                            
                            {/* High-Resolution Portrait */}
                            <img 
                              src={student.img} 
                              alt={student.name} 
                              className="w-full h-full object-cover object-top transition-all duration-1000 group-hover/card:scale-110 group-hover/card:brightness-[1.12]" 
                            />
                            
                            {/* Laser Scan Animation */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-red/10 to-transparent h-[20%] w-full -translate-y-[200%] group-hover/card:animate-laser-scan z-20 pointer-events-none"></div>

                            {/* Cinematic Dark Scrim */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-black/5 z-10"></div>
                          </div>
                          
                          {/* Floating Elements with Parallax-like feel on hover */}
                          <div className="absolute top-8 right-8 z-30 w-10 h-10 bg-white flex items-center justify-center rounded-full shadow-2xl transform transition-all duration-700 group-hover/card:translate-x-[-10px] group-hover/card:rotate-[360deg] group-hover/card:scale-110">
                             <span className="text-black text-[9px] font-black">TOP</span>
                          </div>

                          <div className="absolute top-8 left-8 z-30 transform transition-all duration-700 group-hover/card:translate-x-[10px] group-hover/card:translate-y-[5px]">
                             <div className={`px-4 py-1.2 bg-brand-red rounded-lg shadow-[0_10px_20px_rgba(255,50,50,0.4)] border border-white/10 group-hover/card:bg-white group-hover/card:border-brand-red`}>
                               <span className="text-[9px] font-black text-white group-hover/card:text-brand-red uppercase tracking-widest transition-colors">{student.tag}</span>
                             </div>
                          </div>

                          {/* Professional Editorial Info Section */}
                          <div className="absolute bottom-3 inset-x-3 z-20 transform transition-transform duration-700 group-hover/card:translate-y-[-5px]">
                            <div className="p-6 rounded-[40px] bg-[#050508] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover/card:border-brand-red/40 group-hover/card:shadow-brand-red/10 transition-all duration-500 overflow-hidden relative">
                              {/* Polished Glint */}
                              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                              
                              <div className="flex items-center justify-between gap-4">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className="h-1 w-1 rounded-full bg-brand-red shadow-[0_0_8px_#ff3232]"></div>
                                    <span className="text-[9px] font-black text-brand-red uppercase tracking-[0.3em] font-outfit">{student.stats}</span>
                                  </div>
                                  <h4 className="text-2xl font-bold text-white uppercase tracking-tight font-outfit truncate">
                                    {student.name}
                                  </h4>
                                </div>
                                
                                <div className="flex-shrink-0 flex items-center gap-4 pl-5 border-l border-white/10 group-hover/card:border-brand-red/30 transition-colors">
                                  <div className="flex flex-col items-end">
                                    <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-0.5">Verified</span>
                                    <ArrowRight size={14} className="text-brand-red group-hover/card:translate-x-1.5 transition-transform" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050508] via-[#050508]/60 to-transparent z-30 pointer-events-none"></div>
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent z-30 pointer-events-none"></div>
            </div>

            {/* Success Story Carousel - Positioned Below */}
            <div className="bg-gradient-to-br from-white/5 to-transparent rounded-[32px] border border-white/10 p-6 backdrop-blur-2xl shadow-xl relative overflow-hidden group">
               {/* Decorative Gradient Pulse */}
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-brand-red/10 rounded-full blur-[60px] group-hover:bg-brand-red/20 transition-all"></div>
              
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-px bg-brand-red"></div>
                   <span className="text-white/60 text-[11px] font-black uppercase tracking-[0.3em]">Ambassador Stories</span>
                </div>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${activeTestimonial === i ? 'bg-brand-red w-6' : 'bg-white/10 hover:bg-white/30'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-6 relative z-10 animate-fade-in" key={activeTestimonial}>
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-red rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    alt={testimonials[activeTestimonial].name}
                    className="w-16 h-16 rounded-2xl object-cover border border-white/20 relative z-10 transition-all duration-700"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-white/5 font-black serif">"</span>
                    <p className="text-white/90 text-[15px] font-medium leading-relaxed italic line-clamp-2 drop-shadow-lg tracking-tight">
                      {testimonials[activeTestimonial].quote}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-white font-black uppercase tracking-widest text-[11px]">{testimonials[activeTestimonial].name}</span>
                    <span className="text-brand-red/60 font-black text-[11px] ml-2 tracking-tighter">@{testimonials[activeTestimonial].college}</span>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-brand-red/20 flex items-center justify-center hover:bg-brand-red transition-colors relative z-10 self-center">
                  <Play size={16} className="text-white ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#ffffff] via-[#ffffff]/50 to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default Hero;
