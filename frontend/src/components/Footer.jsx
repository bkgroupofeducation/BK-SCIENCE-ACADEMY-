import React, { useState, useEffect } from 'react';
import SafeImage from './SafeImage';

// Custom Social Icons since Lucide version might missing brand icons
const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const YoutubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
);

const Footer = ({ navigateTo, onOpenChat, isChatOpen }) => {
  const [showInitialPopup, setShowInitialPopup] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);
  const [visitorCount, setVisitorCount] = useState(null);

  const sections = {
    "ABOUT US": ["About Us", "Academics Team", "Study Center"],
    "JEE EXAMS": ["JEE Main Info", "JEE Advanced Info", "JEE Hub"],
    "MEDICAL & MORE": ["NEET Hub", "MHT-CET", "NDA"],
    "CONTACT US": ["Contact Us", "Enquiry", "Feedback & Grevience", "JEE/NEET E-Brochure"]
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollRotation(window.scrollY / 5);
    };
    window.addEventListener('scroll', handleScroll);

    const timer = setTimeout(() => {
      setShowInitialPopup(true);
    }, 5000);

    // Visitor counter - increment once per session
    const hasVisited = sessionStorage.getItem('bk_visited');
    if (!hasVisited) {
      fetch('/api/visitors/increment', { method: 'POST' })
        .then(res => res.json())
        .then(data => { if (data.success) { setVisitorCount(data.count); sessionStorage.setItem('bk_visited', '1'); } })
        .catch(() => {});
    } else {
      fetch('/api/visitors')
        .then(res => res.json())
        .then(data => { if (data.success) setVisitorCount(data.count); })
        .catch(() => {});
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <footer className="bg-brand-dark pt-20 pb-12 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red/5 rounded-full blur-[100px]"></div>
      
      <div className="absolute top-20 right-0 text-[10rem] md:text-[20rem] leading-none font-black text-white/[0.02] pointer-events-none select-none uppercase">
        ACADEMY
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 mb-16">
          {Object.entries(sections).map(([title, links]) => (
            <div key={title} className="group">
              <h4 className="text-[12px] font-black text-white mb-8 tracking-[0.2em] border-b border-white/10 inline-block pb-2 opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li 
                    key={link} 
                    onClick={() => {
                      const lower = link.toLowerCase();
                      if (lower.includes('about us')) navigateTo('about-us');
                      else if (lower.includes('academics team')) navigateTo('academics-team');
                      else if (lower.includes('jee main info')) navigateTo('jee-main');
                      else if (lower.includes('jee advanced info')) navigateTo('jee-advanced');
                      else if (lower.includes('jee')) navigateTo('jee-hub');
                      else if (lower.includes('neet')) navigateTo('neet-hub');
                      else if (lower.includes('cet')) navigateTo('cet');
                      else if (lower.includes('nda')) navigateTo('nda');
                      else if (lower.includes('board')) navigateTo('boards');
                      else if (lower.includes('registration')) navigateTo('registration');
                      else if (lower.includes('fee payment')) navigateTo('pay-fee');
                      else if (lower.includes('feedback') || lower.includes('grievance')) navigateTo('grievance');
                      else if (lower.includes('admission')) navigateTo('admission');
                      else if (lower.includes('scholarship')) navigateTo('residential');
                      else if (lower.includes('center') || lower.includes('office')) navigateTo('study-center');
                      else if (lower.includes('contact')) navigateTo('contact');
                      else if (lower.includes('enquiry')) navigateTo('enquiry');
                      else if (lower.includes('associate consultant')) navigateTo('associate-consultant');
                      else if (lower.includes('admin login')) navigateTo('admin');
                      else if (lower.includes('careers')) navigateTo('careers');
                      else if (lower.includes('blog')) navigateTo('blog');
                      else if (lower.includes('guidelines')) navigateTo('guidelines');
                    }}
                    className="text-gray-500 font-bold hover:text-brand-red transition-all cursor-pointer flex items-center group/item text-[13px] uppercase tracking-wider"
                  >
                    <span className="w-0 group-hover/item:w-4 transition-all duration-300 overflow-hidden text-brand-red font-black">→</span>
                    <span className="group-hover/item:pl-1 transition-all duration-300">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="col-span-2 md:col-span-2 lg:col-span-1 mt-8 lg:mt-0">
            <h4 className="text-sm font-black text-brand-dark mb-6 tracking-[0.15em] border-b-2 border-brand-red inline-block pb-2 uppercase whitespace-nowrap">Our Locations</h4>
            <div className="text-gray-500">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 md:gap-6">
                {/* Registered Office */}
                <div className="pr-2">
                  <h5 className="text-[9px] font-black text-brand-red mb-1 uppercase tracking-tight">Registered Office</h5>
                  <a 
                    href="https://maps.app.goo.gl/9nGy3UgMAKkGPTy88" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-1.5 text-[11px] group/addr"
                  >
                    <span className="text-sm mt-0.5 shrink-0 group-hover/addr:rotate-12 transition-transform">📍</span>
                    <span className="font-bold leading-tight underline decoration-brand-red/10 decoration-1 underline-offset-2 group-hover/addr:text-brand-red group-hover/addr:decoration-brand-red transition-all">
                      Gajanan Plaza, Ashok Stambh, Nashik 422002
                    </span>
                  </a>
                </div>

                {/* Branch */}
                <div className="pl-2 border-l border-white/5">
                  <h5 className="text-[9px] font-black text-brand-red mb-1 uppercase tracking-tight">Branch</h5>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=New+Patkar+Plaza,+Bhaji+Market,+Dombivli+East,+Maharashtra+421201" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-1.5 text-[11px] group/addr"
                  >
                    <span className="text-sm mt-0.5 shrink-0 group-hover/addr:rotate-12 transition-transform">📍</span>
                    <span className="font-bold leading-tight underline decoration-brand-red/10 decoration-1 underline-offset-2 group-hover/addr:text-brand-red group-hover/addr:decoration-brand-red transition-all">
                      Patkar Plaza, Ramnagar, Dombivli East 421201
                    </span>
                  </a>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <a 
                  href="tel:+918888301363" 
                  className="flex flex-nowrap items-center gap-2 sm:gap-3 text-sm group/phone hover:text-brand-red transition-colors pt-2"
                >
                  <span className="text-lg shrink-0 group-hover/phone:scale-110 transition-transform">📞</span>
                  <span className="font-bold whitespace-nowrap text-[13px] sm:text-sm">+91 88883 01363</span>
                </a>
                <a 
                  href="mailto:bkgroupofeducation@gmail.com" 
                className="flex flex-nowrap items-center gap-2 sm:gap-3 text-sm group/mail hover:text-brand-red transition-colors pt-1"
              >
                <span className="text-lg shrink-0 group-hover/mail:scale-110 transition-transform">✉️</span>
                <span className="font-bold whitespace-nowrap text-[13px] sm:text-sm">bkgroupofeducation@gmail.com</span>
              </a>
              <div className="pt-4 flex gap-3">
                {[
                  { Icon: FacebookIcon, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61587514520659' },
                  { Icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/bkscienceacademy/' },
                  { Icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/company/108660164/admin/dashboard/' },
                  { Icon: YoutubeIcon, label: 'YouTube', href: 'https://www.youtube.com/@BKScienceAcademy' }
                ].map((s) => (
                  <a 
                    key={s.label}
                    href={s.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-red hover:text-white transition-all cursor-pointer shadow-sm group/social"
                    aria-label={s.label}
                  >
                    <s.Icon size={20} className="transition-transform group-hover/social:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-5">
              <div 
                className="cursor-pointer active:scale-95 transition-all" 
                onClick={() => navigateTo('home')}
                title="Go to Home"
              >
                <SafeImage src="/assets/bk.png" alt="BK Science Academy" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" fallbackText="Logo" />
              </div>
              <div className="h-8 w-[1px] bg-gray-200"></div>
              <p className="text-sm font-black text-gray-400">© 2009 BK SCIENCE ACADEMY.</p>
            </div>

            {/* Visitor Counter */}
            <div className="flex items-center gap-2.5 px-4 py-2 bg-white/10 rounded-lg border border-white/15">
              <div className="relative">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xs font-black text-white tracking-wide">{visitorCount !== null ? visitorCount.toLocaleString() : '...'}</span>
              <span className="text-[8px] font-black uppercase text-gray-500 tracking-widest">Visitors</span>
            </div>

            {/* Phone Number */}
            <a 
              href="tel:+918888301363" 
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/15 hover:bg-brand-red/20 hover:border-brand-red/30 transition-all group"
            >
              <span className="text-sm group-hover:scale-110 transition-transform">📞</span>
              <span className="text-xs font-black text-white tracking-wide">+91 88883 01363</span>
            </a>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center text-xs font-black text-gray-300 tracking-[0.12em]">
            {["CSR POLICY", "PRIVACY POLICY", "REFUND RULES", "TERMS & CONDITIONS"].map((l) => (
              <span
                key={l}
                role="button"
                tabIndex={0}
                aria-label={l}
                onClick={() => navigateTo(l)}
                className="cursor-pointer hover:text-brand-red transition-colors whitespace-nowrap focus-visible:text-brand-red"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile-Only Floating Free Counseling Button */}
      <div className="md:hidden fixed bottom-6 left-6 z-50">
        <button 
          onClick={() => navigateTo('counseling')}
          className="bg-brand-red text-white px-5 py-2.5 rounded-full shadow-2xl border-2 border-white flex items-center gap-2 active:scale-95 transition-all animate-fade-up"
        >
          <span className="text-base">📋</span>
          <span className="font-black uppercase tracking-widest text-[10px]">Free Counseling</span>
        </button>
      </div>

      {/* Scroll to Top */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        aria-label="Scroll to top"
        style={{ transform: `rotate(${scrollRotation}deg)` }}
        className="fixed bottom-4 left-4 z-50 w-10 h-10 md:w-12 md:h-12 bg-brand-red text-white flex items-center justify-center rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" />
        </svg>
      </button>
      
      {/* Floating Chatbot */}
      <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3 group">
        {showInitialPopup && !isChatOpen && (
          <div className="mb-1 animate-bounce-subtle">
            <div className="bg-white border border-brand-red/20 shadow-2xl px-3 py-1.5 md:px-4 md:py-2 rounded-xl relative group/popup cursor-pointer" onClick={() => { onOpenChat(); setShowInitialPopup(false); }}>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowInitialPopup(false); }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-dark text-white rounded-full flex items-center justify-center text-[8px] opacity-0 group-hover/popup:opacity-100 transition-opacity"
              >✕</button>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse"></div>
                <p className="text-brand-dark font-black text-[10px] uppercase tracking-wider">Ask me anything!</p>
              </div>
              <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-white border-r border-b border-brand-red/20 rotate-45"></div>
            </div>
          </div>
        )}

        <div 
          onClick={() => { onOpenChat(); setShowInitialPopup(false); }}
          className="relative cursor-pointer transition-all duration-700 hover:scale-110 active:scale-95"
        >
          {/* Circular Bot Image with Border and Dash effect */}
          <div className="w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center group/bot">
            {/* Outer dashed border effect */}
            <div className="absolute inset-[-6px] rounded-full border-2 border-dashed border-white/30 animate-spin-slow"></div>
            
            {/* Glow/Shadow */}
            <div className="absolute inset-0 bg-brand-red/30 rounded-full blur-xl opacity-40 group-hover/bot:opacity-70 transition-opacity"></div>
            
            {/* The Circle with Image */}
            <div className="relative w-full h-full rounded-full border-2 md:border-4 border-white shadow-2xl overflow-hidden z-10 transition-transform duration-700">
               <SafeImage 
                 src="/assets/GirlBot.png" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover/bot:scale-110"
                 fallbackText="AI" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Talk Now! Button */}
            <div className="absolute -bottom-1 -right-2 z-20 bg-amber-400 text-brand-dark px-2.5 py-1 rounded-xl shadow-xl border border-white transform group-hover/bot:scale-110 transition-all duration-500">
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tight">Talk Now!</span>
            </div>

            {/* Online Status Indicator */}
            <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white z-30 shadow-lg">
              <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
