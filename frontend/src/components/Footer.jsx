import React, { useState } from 'react';
import SafeImage from './SafeImage';
import Chatbot from './Chatbot';

const Footer = ({ navigateTo }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const sections = {
    "ABOUT US": ["Why BK Science", "About Us", "Academics Team", "JEE/NEET E-Brochure", "Foundation E-Brochure", "Landing Page"],

    "ABOUT EXAM": ["JEE Hub", "NEET Hub", "MHT-CET", "NDA", "11th & 12th State Board", "Answer Key & Solutions"],
    "CONTACT US": ["Contact Us", "Enquiry", "Be A Partner", "Associate Consultant", "Feedback & Grevience", "Careers"],
    "USEFUL LINKS": ["Study Center", "Fee Payment", "BK Champions", "BK Science Blog", "Coaching Guidelines", "BK Science Plus Magazine"]
  };

  return (
    <footer className="bg-white border-t-8 border-brand-red pt-20 md:pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-14 right-0 text-[8rem] md:text-[14rem] leading-none font-black text-gray-50/10 pointer-events-none select-none -skew-x-12 uppercase">
        EXCELLENCE
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 mb-16">
          {Object.entries(sections).map(([title, links]) => (
            <div key={title} className="group">
              <h4 className="text-sm font-black text-brand-dark mb-6 tracking-[0.15em] border-b-2 border-brand-red inline-block pb-2 opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li 
                    key={link} 
                    onClick={() => {
                      const lower = link.toLowerCase();
                      if (lower.includes('why bk science')) navigateTo('why-bk');
                      else if (lower.includes('about us')) navigateTo('about-us');
                      else if (lower.includes('landing page')) navigateTo('landing');
                      else if (lower.includes('academics team')) navigateTo('academics-team');
                      else if (lower.includes('foundation e-brochure')) navigateTo('foundation-brochure');
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
                      else if (lower.includes('most') || lower.includes('champions')) navigateTo('most');
                      else if (lower.includes('blog')) navigateTo('blog');
                      else if (lower.includes('guidelines')) navigateTo('guidelines');
                      else if (lower.includes('magazine')) navigateTo('magazine');
                    }}
                    className="text-gray-400 font-bold hover:text-brand-red transition-all cursor-pointer flex items-center group/item text-sm"
                  >
                    <span className="w-0 group-hover/item:w-3 transition-all duration-300 overflow-hidden text-brand-red font-black">»</span>
                    <span className="group-hover/item:pl-1 transition-all duration-300">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="col-span-2 md:col-span-1 lg:col-span-1 mt-8 md:mt-0">
            <h4 className="text-sm font-black text-brand-dark mb-6 tracking-[0.15em] border-b-2 border-brand-red inline-block pb-2 uppercase whitespace-nowrap">Corporate Office</h4>
            <div className="text-gray-500 space-y-5">
              <a 
                href="https://maps.app.goo.gl/9nGy3UgMAKkGPTy88" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm group/addr"
              >
                <span className="text-lg mt-0.5 shrink-0 group-hover/addr:rotate-12 transition-transform">📍</span>
                <span className="font-bold underline decoration-brand-red/10 decoration-2 underline-offset-2 group-hover/addr:text-brand-red group-hover/addr:decoration-brand-red transition-all">
                  2nd Floor, Gajanan Plaza, Gharpure Ghat Rd, behind Lotus Capital Building, Ashok Stambh, Shivaji Nagar, Nashik, Maharashtra 422002
                </span>
              </a>
              <p className="flex items-center gap-3 text-sm">
                <span className="text-lg shrink-0">📞</span>
                <span className="font-bold">+91 88883 01363</span>
              </p>
              <div className="pt-4 flex gap-3">
                {['FB', 'TW', 'IG', 'LI', 'YT'].map((s) => (
                  <a 
                    key={s}
                    href="https://maps.app.goo.gl/9nGy3UgMAKkGPTy88" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-gray-50 rounded-lg flex items-center justify-center text-brand-dark font-black hover:bg-brand-red hover:text-white transition-all cursor-pointer text-sm shadow-sm"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <SafeImage src="/assets/Logo.png" alt="BK Science Academy" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" fallbackText="Logo" />
            <div className="h-8 w-[1px] bg-gray-200"></div>
            <p className="text-sm font-black text-gray-400">© 2026 BK SCIENCE ACADEMY.</p>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center text-xs font-black text-gray-300 tracking-[0.12em]">
            {["CSR POLICY", "PRIVACY POLICY", "REFUND RULES", "TERMS & CONDITIONS"].map((l) => (
              <span
                key={l}
                role="button"
                tabIndex={0}
                aria-label={`${l} (coming soon)`}
                title="Policy document — coming soon"
                className="cursor-pointer hover:text-brand-red transition-colors whitespace-nowrap focus-visible:text-brand-red"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-brand-red text-white flex items-center justify-center rounded-xl shadow-lg hover:scale-110 hover:bg-red-800 active:scale-95 transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" />
        </svg>
      </button>
      
      <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2 group">
        <div 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`relative cursor-pointer transition-all duration-700 ${isChatOpen ? 'scale-90 rotate-90 opacity-60' : 'hover:scale-110 active:scale-95'}`}
        >
          {/* Main Avatar Blob */}
          <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-dark rounded-2xl shadow-[0_20px_50px_-10px_rgba(30,27,75,0.4)] border-2 border-white overflow-hidden relative group-hover:shadow-[0_25px_60px_-10px_rgba(255,50,50,0.3)] transition-all">
            <div className={`absolute inset-0 bg-brand-red opacity-0 group-hover:opacity-5 transition-opacity ${isChatOpen ? 'opacity-20' : ''}`}></div>
            <SafeImage 
              src="/assets/ScholarBot.png" 
              className={`w-full h-full object-cover transition-transform duration-700 ${!isChatOpen && 'animate-float'}`} 
              fallbackText="AI" 
            />
            {/* Status Pulse */}
            {!isChatOpen && (
              <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            )}
          </div>

          {/* Hover Label — honest chatbot scope */}
          {!isChatOpen && (
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-brand-dark text-white px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] shadow-xl opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-400 whitespace-nowrap border border-white/5 pointer-events-none">
              Ask BK Assist 💬
              <div className="text-white/40 text-[8px] font-bold normal-case tracking-normal mt-0.5">Informational support only</div>
            </div>
          )}

          {/* Close Overlay when open */}
          {isChatOpen && (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/80 rounded-3xl text-white">
              <svg className="w-8 h-8 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 6v12M6 12h12" />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      <Chatbot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        navigateTo={navigateTo} 
      />

    </footer>
  );
};

export default Footer;
