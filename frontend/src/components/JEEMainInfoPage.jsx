import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SectionDivider = () => (
  <div className="py-8 md:py-10 flex justify-center">
    <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-brand-red to-transparent opacity-30"></div>
  </div>
);

const JEEMainInfoPage = ({ navigateTo }) => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      const sections = ['about', 'schedule', 'eligibility', 'pattern', 'criteria', 'points'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-brand-red selection:text-white pb-16">
      
      {/* Editorial Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-[#0a0a0a] pt-20 overflow-hidden rounded-b-[4rem] md:rounded-b-[6rem] mx-2 md:mx-6 shadow-2xl">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-brand-red/10 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="container mx-auto px-5 md:px-12 relative z-10 w-full">
          <div className="flex flex-col md:flex-row items-end justify-between gap-10">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-8 border border-white/10 w-max px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red"></span>
                </span>
                <span className="text-[11px] font-black text-white/80 uppercase tracking-[0.3em]">National Testing Agency</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[1.05] tracking-tighter mix-blend-overlay drop-shadow-2xl mb-8">
                JEE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-orange-500">
                  MAIN
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed max-w-2xl border-l-4 border-brand-yellow pl-6 py-2">
                Your gateway to NITs, IIITs, and CFTIs. Start your journey toward India's top engineering excellence with the 2026 examination cycle.
              </p>
            </div>

            <div className="hidden lg:flex flex-col gap-6 text-right pb-10">
              <div className="flex flex-col items-end">
                <span className="text-5xl font-black text-white">31</span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Participating NITs</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-5xl font-black text-white">Top 2.5L</span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Advanced Qualifiers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="container mx-auto px-5 md:px-12 mt-10 md:mt-14">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* Sticky Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-28">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Exam Guide</h4>
            <nav className="flex flex-col gap-4">
              {[
                { id: 'about', label: 'About JEE Main' },
                { id: 'schedule', label: '2026 Schedule' },
                { id: 'eligibility', label: 'Eligibility' },
                { id: 'pattern', label: 'Exam Pattern' },
                { id: 'criteria', label: 'Admission Criteria' },
                { id: 'points', label: 'Important Points' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`text-left text-sm font-bold transition-all duration-500 uppercase tracking-widest flex items-center gap-4 ${activeSection === item.id ? 'text-brand-dark scale-105' : 'text-gray-400 hover:text-brand-red'}`}
                >
                  <div className={`h-[2px] transition-all duration-500 rounded-full ${activeSection === item.id ? 'w-8 bg-brand-yellow' : 'w-0 bg-transparent'}`}></div>
                  {item.label}
                </button>
              ))}
            </nav>
            
            <a 
              href="https://jeemain.nta.nic.in/" 
              target="_blank" 
              rel="noreferrer"
              className="mt-10 inline-flex items-center justify-between w-full p-5 bg-brand-dark rounded-3xl text-white group hover:bg-brand-red transition-all duration-500 shadow-xl shadow-brand-dark/10"
            >
              <span className="text-xs font-black uppercase tracking-widest text-left">Official<br/>NTA Site</span>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </a>
          </aside>

          {/* Content Area */}
          <main className="flex-1 w-full max-w-4xl mx-auto space-y-16 md:space-y-20">
            
            {/* About JEE Main */}
            <motion.section id="about" className="scroll-mt-32" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter mb-8 leading-[1.1]">National Testing <br/>Agency: <span className="text-brand-yellow">JEE Main</span></h2>
              <div className="prose prose-lg md:prose-xl prose-gray max-w-none">
                <p className="text-gray-600 font-medium leading-relaxed font-serif">
                  The Joint Entrance Examination (JEE-Main) is conducted by the National Testing Agency (NTA). It is the premier gateway for admission into undergraduate engineering programs (B.E./B.Tech) at NITs, IIITs, and other Centrally Funded Technical Institutions (CFTIs).
                </p>
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="font-black text-brand-dark uppercase text-xs tracking-widest mb-3">Gateway to Advanced</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">JEE Main is also an eligibility test for JEE Advanced, the examination for admission into the prestigious IITs.</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="font-black text-brand-dark uppercase text-xs tracking-widest mb-3">Two Sessions</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Conducted usually in two sessions (January and April) to give candidates two opportunities to improve their scores.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            <SectionDivider />

            {/* Schedule */}
            <motion.section id="schedule" className="scroll-mt-32" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-full bg-brand-yellow/10 flex items-center justify-center flex-shrink-0 border border-brand-yellow/20">
                  <svg className="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tighter leading-[1.1]">2026 Examination <br/>Cycle Schedule</h2>
              </div>
              
              <div className="grid gap-6">
                <div className="relative group overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-lg p-8 md:p-12 hover:border-brand-yellow transition-all duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 rounded-bl-full group-hover:bg-brand-yellow/10 transition-colors"></div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                      <span className="px-4 py-1.5 bg-brand-dark text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 inline-block">Session 01</span>
                      <h3 className="text-3xl font-black text-brand-dark">January 2026</h3>
                      <p className="text-gray-500 font-medium mt-2 italic font-serif">Registration: Oct 28 - Nov 22, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Exam Dates</p>
                      <p className="text-2xl font-black text-brand-red">Jan 22 — 31, 2026</p>
                      <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Result: Feb 12, 2026</p>
                    </div>
                  </div>
                </div>

                <div className="relative group overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-lg p-8 md:p-12 hover:border-brand-yellow transition-all duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full group-hover:bg-orange-500/10 transition-colors"></div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                      <span className="px-4 py-1.5 bg-brand-dark text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 inline-block">Session 02</span>
                      <h3 className="text-3xl font-black text-brand-dark">April 2026</h3>
                      <p className="text-gray-500 font-medium mt-2 italic font-serif">Registration: Feb 02 - Mar 02, 2026</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Exam Dates</p>
                      <p className="text-2xl font-black text-brand-red">Apr 01 — 08, 2026</p>
                      <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Result: Mid April 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <SectionDivider />

            {/* Eligibility */}
            <motion.section id="eligibility" className="scroll-mt-32" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="mb-10 border-b-4 border-brand-dark pb-6">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-brand-dark tracking-tighter leading-[1.1] mb-6">Eligibility <br/>Landscape</h2>
                <div className="flex items-center gap-4">
                  <span className="w-3 h-3 bg-brand-yellow rounded-full"></span>
                  <p className="text-xl font-bold text-gray-500 uppercase tracking-widest">Universal Standards</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                    <h4 className="text-xs font-black text-brand-red uppercase tracking-widest mb-3">Age Limit</h4>
                    <p className="text-xl font-black text-brand-dark mb-4 group-hover:text-brand-red transition-colors">No Age Restrictions</p>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">For appearing in the JEE (Main) 2026, there is no age limit for the candidates. Candidates of any age can apply.</p>
                  </div>
                  <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                    <h4 className="text-xs font-black text-brand-red uppercase tracking-widest mb-3">Qualifying Examination</h4>
                    <p className="text-xl font-black text-brand-dark mb-4 group-hover:text-brand-red transition-colors">Class XII Equivalent</p>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">Passed Class 12th or equivalent exam in 2024, 2025 or appearing in 2026. Mathematics, Physics, and Chemistry are primary requirements.</p>
                  </div>
                </div>
                
                <div className="space-y-6 md:mt-8">
                  <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                    <h4 className="text-xs font-black text-brand-red uppercase tracking-widest mb-3">Attempt Limit</h4>
                    <p className="text-xl font-black text-brand-dark mb-4 group-hover:text-brand-red transition-colors">3 Consecutive Years</p>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">Candidates can appear for JEE Main for 3 consecutive years from the year of passing Class 12th. (Total 6 attempts possible).</p>
                  </div>
                  <div className="p-8 bg-brand-dark text-white rounded-[2rem] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/20 rounded-bl-full"></div>
                    <h4 className="text-xs font-black text-brand-yellow uppercase tracking-widest mb-3">Subject Mandatory</h4>
                    <p className="text-lg font-bold mb-4">Paper 1 (B.E./B.Tech)</p>
                    <ul className="text-xs space-y-2 text-gray-300 font-bold uppercase tracking-widest">
                      <li className="flex items-center gap-2"><span className="w-1 h-1 bg-brand-yellow rounded-full"></span> Physics</li>
                      <li className="flex items-center gap-2"><span className="w-1 h-1 bg-brand-yellow rounded-full"></span> Mathematics</li>
                      <li className="flex items-center gap-2"><span className="w-1 h-1 bg-brand-yellow rounded-full"></span> One of: Chem / Bio / Biotech</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            <SectionDivider />

            {/* Exam Pattern */}
            <motion.section id="pattern" className="scroll-mt-32" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <div className="bg-gray-900 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                
                <h2 className="text-4xl md:text-5xl font-black mb-8 text-center">Examination Pattern</h2>
                
                <div className="grid gap-6">
                  {[
                    { paper: "Paper 1", type: "B.E. / B.Tech", subjects: "Physics, Chemistry, Maths", mode: "CBT", duration: "3 Hours" },
                    { paper: "Paper 2A", type: "B.Arch", subjects: "Maths, Aptitude, Drawing", mode: "CBT + Offline", duration: "3 Hours" },
                    { paper: "Paper 2B", type: "B.Planning", subjects: "Maths, Aptitude, Planning", mode: "CBT", duration: "3 Hours" }
                  ].map((p, i) => (
                    <div key={i} className="flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 hover:bg-white/10 transition-colors">
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <span className="text-brand-yellow text-[10px] font-black uppercase tracking-widest">{p.paper}</span>
                        <h4 className="text-xl font-black mt-1">{p.type}</h4>
                      </div>
                      <div className="md:w-1/2 mb-4 md:mb-0">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Subjects</p>
                        <p className="text-gray-200 font-medium">{p.subjects}</p>
                      </div>
                      <div className="md:w-1/4 text-right">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Duration / Mode</p>
                        <p className="text-white font-bold">{p.duration} • <span className="text-brand-yellow">{p.mode}</span></p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Total Questions</p>
                    <p className="text-3xl font-black text-white">90 <span className="text-xs text-gray-400 font-medium">Attempt 75</span></p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Maximum Marks</p>
                    <p className="text-3xl font-black text-brand-yellow">300</p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Negative Marking</p>
                    <p className="text-3xl font-black text-brand-red">-1 <span className="text-xs text-gray-400 font-medium">Correct +4</span></p>
                  </div>
                </div>
              </div>
            </motion.section>

            <SectionDivider />

            {/* Admission Criteria */}
            <motion.section id="criteria" className="scroll-mt-32" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="bg-brand-red rounded-[3rem] p-8 md:p-16 text-white relative shadow-2xl">
                <div className="absolute top-10 right-10 opacity-10">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-[1.1]">NITs / IIITs / GFTIs <br/><span className="text-brand-dark">Admission Criteria</span></h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                    <div className="text-6xl font-black mb-4">75%</div>
                    <p className="text-xl font-bold mb-2">Class XII Aggregate</p>
                    <p className="text-sm text-white/70 font-medium italic">65% for SC/ST/PwD candidates</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 flex flex-col justify-center">
                    <h4 className="text-2xl font-black mb-3 italic font-serif">Top 20 Percentile</h4>
                    <p className="text-sm text-white/70 leading-relaxed font-medium">Or be in the category-wise top 20 percentile of successful candidates in their respective Class XII boards.</p>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs font-black uppercase tracking-widest text-brand-yellow">Note: Criteria must be met for final seat allotment.</p>
                </div>
              </div>
            </motion.section>

            <SectionDivider />

            {/* Important Points */}
            <motion.section id="points" className="scroll-mt-32" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <div className="bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-inner">
                <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-8 tracking-tighter">Crucial <br/>Examination <span className="text-brand-red">Points</span></h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    "Best of two scores (Jan & April) will be considered for final AIR ranking.",
                    "Paper 2 for B.Arch/Planning is mandatory if seeking architecture admission.",
                    "Numerical Value Questions also carry negative marking for wrong answers.",
                    "Scorecards and AIR are released after the final session in April.",
                    "CBT mode requires familiarization with the virtual calculator/interface.",
                    "Strict prohibition of calculators, watches, electronics, and jewelry."
                  ].map((p, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-brand-yellow flex-shrink-0 flex items-center justify-center text-brand-dark font-black text-[10px]">!</div>
                      <p className="text-sm text-gray-600 font-bold leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default JEEMainInfoPage;
