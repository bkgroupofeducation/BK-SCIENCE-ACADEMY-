import React, { useState, useEffect, useRef } from 'react';
import SafeImage from './SafeImage';
import { Book, ChevronDown, Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ navigateTo }) => {
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
        { label: "Why BK Science", action: () => navigateTo('why-bk') },
        { label: "Study Center", action: () => navigateTo('study-center') },
        { label: "Careers", action: () => navigateTo('careers') },
      ]
    },
    { 
      title: "Admission", 
      type: "dropdown", 
      items: [
        { label: "Admission Form", action: () => navigateTo('admission') },
        { label: "Scholarship Test", action: () => navigateTo('residential') },
        { label: "Registration", action: () => navigateTo('registration') },
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
        { label: "State Board", action: () => navigateTo('boards') },
        { label: "Foundation", sub: ["Tapasya", "Foundation Offline"], action: () => navigateTo('foundation') }
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
        { label: "MHT-CET", icon: Book, action: () => navigateTo('cet') },
        { label: "MEDICAL", isHeading: true },
        { label: "NEET-UG", icon: Book, action: () => navigateTo('neet-ug') }
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
      title: "Pay Fee", 
      type: "dropdown", 
      items: [
        { label: "Online Payment", action: () => navigateTo('pay-fee') },
        { label: "Registration Form", action: () => navigateTo('registration') }
      ] 
    },
    { 
      title: "Results", 
      type: "dropdown", 
      items: [
        { label: "JEE", action: () => navigateTo('jee') }, 
        { label: "NEET", action: () => navigateTo('neet') }, 
        { label: "Olympiads", action: () => navigateTo('olympiads') },
        { label: "Live Results", action: () => navigateTo('live-results') }
      ] 
    },
    { 
      title: "Connect", 
      type: "dropdown", 
      items: [
        { label: "Contact Us", action: () => navigateTo('contact') },
        { label: "Student Enquiry", action: () => navigateTo('enquiry') },
        { label: "Associate Consultant", action: () => navigateTo('associate-consultant') }
      ] 
    },
  ];

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-4 left-0 right-0 z-[5000] transition-all duration-500 ${loaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
      >
        <div className={`container mx-auto px-4 lg:px-8 flex items-center justify-between transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-2xl shadow-brand-dark/5 rounded-2xl py-2' : ''}`}>
          
          <div className="flex items-center gap-4 group pointer-events-auto">
            <button 
              className="lg:hidden p-2.5 -ml-2 bg-gray-100/90 backdrop-blur-md rounded-full text-gray-600 hover:text-brand-red transition-all duration-300 shadow-sm" 
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="cursor-pointer relative mix-blend-multiply group" onClick={handleLogoClick}>
              <SafeImage src="/assets/Logo.png" alt="BK Science Academy" className="h-8 md:h-10 w-auto transform group-hover:scale-105 transition-all duration-500 origin-left relative z-10" fallbackText="Logo" />
            </div>
            
            <motion.div 
              className="hidden xl:flex flex-col cursor-pointer bg-red-50/90 backdrop-blur-md border border-brand-red/10 px-3 py-1.5 rounded-full hover:bg-brand-red/10 transition-all duration-300 shadow-sm group/admit" 
              onClick={() => navigateTo('home')}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-[9px] font-black text-brand-red uppercase tracking-widest leading-none mb-1">Admission 2026</span>
              <span className="text-[11px] font-black text-brand-dark uppercase tracking-tight leading-none flex items-center gap-1.5">
                Now Open
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </span>
            </motion.div>
          </div>

          <div className="hidden lg:flex items-center bg-gray-100/95 backdrop-blur-xl border border-gray-200/60 rounded-full p-1.5 shadow-lg pointer-events-auto">
            {menuItems.map((item) => (
              <div 
                key={item.title} 
                className="group/navitem relative flex items-center gap-1 cursor-pointer px-4 py-2 rounded-full text-[13px] font-bold text-gray-600 hover:text-brand-dark hover:bg-white hover:shadow-sm transition-all duration-300"
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
                            const isActive = activeSubMenu === sub.label || sub.label === 'Registration Form';

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

          <div className="flex items-center gap-2 md:gap-3 bg-gray-100/95 backdrop-blur-xl border border-gray-200/60 rounded-full p-1.5 shadow-lg pointer-events-auto">
            <a href="tel:+918888301363" className="hidden lg:flex flex-col items-end group/phone px-4">
              <span className="text-[10px] font-bold text-gray-500 transition-colors">Call Us</span>
              <span className="text-[13px] font-black text-brand-dark flex items-center gap-1 group-hover/phone:text-brand-red transition-all">
                +91 88883 01363
              </span>
            </a>
            <motion.button 
              className="relative bg-[#2D68FF] text-white py-2.5 px-6 rounded-full font-bold text-[13px] transition-all overflow-hidden"
              onClick={() => navigateTo('registration')}
              whileHover={{ scale: 1.05, backgroundColor: '#1f56e0' }}
              whileTap={{ scale: 0.95 }}
            >
              Enroll Now
            </motion.button>
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
                <SafeImage src="/assets/Logo.png" alt="Logo" className="h-8" fallbackText="Logo" />
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
                            const isMobileActive = mobileSubExpanded === sub.label || sub.label === 'Registration Form';

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
                  className="w-full bg-brand-red text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-brand-red/20" 
                  onClick={() => { navigateTo('registration'); setMobileOpen(false); }}
                >
                  Enroll Now
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
