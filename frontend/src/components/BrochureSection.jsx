import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, Sparkles, Eye, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const BrochureSection = ({ navigateTo }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // Trigger download or navigate to counseling/enquiry
    setTimeout(() => {
      setDownloading(false);
      if (navigateTo) {
        navigateTo('counseling');
      }
    }, 1000);
  };

  const highlights = [
    "Complete JEE, NEET & MHT-CET Syllabus Matrix",
    "Detailed Course Fee Structure & Installment Options",
    "BK-SAT Scholarship & Cash Reward Schemes",
    "Faculty Profiles & Expert Teaching Methodology"
  ];

  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-brand-red/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="bg-brand-dark text-white rounded-3xl md:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden border border-white/10">
          
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-brand-red/30 via-brand-yellow/10 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-red/10 rounded-tr-full pointer-events-none"></div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-brand-yellow text-xs font-black uppercase tracking-widest">
                <BookOpen size={14} className="animate-pulse" />
                <span>Academic Prospectus 2026-27</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-white">
                Download Official <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-300 to-brand-red">
                  BK Science Academy Brochure
                </span>
              </h2>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
                Get complete insight into our top-rank preparation strategies, batch schedules, scholarship tests, and mentorship programs for JEE (Main & Advanced), NEET, MHT-CET, and Foundation courses.
              </p>

              {/* Highlights List */}
              <div className="space-y-3 pt-2">
                {highlights.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-center gap-3 text-slate-200 text-sm md:text-base font-semibold"
                  >
                    <CheckCircle2 size={18} className="text-brand-yellow shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="px-8 py-4 bg-brand-red hover:bg-[#a00000] text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-lg shadow-brand-red/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 group"
                >
                  <Download size={18} className={`${downloading ? 'animate-bounce' : 'group-hover:translate-y-0.5'} transition-transform`} />
                  <span>{downloading ? 'Preparing Brochure...' : 'Download Brochure'}</span>
                </button>

                <button
                  onClick={() => navigateTo ? navigateTo('counseling') : null}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center gap-2 hover:border-brand-yellow"
                >
                  <span>Request on WhatsApp</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Mockup Graphic */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-[3/4] group">
                
                {/* Glow ring behind mockup */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/40 via-brand-yellow/30 to-amber-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>

                {/* Brochure Mockup Frame */}
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-900 group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src="/assets/brochure_cover.png" 
                    alt="BK Science Academy Brochure" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/Logo.png";
                    }}
                  />

                  {/* Glass Banner Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-brand-red/20 text-brand-yellow">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-wider text-white">Official Prospectus</div>
                        <div className="text-[10px] text-slate-400 font-bold">PDF Format • 2026-27 Edition</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-brand-yellow bg-brand-yellow/10 px-2 py-1 rounded-md border border-brand-yellow/20">FREE</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BrochureSection;
