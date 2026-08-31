import React, { useState, useEffect, useRef } from 'react';
import SafeImage from './SafeImage';
import { Book, ChevronDown, Phone, Menu, X, Mail, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ navigateTo, onOpenCounseling }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.stopPropagation();
    navigateTo('home');
  };

  const menuItems = [
    { 
      title: "About", 
      type: "dropdown", 
      items: [
        { label: "About Us", action: () => navigateTo('about-us') },
        { label: "Academics Team", action: () => navigateTo('academics-team') },
        { label: "Study Center", action: () => navigateTo('study-center') },
      ]
    },
    { 
      title: "Classroom", 
      type: "dropdown", 
      items: [
        { label: "JEE", sub: [
          { label: "Class 11th", action: () => navigateTo('jee-11th') }, 
          { label: "Class 12th", action: () => navigateTo('jee-12th') }, 
          { label: "Class 12th Pass", action: () => navigateTo('jee-pass') }
        ], action: () => navigateTo('jee-hub') }, 
        { label: "NEET", sub: [
          { label: "Class 11th", action: () => navigateTo('neet-11th') }, 
          { label: "Class 12th", action: () => navigateTo('neet-12th') }, 
          { label: "Class 12th Pass", action: () => navigateTo('neet-pass') }
        ], action: () => navigateTo('neet-hub') }, 
        { label: "MHT-CET", action: () => navigateTo('cet') },
        { label: "NDA", action: () => navigateTo('nda') },
        { label: "Foundation", action: () => navigateTo('foundation') },
        { label: "State Board", action: () => navigateTo('boards') },
        { label: "Student Care & Notes", action: () => navigateTo('study-center') }
      ] 
    },
    { 
      title: "Information", 
      type: "dropdown", 
      items: [
        { label: "ENGINEERING", isHeading: true },
        { label: "JEE-Advanced", icon: Book, action: () => navigateTo('jee-advanced') },
        { label: "JEE-Main", icon: Book, action: () => navigateTo('jee-main') },
        { label: "BITSAT", icon: Book, action: () => navigateTo('bitsat') },
        { label: "MHT-CET", icon: Book, action: () => navigateTo('mht-cet-info') },
        { label: "MEDICAL", isHeading: true },
        { label: "NEET-UG", icon: Book, action: () => navigateTo('neet-ug-info') }
      ]
    },
    { 
      title: "Online Courses", 
      type: "dropdown", 
      items: [
        { label: "Live Online Classes", action: () => navigateTo('online-courses') },
        { label: "Crash Courses", action: () => navigateTo('online-courses') },
        { label: "Test Series", action: () => navigateTo('online-courses') },
        { label: "Video Lectures", action: () => navigateTo('online-courses') }
      ] 
    },
    { title: "Scholarship", type: "link", action: () => navigateTo('residential') },
    { 
      title: "Results", 
      type: "dropdown", 
      items: [
        { label: "JEE", action: () => navigateTo('jee') }, 
        { label: "NEET", action: () => navigateTo('neet') }, 
        { label: "Live Results", action: () => navigateTo('live-results') }
      ] 
    },
    { 
      title: "Connect", 
      type: "dropdown", 
      items: [
        { label: "Contact Us", action: () => navigateTo('contact') },
        { label: "Associate Consultant", action: () => navigateTo('associate-consultant') }
      ] 
    },
  ];

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[5000] bg-white transition-all duration-500 border-b border-gray-100/80 ${scrolled ? 'shadow-md py-1.5' : 'shadow-sm py-2.5'} ${loaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
      >
        <div className="w-full px-4 lg:px-8 flex items-center justify-between transition-all duration-500">
          
          <div className="flex items-center gap-6 pointer-events-auto mt-2">
            <div 
              className="cursor-pointer flex items-center gap-3 group transition-transform active:scale-95" 
              onClick={handleLogoClick}
              title="Go to Home"
            >
              <div className="relative">
                {/* Curved Registration Number */}
                <svg viewBox="0 0 100 50" className="absolute top-[2px] md:top-[1px] left-1/2 -translate-x-1/2 w-16 md:w-20 overflow-visible pointer-events-none z-20">
                  <path id="curve-desktop" d="M 10,40 A 40,40 0 0,1 90,40" fill="transparent" />
                  <text className="text-[6.5px] md:text-[8px] font-bold fill-[#003366] uppercase tracking-[0.1em]">
                    <textPath href="#curve-desktop" startOffset="50%" textAnchor="middle">
                      REG. NO: F12121/NSK
                    </textPath>
                  </text>
                </svg>
                <div className="relative h-14 md:h-17 w-12 md:w-15 rounded-[100%] overflow-hidden border-2 border-brand-red/10 bg-white shadow-sm transform group-hover:scale-105 transition-all duration-500 origin-left relative z-10">
                  <SafeImage src="/assets/bk.png" alt="BK Science Academy" className="w-full h-full object-contain p-1.5" fallbackText="Logo" />
                </div>
              </div>
              <div className="flex flex-col leading-none ml-2 md:ml-4">
                {/* Institutional Header integrated above branding */}
                <span className="text-[5px] md:text-[7px] font-black text-brand-red tracking-wider uppercase mb-0.5">
                  | नही ज्ञानेन सदृशं पवित्रमिह विद्यते |
                </span>
                <span className="text-[6px] md:text-[8px] font-black text-slate-700 tracking-tight mb-1">
                  <span className="text-brand-red">BK</span> Educational And Welfare Society's
                </span>
                
                <span className="text-sm md:text-2xl lg:text-3xl font-black tracking-tighter leading-none">
                  <span className="text-brand-red">BK</span> <span className="text-brand-dark">Science Academy</span>
                </span>

              </div>
            </div>

            {/* Free Counseling Button for Desktop placed next to the logo */}
            <div className="hidden lg:flex items-center">
              <button 
                onClick={() => navigateTo('counseling')}
                className="bg-brand-red text-white px-5 py-2.5 rounded-full shadow-md border-2 border-white flex items-center gap-2 hover:bg-brand-dark transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap animate-pulse-subtle"
              >
                <span className="text-base">📋</span>
                <span className="font-black uppercase tracking-[0.08em] text-[11px]">Free Counseling</span>
              </button>
            </div>
          </div>

          {/* Right Actions (Mobile) */}
          <div className="lg:hidden flex items-center gap-2 absolute right-4">
             {/* Admission Button - Responsive */}
             <motion.div 
                className="flex flex-col cursor-pointer bg-red-50 border border-brand-red/20 px-2.5 py-1 rounded-xl active:scale-95 transition-all shadow-sm" 
                onClick={() => navigateTo('admission')}
              >
                <span className="text-[6px] font-black text-brand-red uppercase tracking-widest leading-none mb-0.5">Admission 2026</span>
                <span className="text-[8px] font-black text-brand-dark uppercase tracking-tight leading-none flex items-center gap-1">
                  Now Open
                  <span className="relative flex h-1 w-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-green-500"></span>
                  </span>
                </span>
              </motion.div>

              <button 
                className="p-2.5 bg-gray-100 rounded-full text-gray-600 active:scale-95 transition-all shadow-sm z-20" 
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={20} />
              </button>
          </div>

          <div className="hidden lg:flex items-center bg-gray-100/95 backdrop-blur-xl border border-gray-200/60 rounded-full p-1.5 shadow-lg pointer-events-auto mt-2">
            {menuItems.map((item) => (
              <div 
                key={item.title} 
                className="group/navitem relative flex items-center gap-0.5 cursor-pointer px-2.5 py-1.5 rounded-full text-[12px] font-bold text-gray-600 hover:text-brand-dark hover:bg-white hover:shadow-sm transition-all duration-300"
                onMouseEnter={() => { if (item.type === "dropdown") setOpenDropdown(item.title); }}
                onMouseLeave={() => { setOpenDropdown(null); setActiveSubMenu(null); }}
                onClick={() => { if(item.action) item.action() }}
              >
                <span className={`${openDropdown === item.title ? 'text-brand-dark' : ''}`}>{item.title}</span>
                {item.type === "dropdown" && (
                  <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === item.title ? 'rotate-180 text-brand-dark' : 'text-gray-400 opacity-70'}`} />
                )}

                <AnimatePresence>
                  {item.type === "dropdown" && openDropdown === item.title && (
                    <motion.div 
                      key={item.title + '-dropdown'}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 pointer-events-auto"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="bg-white border border-gray-100 shadow-xl rounded-2xl flex min-w-[18rem] overflow-hidden">
                        <div className={`flex-1 py-2 ${item.items.some(i => i.sub) ? 'border-r border-gray-50 bg-gray-50/30' : ''}`}>
                          {item.items.map((sub, i) => {
                            if (sub.isHeading) {
                              return (
                                <div key={i} className={`px-5 py-2.5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ${i === 0 ? 'mt-1' : 'mt-3 border-t border-gray-100 pt-4'}`}>
                                  {sub.label}
                                </div>
                              );
                            }

                            const Icon = sub.icon;
                            const isActive = activeSubMenu === sub.label || sub.label === 'Inquiry Form';

                            return (
                              <div 
                                key={i} 
                                className={`px-5 py-3 flex items-center justify-between group/subitem cursor-pointer transition-all duration-200 ${isActive ? 'bg-brand-red/5 text-brand-red font-black' : 'hover:bg-gray-50 hover:text-brand-red font-bold text-gray-600'}`}
                                onMouseEnter={() => sub.sub ? setActiveSubMenu(sub.label) : setActiveSubMenu(null)}
                                onClick={() => sub.action && sub.action()}
                              >
                                <div className="flex items-center gap-3">
                                  {Icon && (
                                    <Icon size={18} className={`transition-all duration-200 ${isActive ? 'text-brand-red scale-110' : 'text-gray-400 group-hover/subitem:text-brand-red group-hover/subitem:scale-110'}`} />
                                  )}
                                  <span className="text-sm">{typeof sub === 'string' ? sub : sub.label}</span>
                                </div>
                                {sub.sub && (
                                  <ChevronDown size={14} className={`-rotate-90 transition-all ${activeSubMenu === sub.label ? 'text-brand-red translate-x-1' : 'text-gray-300'}`} />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {item.items.find(i => i.label === activeSubMenu)?.sub && (
                          <div className="w-64 py-3 bg-white border-l border-gray-100 shadow-inner">
                            {item.items.find(i => i.label === activeSubMenu).sub.map((nested, j) => (
                              <div 
                                key={j} 
                                className="px-6 py-2.5 hover:bg-brand-red/5 text-gray-500 hover:text-brand-red font-bold text-sm cursor-pointer transition-colors flex items-center gap-2 group/nested"
                                onClick={() => {
                                  if (typeof nested !== 'string' && nested.action) nested.action();
                                  setOpenDropdown(null);
                                  setActiveSubMenu(null);
                                }}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/nested:bg-brand-red transition-colors"></span>
                                {typeof nested === 'string' ? nested : nested.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            key="mobile-nav-overlay"
            className="fixed inset-0 z-[6000] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div 
              key="mobile-nav-content"
              className="absolute top-0 left-0 bottom-0 w-80 bg-white shadow-2xl flex flex-col pointer-events-auto"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div 
                  className="cursor-pointer flex items-center gap-2 active:scale-95 transition-transform" 
                  onClick={() => { navigateTo('home'); setMobileOpen(false); }}
                >
                  <div className="relative">
                    {/* Curved Registration Number (Mobile) */}
                    <svg viewBox="0 0 100 50" className="absolute top-[2px] left-1/2 -translate-x-1/2 w-14 overflow-visible pointer-events-none z-20">
                      <path id="curve-mobile" d="M 10,40 A 40,40 0 0,1 90,40" fill="transparent" />
                      <text className="text-[7.5px] font-bold fill-[#003366] uppercase tracking-[0.1em]">
                        <textPath href="#curve-mobile" startOffset="50%" textAnchor="middle">
                          REG. NO: F12121/NSK
                        </textPath>
                      </text>
                    </svg>
                    <div className="w-10 h-12 rounded-[100%] overflow-hidden border border-brand-red/10 bg-white p-1">
                      <SafeImage src="/assets/bk.png" alt="Logo" className="w-full h-full object-contain" fallbackText="Logo" />
                    </div>
                  </div>
                  <span className="font-black text-brand-dark text-lg tracking-tighter">BK Academy</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 text-gray-500 hover:text-brand-red bg-gray-50 rounded-xl transition-all">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {menuItems.map((item) => (
                  <div key={item.title}>
                    <button 
                      className={`w-full flex items-center justify-between p-4 text-left font-bold text-sm rounded-xl transition-all ${mobileExpanded === item.title ? 'bg-brand-red/5 text-brand-red' : 'text-brand-dark hover:bg-gray-50'}`}
                      onClick={() => {
                        if (item.type === 'link') {
                          if (item.action) item.action();
                          setMobileOpen(false);
                        } else {
                          setMobileExpanded(mobileExpanded === item.title ? null : item.title);
                        }
                      }}
                    >
                      {item.title}
                      {item.type === "dropdown" && (
                        <ChevronDown size={16} className={`transition-transform duration-300 ${mobileExpanded === item.title ? 'rotate-180' : ''}`} />
                      )}
                    </button>

                    <AnimatePresence mode="wait">
                      {item.type === "dropdown" && mobileExpanded === item.title && (
                        <motion.div 
                          key={item.title + '-mobile-dropdown'}
                          className="px-4 py-2 space-y-1 bg-gray-50/50 rounded-xl mt-1 mb-2 overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          {item.items.map((sub, i) => {
                            if (sub.isHeading) {
                              return (
                                <div key={i} className={`pt-4 pb-2 px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100/50 mb-1`}>
                                  {sub.label}
                                </div>
                              );
                            }

                            const Icon = sub.icon;
                            const isMobileActive = mobileSubExpanded === sub.label || sub.label === 'Inquiry Form';

                            return (
                              <div key={i}>
                                <div 
                                  className={`py-2.5 px-4 text-sm font-bold flex items-center justify-between cursor-pointer rounded-lg transition-all ${isMobileActive ? 'text-brand-red bg-brand-red/5' : 'text-gray-600 hover:bg-gray-50'}`}
                                  onClick={() => {
                                    if (sub.sub) setMobileSubExpanded(mobileSubExpanded === sub.label ? null : sub.label);
                                    else {
                                      if (sub.action) sub.action();
                                      setMobileOpen(false);
                                    }
                                  }}
                                >
                                  <div className="flex items-center gap-3">
                                    {Icon && <Icon size={16} className={isMobileActive ? 'text-brand-red' : 'text-gray-400'} />}
                                    <span>{typeof sub === 'string' ? sub : sub.label}</span>
                                  </div>
                                  {sub.sub && <ChevronDown size={14} className={`transition-all ${mobileSubExpanded === sub.label ? 'rotate-180' : ''}`} />}
                                </div>
                                <AnimatePresence>
                                  {sub.sub && mobileSubExpanded === sub.label && (
                                    <motion.div 
                                      key={sub.label + '-nested'}
                                      className="pl-11 py-2 space-y-2"
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                    >
                                      {sub.sub.map((nested, j) => (
                                        <div key={j} className="text-xs font-bold text-gray-500 hover:text-brand-red py-1.5 transition-all" onClick={() => {
                                          if (typeof nested !== 'string' && nested.action) nested.action();
                                          setMobileOpen(false);
                                        }}>
                                          {typeof nested === 'string' ? nested : nested.label}
                                        </div>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <button 
                  className="w-full bg-brand-dark text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-brand-dark/20" 
                  onClick={() => { navigateTo('admission'); setMobileOpen(false); }}
                >
                  Admission Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
