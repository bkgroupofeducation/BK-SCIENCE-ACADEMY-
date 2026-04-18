import React, { useState, useEffect } from 'react';

const AssociateConsultant = ({ navigateTo }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  const perks = [
    { title: "Brand Legacy", desc: "Associate with one of the most trusted names in science education.", icon: "🏛️" },
    { title: "Unrivaled Support", desc: "Get full academic and marketing support from our corporate office.", icon: "🤝" },
    { title: "Lucrative Growth", desc: "Competitive incentive structures for student enrollment and center growth.", icon: "📈" },
    { title: "Direct Tech Access", desc: "Use our proprietary LMS and AI-powered learning tools.", icon: "💻" }
  ];

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* --- HERO --- */}
      <section className="relative pt-40 pb-32 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark to-brand-dark"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-1 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full text-brand-yellow text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-fade-up">
            Strategic Partnership Program
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter mb-8 uppercase animate-fade-up stagger-1">
            Become an <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500">Associate Consultant</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-3xl mx-auto mb-16 animate-fade-up stagger-2 leading-relaxed">
            Expand your consultancy horizons by partnering with BK Science Academy. We provide the tools; you provide the vision.
          </p>
        </div>
      </section>

      {/* --- WHY PARTNER --- */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter leading-none mb-10">
                Why Partner with <br /><span className="text-brand-red">BK Science?</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {perks.map((perk, i) => (
                  <div key={i} className="group p-8 bg-white rounded-3xl border border-gray-100 hover:border-brand-red/20 transition-all duration-500 shadow-xl shadow-gray-200/20">
                    <div className="text-4xl mb-6">{perk.icon}</div>
                    <h3 className="text-lg font-black text-brand-dark uppercase tracking-tight mb-3">{perk.title}</h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">{perk.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
               <div className="absolute -inset-4 bg-brand-red/10 rounded-[4rem] blur-2xl"></div>
               <div className="relative bg-white p-10 md:p-16 rounded-[3.5rem] shadow-3xl border border-gray-100">
                  {formStatus === 'success' ? (
                    <div className="text-center py-20 animate-topic-pop">
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-5xl mx-auto mb-8 animate-bounce">✓</div>
                        <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tighter mb-4">Application Sent!</h3>
                        <p className="text-gray-500 font-medium italic">Our partnership lead will contact you within 24 hours.</p>
                        <button onClick={() => setFormStatus('idle')} className="mt-10 text-brand-red font-black text-xs uppercase tracking-widest border-b-2 border-brand-red">Send Another</button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tighter mb-8 leading-none">
                        Drop Your <span className="text-brand-red">Credentials</span>
                      </h3>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                            <input required type="text" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-red outline-none font-bold text-sm" placeholder="e.g. John Doe" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Number</label>
                            <input required type="tel" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-red outline-none font-bold text-sm" placeholder="+91 XXX XXX XXXX" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                          <input required type="email" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-red outline-none font-bold text-sm" placeholder="consultant@domain.com" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Profession</label>
                          <select className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-red outline-none font-bold text-sm appearance-none">
                            <option>Education Consultant</option>
                            <option>School Administrator</option>
                            <option>Coaching Professional</option>
                            <option>Entrepreneur</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Brief Description (Optional)</label>
                          <textarea className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-red outline-none font-bold text-sm h-32 resize-none" placeholder="Tell us about your experience..."></textarea>
                        </div>
                        <button 
                          disabled={formStatus === 'submitting'}
                          type="submit" 
                          className="w-full py-6 bg-brand-red text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-xl shadow-brand-red/20 active:scale-95 transition-all hover:bg-brand-dark"
                        >
                          {formStatus === 'submitting' ? 'Processing...' : 'Submit Partnership Query'}
                        </button>
                      </form>
                    </>
                  )}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VISION QUOTE --- */}
      <section className="py-32 text-center bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto border-y-2 border-gray-100 py-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter leading-none mb-8 italic">
              "Excellence is never an accident; it is always the result of high intention, sincere effort, and intelligent execution."
            </h2>
            <div className="text-brand-red font-black text-sm uppercase tracking-[0.3em]">BK Science Corporate Office</div>
          </div>
        </div>
      </section>

      {/* --- FINAL BANNER --- */}
      <div className="bg-brand-red py-8 text-center text-white">
        <span className="text-sm font-black uppercase tracking-[0.5em]">Partnering for a Scientific India • BK Science Academy</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fade-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        @keyframes topic-pop { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-topic-pop { animation: topic-pop 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}} />
    </div>
  );
};

export default AssociateConsultant;
