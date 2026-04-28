import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SectionDivider = () => (
  <div className="py-8 md:py-10 flex justify-center">
    <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-brand-red to-transparent opacity-30"></div>
  </div>
);

const InformationPage = ({ navigateTo }) => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simple scroll spy logic
    const handleScroll = () => {
      const sections = ['about', 'objectives', 'schedule', 'eligibility', 'pattern', 'performance'];
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
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-brand-red/10 rounded-full blur-[120px]"></div>
          
          {/* Custom ASCII Art Grid Pattern */}
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
                <span className="text-[11px] font-black text-white/80 uppercase tracking-[0.3em]">Comprehensive Exam Guide</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-tighter mix-blend-overlay drop-shadow-2xl mb-8">
                JEE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500">
                  ADVANCED
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed max-w-2xl border-l-4 border-brand-red pl-6 py-2">
                The ultimate gateway to India's premier engineering institutes. Blueprint your success for the 2026 examination cycle.
              </p>
            </div>

            <div className="hidden lg:flex flex-col gap-6 text-right pb-10">
              <div className="flex flex-col items-end">
                <span className="text-5xl font-black text-white">23</span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Participating IITs</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-5xl font-black text-white">Top 2.5L</span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">JEE Main Qualifiers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout - Asymmetrical Split */}
      <div className="container mx-auto px-5 md:px-12 mt-10 md:mt-14">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-28">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Quick Navigation</h4>
            <nav className="flex flex-col gap-4">
              {[
                { id: 'about', label: 'About IITs' },
                { id: 'objectives', label: 'Primary Objectives' },
                { id: 'schedule', label: '2026 Schedule' },
                { id: 'eligibility', label: 'Eligibility Criteria' },
                { id: 'pattern', label: 'Exam Pattern' },
                { id: 'performance', label: 'Class XII Criteria' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`text-left text-sm font-bold transition-all duration-500 uppercase tracking-widest flex items-center gap-4 ${activeSection === item.id ? 'text-brand-dark scale-105' : 'text-gray-400 hover:text-brand-red'}`}
                >
                  <div className={`h-[2px] transition-all duration-500 rounded-full ${activeSection === item.id ? 'w-8 bg-brand-red' : 'w-0 bg-transparent'}`}></div>
                  {item.label}
                </button>
              ))}
            </nav>
            
            <a 
              href="https://jeeadv.ac.in/" 
              target="_blank" 
              rel="noreferrer"
              className="mt-10 inline-flex items-center justify-between w-full p-5 bg-brand-dark rounded-3xl text-white group hover:bg-brand-red transition-all duration-500"
            >
              <span className="text-xs font-black uppercase tracking-widest">Official<br/>Site</span>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </a>
          </aside>

          {/* Content Area */}
          <main className="flex-1 w-full max-w-4xl mx-auto space-y-16 md:space-y-20">
            
            {/* About IITs */}
            <motion.section id="about" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter mb-8 leading-[0.9]">The Indian <br/>Institutes of <span className="text-brand-red">Technology</span></h2>
              <div className="prose prose-lg md:prose-xl prose-gray">
                <p className="text-gray-600 font-medium leading-relaxed font-serif">
                  The Indian Institutes of Technology (IITs) are institutions of national importance established through an Act of Parliament for fostering excellence in education. There are Twenty Three IITs at present across the nation.
                </p>
                <p className="text-gray-500 leading-relaxed mt-4">
                  Over the years, IITs have created a world-class educational platform dynamically sustained through quality teaching and internationally acclaimed research. Faculty and alumni of IITs occupy key positions in academia and industry, making a considerable impact globally.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-3">
                {['Bhubaneswar', 'Mumbai', 'New Delhi', 'Dhanbad', 'Kanpur', 'Kharagpur', 'Chennai', 'Roorkee', '+ 15 More'].map((loc, i) => (
                  <span key={i} className="px-5 py-2.5 rounded-full border border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-widest hover:border-brand-red hover:text-brand-red transition-colors cursor-default">
                    {loc}
                  </span>
                ))}
              </div>
            </motion.section>

            <SectionDivider />

            {/* Objectives */}
            <motion.section id="objectives" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <svg className="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tighter">Primary Core <br/>Objectives</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  "To create an environment that encourages freedom of thought & pursuit of excellence, inculcating necessary vision & self-discipline.",
                  "To build a solid foundation of scientific & technical knowledge to prepare competent engineers.",
                  "To kindle an entrepreneurial spirit among young, talented minds.",
                  "To prepare students to become outstanding professionals contributing to nation-building."
                ].map((obj, i) => (
                  <div key={i} className="relative group bg-gray-50/50 p-8 md:p-10 rounded-[2rem] hover:bg-brand-red hover:-translate-y-2 transition-all duration-500">
                    <span className="absolute top-6 right-8 text-5xl font-black text-gray-200 group-hover:text-black/10 transition-colors">0{i+1}</span>
                    <p className="text-gray-600 font-medium text-lg leading-relaxed mt-10 group-hover:text-white transition-colors relative z-10">{obj}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <SectionDivider />

            {/* Ticket Schedule */}
            <motion.section id="schedule" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <div className="bg-brand-dark rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-brand-dark/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/30 rounded-bl-full mix-blend-overlay"></div>
                
                <h2 className="text-4xl md:text-5xl font-black mb-4 relative z-10">2026 Examination Schedule</h2>
                <p className="text-gray-400 font-medium mb-12 max-w-lg relative z-10">Organized by IIT Roorkee. Both papers are compulsory and run for a 3-hour duration.</p>

                <div className="flex flex-col gap-5 relative z-10">
                  <div className="flex flex-col md:flex-row bg-white/5 rounded-3xl overflow-hidden backdrop-blur-md border border-white/10 group hover:bg-white/10 transition-colors">
                    <div className="p-8 md:w-1/3 bg-brand-red/20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10">
                      <h3 className="text-3xl font-black text-white">Paper 1</h3>
                      <p className="text-brand-yellow font-bold uppercase tracking-widest mt-2">Compulsory</p>
                    </div>
                    <div className="p-8 md:w-2/3 flex flex-col justify-center">
                      <div className="flex items-center gap-8 mb-4">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Date</p>
                          <p className="text-2xl font-black">May 17, 2026</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Day</p>
                          <p className="text-2xl font-black">Sunday</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Timing (IST)</p>
                        <p className="text-xl font-bold font-serif text-white/80">09:00 AM — 12:00 PM</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row bg-white/5 rounded-3xl overflow-hidden backdrop-blur-md border border-white/10 group hover:bg-white/10 transition-colors">
                    <div className="p-8 md:w-1/3 bg-brand-yellow/20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10">
                      <h3 className="text-3xl font-black text-white">Paper 2</h3>
                      <p className="text-brand-yellow font-bold uppercase tracking-widest mt-2">Compulsory</p>
                    </div>
                    <div className="p-8 md:w-2/3 flex flex-col justify-center">
                      <div className="flex items-center gap-8 mb-4">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Date</p>
                          <p className="text-2xl font-black">May 17, 2026</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Day</p>
                          <p className="text-2xl font-black">Sunday</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Timing (IST)</p>
                        <p className="text-xl font-bold font-serif text-white/80">02:30 PM — 05:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <SectionDivider />

            {/* Eligibility (Editorial List) */}
            <motion.section id="eligibility" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="md:pr-12 mb-10 border-b-4 border-brand-dark pb-6">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-brand-dark tracking-tighter leading-[0.9] mb-6">Eligibility <br/>Criteria</h2>
                <div className="flex items-center gap-4">
                  <span className="w-3 h-3 bg-brand-red rounded-full"></span>
                  <p className="text-xl font-bold text-gray-500 uppercase tracking-widest">5 Mandatory Rules</p>
                </div>
              </div>

              <div className="space-y-10">
                {[
                  {
                    num: "I.",
                    title: "Performance in JEE Main",
                    desc: "Candidates must be among the top 2,50,000 successful candidates (including all categories) in the B.E./B.Tech. paper of JEE Main 2026. Includes standard category-wise distribution (GEN-EWS 10%, OBC-NCL 27%, SC 15%, ST 7.5%, OPEN 40.5%, plus 5% PwD)."
                  },
                  {
                    num: "II.",
                    title: "Age Limit Restriction",
                    desc: "Candidates should be born on or after October 1, 2001. A 5-year relaxation is applicable for SC, ST, and PwD candidates (born on or after October 1, 1996)."
                  },
                  {
                    num: "III.",
                    title: "Number of Attempts",
                    desc: "A candidate can attempt JEE Advanced a maximum of two times in two consecutive years. Strategic planning is crucial."
                  },
                  {
                    num: "IV.",
                    title: "Appearance in Class XII",
                    desc: "Must have appeared for the Class XII (or equivalent) examination for the first time in either 2025 or 2026 with Physics, Chemistry, and Mathematics as compulsory subjects."
                  },
                  {
                    num: "V.",
                    title: "Earlier Admission at IITs",
                    desc: "MUST NOT have been previously admitted to an IIT. Candidates who accepted an IIT seat by reporting to a center in the past, or whose admission was cancelled at any IIT, are strictly NOT eligible."
                  }
                ].map((crit, i) => (
                  <div key={i} className="flex gap-6 md:gap-12 relative group">
                    <div className="w-16 md:w-24 flex-shrink-0 text-right">
                      <span className="text-3xl md:text-5xl font-black text-gray-200 group-hover:text-brand-red transition-colors font-serif italic">{crit.num}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-brand-dark mb-4">{crit.title}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed font-medium">{crit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-8 rounded-[2rem] bg-amber-50 border border-amber-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-yellow"></div>
                <p className="text-amber-900 font-medium leading-relaxed italic">
                  <strong>Important Note:</strong> Candidates admitted to a preparatory course in any IIT for the first time in 2025 can appear in 2026. JoSAA 2025 seat allottees who didn't report, withdrew, or had seats cancelled before the final round remain eligible.
                </p>
              </div>
            </motion.section>

            <SectionDivider />

            {/* Pattern (Bento Grid) */}
            <motion.section id="pattern" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter mb-4">Exam Pattern</h2>
                <p className="text-xl text-gray-500 font-medium">Inside the examination architecture.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-900 text-white p-8 md:p-10 rounded-[2rem] flex flex-col justify-between shadow-xl col-span-1 md:col-span-2 lg:col-span-1 min-h-[300px]">
                  <h3 className="text-xs font-black uppercase text-brand-red tracking-widest mb-6">Execution Mode</h3>
                  <div>
                    <div className="text-5xl font-black mb-4">CBT</div>
                    <p className="text-gray-400 font-medium leading-relaxed">Conducted exclusively in Computer Based Test mode. Practice mock tests extensively on official portals to build familiarity.</p>
                  </div>
                </div>

                <div className="bg-brand-red p-8 md:p-10 rounded-[2rem] text-white flex flex-col justify-between shadow-xl min-h-[300px]">
                  <h3 className="text-xs font-black uppercase text-white/70 tracking-widest mb-6">Subject Structure</h3>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="font-bold text-xl">Physics</span>
                      <span className="font-serif italic font-medium opacity-80">Both Papers</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="font-bold text-xl">Chemistry</span>
                      <span className="font-serif italic font-medium opacity-80">Both Papers</span>
                    </li>
                    <li className="flex justify-between items-center pb-2">
                      <span className="font-bold text-xl">Maths</span>
                      <span className="font-serif italic font-medium opacity-80">Both Papers</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-gray-100 p-8 md:p-10 rounded-[2rem] flex flex-col justify-between shadow-xl min-h-[300px] hover:border-gray-300 transition-colors">
                  <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-6">Question Archetypes</h3>
                  <div className="space-y-4">
                    <p className="text-brand-dark font-black text-lg">Single & Multi Choice MCQs</p>
                    <p className="text-brand-dark font-black text-lg">Numerical Value-Based</p>
                    <p className="text-brand-dark font-black text-lg">Matching / Matrix Types</p>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs font-bold text-brand-red uppercase tracking-widest">+3 Correct / Negative Marking Applies</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <SectionDivider />

            {/* Performance */}
            <motion.section id="performance" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <div className="bg-gradient-to-br from-brand-dark to-slate-900 rounded-[3rem] p-8 md:p-16 text-white text-center shadow-2xl relative">
                <div className="absolute top-10 left-10 text-brand-red opacity-20">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black mb-8 relative z-10">Board Examination Threshold</h2>
                <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto mb-10 relative z-10">
                  Cracking the JEE Advanced isn't enough. You must also satisfy at least ONE of the following Class XII aggregate thresholds:
                </p>

                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-brand-red hover:border-brand-red transition-all duration-500 cursor-default group">
                    <div className="text-6xl font-black text-white mb-4">75%</div>
                    <p className="text-lg font-bold">Aggregate Marks</p>
                    <p className="text-sm font-medium text-white/60 mt-2 group-hover:text-white/90">65% minimum for SC/ST/PwD candidates</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-brand-yellow hover:border-brand-yellow transition-all duration-500 cursor-default group">
                    <div className="text-6xl font-black text-white group-hover:text-brand-dark mb-4 drop-shadow-lg">Top 20</div>
                    <p className="text-lg font-bold group-hover:text-brand-dark">Percentile Bracket</p>
                    <p className="text-sm font-medium text-white/60 mt-2 group-hover:text-brand-dark/70">Category-wise in respective Class XII board</p>
                  </div>
                </div>
              </div>
            </motion.section>
            
          </main>
        </div>
      </div>
    </div>
  );
};

export default InformationPage;
