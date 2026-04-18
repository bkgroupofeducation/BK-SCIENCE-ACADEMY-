import React, { useState, useEffect, useRef } from 'react';

/* ─── Data ─────────────────────────────────────────────────────────── */
const centerData = [
  {
    id: 1,
    city: 'Nashik',
    location: 'BK Group of Education',
    address: '2nd Floor, Gajanan Plaza, Gharpure Ghat Rd, behind Lotus Capital Building, Ashok Stambh, Shivaji Nagar, Nashik, Maharashtra 422002',
    phone: '+91 88883 01363',
    featured: true,
    students: '5,000+',
    established: '2007',
    facilities: ['Smart Classrooms', 'Advanced Labs', '24/7 Library', 'Doubt Cafe'],
    coordinates: { x: 50, y: 50 }
  }
];

/* ─── Scroll-reveal hook ────────────────────────────────────────────── */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.08, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

/* ─── SVG Icons ─────────────────────────────────────────────────────── */
const ArrowRight = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const Play = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const Download = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

/* ─── FacilityCard (white-theme) ────────────────────────────────────── */
const FacilityCard = ({ title, type, icon, text, index }) => {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className="group relative p-8 bg-white border border-gray-100 rounded-3xl cursor-default overflow-hidden hover:border-brand-red/20 hover:shadow-lg transition-all duration-500"
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s, box-shadow 0.3s, border-color 0.3s` }}
    >
      <div className="absolute top-6 right-7 text-6xl font-black text-gray-50 select-none">{String(index + 1).padStart(2, '0')}</div>
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-brand-red/8 border border-brand-red/15 flex items-center justify-center text-brand-red mb-6 group-hover:bg-brand-red group-hover:text-white transition-all duration-400">
          {icon}
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red mb-2">{type}</div>
        <h3 className="text-xl font-black text-brand-dark mb-3 tracking-tight">{title}</h3>
        <p className="text-gray-500 font-medium leading-relaxed text-sm">{text}</p>
      </div>
    </div>
  );
};

/* ─── VideoCard (white-theme) ───────────────────────────────────────── */
const VideoCard = ({ title, duration, thumb, desc, tag, index = 0 }) => {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className="group relative cursor-pointer"
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s` }}
    >
      <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-brand-red/20 transition-all duration-400">
        <div className="aspect-video relative overflow-hidden">
          <img src={thumb} alt={title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm border border-white rounded-full text-brand-dark text-[9px] font-black uppercase tracking-widest">{tag}</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-white flex items-center justify-center text-brand-red shadow-lg group-hover:bg-brand-red group-hover:text-white group-hover:scale-110 transition-all duration-300">
              <Play size={18} />
            </div>
          </div>
          <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-[9px] font-black">{duration}</div>
        </div>
        <div className="p-5">
          <h4 className="text-sm font-black text-brand-dark mb-1.5 tracking-tight group-hover:text-brand-red transition-colors">{title}</h4>
          <p className="text-gray-500 text-xs font-medium leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
};

/* ─── InfraCard (white-theme) ───────────────────────────────────────── */
const InfraCard = ({ val, label, sub, index }) => {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className="group p-8 bg-white border border-gray-100 rounded-3xl hover:border-brand-red/20 hover:shadow-md transition-all duration-400 cursor-default"
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s, box-shadow 0.3s, border-color 0.3s` }}
    >
      <div className="text-3xl md:text-4xl font-black text-brand-dark group-hover:text-brand-red mb-2 transition-colors duration-400">{val}</div>
      <div className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-500 mb-1">{label}</div>
      <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{sub}</div>
    </div>
  );
};

/* ─── Main Component ────────────────────────────────────────────────── */
const StudyCentersPage = ({ navigateTo }) => {
  const [activeCenter, setActiveCenter] = useState(centerData[0]);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { setTimeout(() => setHeroVisible(true), 80); }, []);

  const facilityData = [
    { title: 'Smart Classrooms', type: 'Visual Tech', icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, text: 'Interactive 4K panels and hybrid recording setups for seamless learning in every batch.' },
    { title: 'Doubt Café', type: 'Collaborative', icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, text: 'Open seating for impromptu peer discussions and always-on faculty access sessions.' },
    { title: 'Quiet Zone Labs', type: 'Focus', icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 9h.01M15 9h.01M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z"/></svg>, text: 'Dedicated silent floors for self-study and high-concentration JEE/NEET simulations.' },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO — dark cinematic ───────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-brand-dark overflow-hidden pt-24 pb-16">
        {/* Ambient blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="animate-blob-1 absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-brand-red/10 blur-[140px]" />
          <div className="animate-blob-2 absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-600/8 blur-[160px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark" />
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 py-10">
          {/* Left — Headline */}
          <div className={`flex-1 transition-all duration-1000 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-[2px] bg-brand-red" />
              <span className="text-white/50 font-black uppercase tracking-[0.4em] text-[10px]">Architectural Excellence</span>
            </div>
            <h1 className="text-7xl md:text-[8rem] lg:text-[9.5rem] font-black text-white leading-[0.82] tracking-tighter mb-10 uppercase">
              Study<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-orange-500 to-brand-yellow">Centers.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-medium max-w-xl leading-snug mb-14">
              Our ecosystems are engineered for focus, high-impact learning, and architectural inspiration. More than a classroom — a launchpad.
            </p>
            <div className="flex flex-wrap items-center gap-10">
              {[['01', 'Premium Hub', 'text-brand-red'], ['5K+', 'Students', 'text-white'], ['2007', 'Established', 'text-white']].map(([v, l, c]) => (
                <div key={l}>
                  <div className={`text-3xl md:text-4xl font-black ${c} mb-1`}>{v}</div>
                  <div className="text-[9px] font-black text-white/30 uppercase tracking-widest">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — glassmorphism card */}
          <div className={`w-full lg:w-[380px] transition-all duration-1000 delay-300 ease-out ${heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="bg-white/6 backdrop-blur-3xl border border-white/10 rounded-3xl p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/15 rounded-full blur-[60px] pointer-events-none" />
              <div className="relative z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red inline-block mb-6 animate-red-pulse" />
                <div className="text-brand-red font-black text-[10px] uppercase tracking-[0.3em] mb-4">Visit a Lab</div>
                <h3 className="text-2xl font-black text-white mb-8 tracking-tight leading-snug">Schedule a Guided Campus Walkthrough.</h3>
                <button
                  onClick={() => navigateTo('enquiry')}
                  className="w-full py-5 bg-brand-red text-white font-black rounded-2xl uppercase tracking-widest text-[11px] hover:bg-red-700 hover:shadow-[0_20px_40px_rgba(192,0,0,0.5)] hover:-translate-y-1 active:scale-95 transition-all duration-300 mb-5"
                >
                  Book Now
                </button>
                <p className="text-white/30 text-[10px] font-bold text-center uppercase tracking-widest">Experience smart classrooms & digital libraries in person.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mx-auto" />
        </div>
      </section>

      {/* ── MARQUEE TICKER ───────────────────────────────────────────── */}
      <div className="bg-brand-red py-3.5 overflow-hidden border-y border-brand-red/20">
        <div className="animate-marquee flex gap-14 whitespace-nowrap">
          {Array(3).fill(['Smart Classrooms', '4K Panels', 'Doubt Café', '24/7 Library', 'Advanced Labs', 'Bio-Security', 'Power Backup', 'Fiber Network']).flat().map((t, i) => (
            <span key={i} className="text-white font-black text-xs uppercase tracking-[0.25em] shrink-0">
              {t} <span className="text-white/40 mx-3">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FACILITY CARDS (white bg) ─────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-surface-1 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[2px] bg-brand-red" />
                <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em]">Campus Anatomy</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter leading-none uppercase">
                Designed For<br />
                <span className="text-brand-red">High Performance.</span>
              </h2>
            </div>
            <p className="text-gray-500 font-medium text-base max-w-xs leading-relaxed">
              We've traded cramped rooms for spacious, ergonomic environments that keep students sharp during long sessions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facilityData.map((f, i) => <FacilityCard key={i} {...f} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="section-divider" />

      {/* ── CENTERS EXPLORER (keeps white bg) ────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 border border-brand-red/15 bg-brand-red/5 rounded-full text-brand-red text-[10px] font-black uppercase tracking-[0.35em] mb-7">Our Locations</div>
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter uppercase leading-none">
              Explore Our<br />
              <span className="text-brand-red">Study Hubs.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 space-y-3">
              {centerData.map((center) => (
                <div
                  key={center.id}
                  onClick={() => setActiveCenter(center)}
                  className={`relative p-7 rounded-3xl cursor-pointer transition-all duration-500 border ${activeCenter.id === center.id ? 'bg-brand-dark border-brand-dark shadow-xl shadow-brand-dark/15 scale-[1.01]' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.25em] ${activeCenter.id === center.id ? 'text-brand-red' : 'text-gray-400'}`}>{center.city} Hub</span>
                    {center.featured && <div className="w-2 h-2 bg-brand-red rounded-full animate-red-pulse" />}
                  </div>
                  <h4 className={`text-xl font-black tracking-tight mb-2 ${activeCenter.id === center.id ? 'text-white' : 'text-brand-dark'}`}>{center.location}</h4>
                  <p className={`text-sm font-medium leading-relaxed ${activeCenter.id === center.id ? 'text-gray-400' : 'text-gray-500'}`}>{center.address}</p>

                  {activeCenter.id === center.id && (
                    <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                      <div className="flex gap-6">
                        {[['students', 'Alumni'], ['established', 'Est. Yr']].map(([k, l]) => (
                          <div key={k} className="text-center">
                            <div className="text-base font-black text-white">{center[k]}</div>
                            <div className="text-[8px] font-black text-white/30 uppercase tracking-widest">{l}</div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigateTo('contact'); }}
                        className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-white"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="lg:col-span-7 relative bg-surface-1 border border-gray-100 rounded-3xl overflow-hidden min-h-[420px]">
              <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-brand-red/6 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="relative h-full flex flex-col justify-end p-10 lg:p-12">
                <div key={activeCenter.id} className="mb-8">
                  <div className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] mb-4">Inside the Center</div>
                  <div className="flex flex-wrap gap-2">
                    {activeCenter.facilities.map(f => (
                      <div key={f} className="px-4 py-2 bg-white border border-gray-100 rounded-full text-brand-dark text-[10px] font-black uppercase tracking-widest hover:border-brand-red/30 hover:bg-brand-red/5 hover:text-brand-red transition-all cursor-default">{f}</div>
                    ))}
                  </div>
                </div>
                <div className="p-7 border border-gray-100 rounded-2xl bg-white shadow-sm">
                  <p className="text-gray-600 text-sm font-medium mb-4 italic leading-relaxed">"A focused space is a focused mind. Every square inch of this center is optimized for academic peak-state."</p>
                  <a href="https://maps.app.goo.gl/9nGy3UgMAKkGPTy88" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-red font-black uppercase tracking-widest text-[10px] hover:gap-4 transition-all duration-300 group/link">
                    Locate On Maps <ArrowRight size={14} className="group-hover/link:rotate-45 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="section-divider" />

      {/* ── VIRTUAL EXPERIENCE (white-first) ─────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-surface-1 overflow-hidden">
        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-red-pulse" />
                <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em]">Live Virtual Tours</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter uppercase leading-none">
                Virtual<br />
                <span className="text-brand-red">Experience.</span>
              </h2>
            </div>
            <p className="text-gray-500 font-medium text-base max-w-xs leading-relaxed">
              Step inside our high-tech ecosystems from anywhere in the world.
            </p>
          </div>

          {/* HERO video card */}
          <div className="group relative rounded-2xl overflow-hidden cursor-pointer mb-8 transition-shadow duration-400 hover:shadow-xl border border-gray-100">
            <div className="aspect-[21/9] relative overflow-hidden">
              <img src="/assets/centers/classroom_tour.png" alt="Classroom Tour" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white flex items-center justify-center text-brand-red pl-1 shadow-xl group-hover:bg-brand-red group-hover:text-white group-hover:scale-110 transition-all duration-400">
                    <Play size={28} />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                <div className="flex items-end justify-between gap-6 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="px-3 py-1 bg-brand-red rounded-full text-white text-[9px] font-black uppercase tracking-widest">Featured</span>
                      <span className="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-white text-[9px] font-black">2:45</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-none mb-2">Digital Classroom Walkthrough</h3>
                    <p className="text-gray-300 font-medium text-sm max-w-xl">Explore our hybrid learning technology, interactive 4K panels, and ergonomic student seating in full detail.</p>
                  </div>
                  <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
                    <div className="text-white/40 text-[9px] font-black uppercase tracking-widest">Viewers</div>
                    <div className="text-4xl font-black text-white">1.2<span className="text-brand-red">K</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary video grid */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: 'Lab & Innovation Hub', duration: '3:15', thumb: '/assets/centers/lab_tour.png', desc: 'Advanced chemistry & physics experimentation zones.', tag: 'Science' },
              { title: 'Quiet Study Zone', duration: '1:50', thumb: '/assets/centers/classroom_tour.png', desc: 'Silent floors built for peak concentration.', tag: 'Focus' },
              { title: 'Doubt Café Sessions', duration: '2:20', thumb: '/assets/centers/lab_tour.png', desc: 'Open peer discussion and faculty interaction zones.', tag: 'Interactive' },
            ].map((v, i) => <VideoCard key={i} {...v} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── SYLLABUS DOWNLOAD (white-first) ──────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="relative bg-surface-1 border border-gray-100 rounded-3xl p-10 md:p-16 overflow-hidden flex flex-col lg:flex-row items-center gap-12 shadow-sm">
            <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-l from-brand-red/5 to-transparent pointer-events-none" />

            {/* Book mockup */}
            <div className="lg:w-[220px] shrink-0 relative z-10 group">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl transition-all duration-600 group-hover:-rotate-2 group-hover:scale-105">
                <img src="/assets/centers/syllabus_cover.png" alt="Syllabus" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 to-transparent flex flex-col justify-end p-6">
                  <div className="w-8 h-0.5 bg-brand-red mb-3" />
                  <div className="text-white font-black uppercase tracking-widest text-[9px] mb-1.5">2026-27 Edition</div>
                  <div className="text-white font-bold text-xs leading-tight">Comprehensive JEE & NEET Academic Roadmap</div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[2px] bg-brand-red" />
                <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em]">Free Download</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter uppercase leading-none mb-6">
                Master The<br />
                <span className="text-brand-red">Curriculum.</span>
              </h2>
              <p className="text-gray-500 font-medium text-base mb-10 max-w-xl leading-relaxed">
                Plan your success with our granular, week-by-week syllabus breakdown. Includes module details, test schedules, and revision checkpoints.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'JEE Syllabus', size: '4.2 MB', color: 'bg-brand-red/8 border-brand-red/15 text-brand-red' },
                  { label: 'NEET Syllabus', size: '3.8 MB', color: 'bg-indigo-50 border-indigo-100 text-indigo-600' },
                ].map(({ label, size, color }) => (
                  <button key={label} className={`flex items-center justify-between p-5 border ${color} rounded-2xl group hover:shadow-sm transition-all duration-300 bg-white border-gray-100 hover:border-brand-red/20`}>
                    <div className="text-left">
                      <div className="text-brand-dark font-black text-sm uppercase tracking-widest mb-0.5 group-hover:text-brand-red transition-colors">{label}</div>
                      <div className="text-gray-400 text-[10px] font-bold uppercase">PDF • {size}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                      <Download size={16} />
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 font-bold mt-4 uppercase tracking-widest">
                * Syllabus downloads open as PDF in a new tab after email verification (available soon).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INFRASTRUCTURE (light gray bg) ───────────────────────────── */}
      <section className="py-24 bg-surface-1 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[35vw] h-[35vw] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="w-8 h-[2px] bg-brand-red" />
            <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em]">Inside The Hub</span>
            <div className="w-8 h-[2px] bg-brand-red" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter uppercase leading-none mb-16">
            Academic<br />
            <span className="text-brand-red">Infrastructure.</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { val: '24/7', label: 'Power Backup', sub: 'Zero downtime' },
              { val: 'Fiber', label: 'Optical Network', sub: 'Gigabit speeds' },
              { val: 'Active', label: 'Air Filtration', sub: 'HEPA grade' },
              { val: 'Safe', label: 'Bio-Security', sub: 'Smart access' },
            ].map((n, i) => (
              <InfraCard key={i} {...n} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA (white) ─────────────────────────────────────────── */}
      <section className="py-32 bg-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-brand-red/5 rounded-full blur-[80px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-block px-5 py-2 border border-brand-red/15 bg-brand-red/5 rounded-full text-brand-red text-[10px] font-black uppercase tracking-[0.35em] mb-8">Come See Us</div>
          <h2 className="text-5xl md:text-8xl font-black text-brand-dark tracking-tighter leading-none mb-10 uppercase">
            Visit Our<br />
            <span className="text-brand-red">Ecosystems.</span>
          </h2>
          <p className="text-gray-500 font-medium text-lg mb-12 max-w-2xl mx-auto">Gajanan Plaza, Gharpure Ghat Rd, Ashok Stambh, Nashik — <span className="text-brand-dark font-bold">Ready to receive you.</span></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigateTo('contact')}
              className="px-12 py-5 bg-brand-red text-white font-black rounded-3xl text-[11px] uppercase tracking-widest hover:bg-red-800 hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-lg shadow-brand-red/20"
            >
              Locate Nearest Center
            </button>
            <button
              onClick={() => navigateTo('enquiry')}
              className="px-12 py-5 bg-transparent border-2 border-brand-dark/15 text-brand-dark font-black rounded-3xl text-[11px] uppercase tracking-widest hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all duration-300"
            >
              Book a Walkthrough
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudyCentersPage;
