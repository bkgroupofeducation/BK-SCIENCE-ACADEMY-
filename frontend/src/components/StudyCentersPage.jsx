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
const VideoCard = ({ title, duration, thumb, desc, tag, link, index = 0 }) => {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      onClick={() => window.open(link, '_blank')}
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
          {duration && <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-[9px] font-black">{duration}</div>}
        </div>
        <div className="p-5">
          <h4 className="text-sm font-black text-brand-dark mb-1.5 tracking-tight group-hover:text-brand-red transition-colors">{title}</h4>
          <p className="text-gray-500 text-xs font-medium leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
};

/* ─── InfraCard (Colorful) ───────────────────────────────────────── */
const InfraCard = ({ val, label, sub, index, bgClass, textClass, hoverBorderClass }) => {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={`group p-8 ${bgClass} border border-transparent rounded-3xl ${hoverBorderClass} hover:shadow-lg transition-all duration-400 cursor-default`}
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s, box-shadow 0.3s, border-color 0.3s` }}
    >
      <div className={`text-3xl md:text-4xl font-black ${textClass} mb-2 transition-colors duration-400`}>{val}</div>
      <div className={`text-[11px] font-black uppercase tracking-[0.25em] ${textClass} opacity-80 mb-1`}>{label}</div>
      <div className={`text-[10px] font-bold ${textClass} opacity-50 uppercase tracking-widest`}>{sub}</div>
    </div>
  );
};

/* ─── Main Component ────────────────────────────────────────────────── */
const StudyCentersPage = ({ navigateTo }) => {
  const [activeCenter, setActiveCenter] = useState(centerData[0]);
  const [heroVisible, setHeroVisible] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => { 
    setTimeout(() => setHeroVisible(true), 80); 
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/pdfs/public');
      if (res.ok) {
        const result = await res.json();
        const formatted = (result.pdfs || [])
          .filter(v => v.videoUrl || v.category === 'Walkthrough')
          .map(v => {
            let thumb = '';
            if (v.videoUrl) {
              const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
              const match = v.videoUrl.match(regExp);
              if (match && match[2].length === 11) {
                thumb = `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
              }
            }
            return {
              title: v.title,
              desc: v.description,
              thumb: thumb || '/assets/centers/classroom_tour.png',
              link: v.videoUrl,
              tag: v.category || 'Walkthrough'
            };
          });
        setVideos(formatted);
      }
    } catch (err) { console.error('Failed to fetch videos:', err); }
  };

  const facilityData = [
    { title: 'Smart Classrooms', type: 'Visual Tech', icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, text: 'Interactive 4K panels and hybrid recording setups for seamless learning in every batch.' },
    { title: 'Doubt Café', type: 'Collaborative', icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, text: 'Open seating for impromptu peer discussions and always-on faculty access sessions.' },
    { title: 'Quiet Zone Labs', type: 'Focus', icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 9h.01M15 9h.01M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z"/></svg>, text: 'Dedicated silent floors for self-study and high-concentration JEE/NEET simulations.' },
  ];

  return (
    <div className="min-h-screen bg-white">



      {/* ── VIRTUAL EXPERIENCE (white-first) ─────────────────────────── */}
      <section className="relative pt-28 pb-10 md:pt-40 md:pb-12 bg-surface-1 overflow-hidden">
        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-red-pulse" />
                <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em]">Live Virtual Tours</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark tracking-tighter uppercase leading-tight">
                Virtual <span className="text-brand-red">Experience.</span>
              </h2>
            </div>
            <p className="text-gray-500 font-medium text-base max-w-xs leading-relaxed">
              Step inside our high-tech ecosystems from anywhere in the world.
            </p>
          </div>

          {/* Local Hero Video Section */}
          <div className="group relative rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-pointer mb-8 transition-shadow duration-400 hover:shadow-2xl border border-gray-100 bg-brand-dark aspect-[21/9]">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
              <source src="/bkscience.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Secondary video grid Header */}
          <div className="mb-8 mt-12 md:mt-16 text-center">
            <h3 className="text-2xl md:text-4xl font-black text-brand-dark uppercase tracking-tight mb-3">
              Subject <span className="text-brand-red">Walkthroughs.</span>
            </h3>
            <p className="text-gray-500 font-medium text-sm md:text-base mx-auto max-w-2xl">
              Experience our advanced teaching methodology across core scientific disciplines.
            </p>
          </div>

          {/* Secondary video grid */}
          <div className="grid md:grid-cols-3 gap-5">
            {videos.slice(1).map((v, i) => (
              <VideoCard key={i} {...v} index={i} />
            ))}
            {videos.length === 0 && (
              <div className="col-span-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { img: 'Screenshot 2026-05-06 173257.png', subject: 'Physics', topic: 'Kinetic Energy', link: 'https://www.youtube.com/watch?v=Z6dEFj-T8zo' },
                  { img: 'Screenshot 2026-05-06 173309.png', subject: 'Chemistry', topic: 'Thermodynamics', link: 'https://www.youtube.com/watch?v=EGlZhvnywbE' },
                  { img: 'Screenshot 2026-05-06 173317 - Copy.png', subject: 'Mathematics', topic: 'Differentiation', link: 'https://www.youtube.com/watch?v=cWwR50dEZks' },
                  { img: 'Screenshot 2026-05-06 165913.png', subject: 'Biology', topic: 'Plant Reproduction', link: 'https://www.youtube.com/watch?v=n0JK6LRwNrc' }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => window.open(item.link, '_blank')}
                    className="relative group rounded-2xl overflow-hidden cursor-pointer border border-gray-100 shadow-sm transition-all hover:shadow-xl animate-fade-up" 
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="aspect-video relative">
                      <img 
                        src={`/assets/${item.img}`} 
                        alt={item.subject} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/20 to-transparent flex flex-col justify-end p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center text-white">
                            <Play size={10} fill="currentColor" />
                          </div>
                          <span className="text-white font-black text-[7px] uppercase tracking-[0.2em]">{item.subject}</span>
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-tight mb-0.5">{item.topic}</h3>
                        <p className="text-gray-400 font-bold text-[8px] uppercase tracking-widest leading-none">Virtual Walkthrough</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── INFRASTRUCTURE (light gray bg) ───────────────────────────── */}
      <section className="py-10 md:py-12 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="relative p-10 md:p-16 rounded-[3rem] border border-gray-200 bg-surface-1 shadow-sm overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-bl from-brand-red/5 to-transparent pointer-events-none" />
            
            <div className="flex items-center gap-3 justify-center mb-5 relative z-10">
              <div className="w-8 h-[2px] bg-brand-red" />
              <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em]">Inside The Hub</span>
              <div className="w-8 h-[2px] bg-brand-red" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter uppercase leading-none mb-12 relative z-10">
              Academic<br />
              <span className="text-brand-red">Infrastructure.</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {[
                { val: '24/7', label: 'Power Backup', sub: 'Zero downtime', bgClass: 'bg-red-100', textClass: 'text-red-700', hoverBorderClass: 'hover:border-red-300' },
                { val: 'Fiber', label: 'Optical Network', sub: 'Gigabit speeds', bgClass: 'bg-blue-100', textClass: 'text-blue-700', hoverBorderClass: 'hover:border-blue-300' },
                { val: 'Active', label: 'Air Filtration', sub: 'HEPA grade', bgClass: 'bg-green-100', textClass: 'text-green-700', hoverBorderClass: 'hover:border-green-300' },
                { val: 'Safe', label: 'Bio-Security', sub: 'Smart access', bgClass: 'bg-purple-100', textClass: 'text-purple-700', hoverBorderClass: 'hover:border-purple-300' },
              ].map((n, i) => (
                <InfraCard key={i} {...n} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA (white) ─────────────────────────────────────────── */}
      <section className="py-16 bg-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-brand-red/5 rounded-full blur-[80px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-block px-5 py-2 border border-brand-red/15 bg-brand-red/5 rounded-full text-brand-red text-[10px] font-black uppercase tracking-[0.35em] mb-8">Come See Us</div>
          <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter leading-none mb-10 uppercase">
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
