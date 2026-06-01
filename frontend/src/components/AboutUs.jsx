import React from 'react';
import { Sparkles, Handshake, Rocket, Heart } from 'lucide-react';
import SafeImage from './SafeImage';

const AboutUs = ({ navigateTo }) => {
  return (
    <div className="bg-white">

      {/* Academic Qualifications - OPTIMIZED SPACING */}
      <section className="pt-32 pb-12 bg-brand-dark relative overflow-hidden rounded-[3rem] mx-4 md:mx-8 mb-8 shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-[120px]"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase">Secretary's Desk</h2>
            <div className="w-20 h-1 bg-brand-red mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Profile Card */}
            <div className="lg:col-span-4 animate-fade-up">
              <div className="bg-white p-6 rounded-[3rem] shadow-2xl border border-gray-100 text-center sticky top-32">
                <div className="relative mb-8 group">
                  <div className="absolute inset-0 bg-brand-red rounded-[2.5rem] rotate-6 scale-95 opacity-10 group-hover:rotate-12 transition-transform duration-500"></div>
                  <div className="relative z-10 rounded-[2.5rem] overflow-hidden aspect-square border-4 border-white shadow-xl">
                    <SafeImage 
                      src="/assets/Founder.jpeg" 
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                      fallbackText="Dr. Bhagwan Nivrutti Elmame" 
                    />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-brand-dark mb-2 uppercase leading-tight">
                  Dr. Adv. Er. Bhagwan Nivrutti Yelmame
                </h3>
                <div className="text-brand-red font-black text-xs uppercase tracking-[0.3em] mb-4">Secretary</div>
                <div className="w-12 h-0.5 bg-gray-200 mx-auto mb-6"></div>
                <p className="text-black text-sm font-black uppercase tracking-wider">
                  <span className="text-brand-red">BK</span> Educational And Welfare Society
                </p>
              </div>
            </div>

            {/* Qualifications Grid */}
            <div className="lg:col-span-8 grid grid-cols-2 gap-3 md:gap-6">
              {[
                {
                  title: "Master's Degrees",
                  icon: "🎓",
                  items: [
                    "MBA (Financial Management)",
                    "MBA (Marketing Management)",
                    "LL.M – Master of Laws",
                    "M.Com – Costing",
                    "MA (Economics)",
                    "MA (Public Administration)",
                    "MA (Rural Development)",
                    "MA (Sociology)",
                    "M.Lib & I.Sc – Master of Library & Information Sci.",
                    "MCJ – Master of Communication & Journalism"
                  ]
                },
                {
                  title: "NET / SET (UGC)",
                  icon: "✅",
                  items: [
                    "UGC-NET (Public Administration)",
                    "UGC-NET (Law)",
                    "UGC-NET (Commerce)",
                    "UGC-NET (Economics)",
                    "UGC-NET (Library and Information Science)",
                    "UGC-SET (Management)",
                    "UGC-SET (Journalism & Mass Communication)"
                  ]
                },
                {
                  title: "Bachelor's Degrees & Diplomas",
                  icon: "📜",
                  items: [
                    "LL.B – Bachelor of Laws",
                    "B.Com – Costing",
                    "B.Lib & I.Sc – Bachelor of Library & Information Sci.",
                    "GDC&A – Government Diploma in Cooperation & A/c",
                    "DTL – Diploma in Taxation Laws",
                    "DME – Diploma in Mechanical Engineering"
                  ]
                },
                {
                  title: "Doctoral Degrees",
                  icon: "💎",
                  items: [
                    "Ph.D. (Management) – Completed",
                    "Ph.D. (Law) – Pursuing"
                  ]
                }
              ].map((cat, i) => (
                <div 
                  key={i} 
                  className="bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-lg border border-gray-50 hover:border-brand-red/20 transition-all duration-300 animate-fade-up group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 mb-4 md:mb-6 text-center md:text-left">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-inner group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <h4 className="text-[10px] md:text-base font-black text-brand-dark uppercase tracking-wider leading-tight">
                      {cat.title}
                    </h4>
                  </div>
                  <ul className="space-y-2 md:space-y-3">
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 md:gap-3 group/item">
                        <span className="mt-1.5 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-brand-red group-hover/item:scale-150 transition-transform shrink-0"></span>
                        <span className="text-[9px] md:text-sm font-medium text-gray-600 leading-tight">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Organizations - TIGHT LAYOUT */}
      <section className="pt-8 pb-12 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-8 animate-fade-up">
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-2 uppercase tracking-tighter leading-none">
              Our Group of <span className="text-brand-red">Organizations</span>
            </h2>
            <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-xs md:text-sm">Diversifying Excellence Across Sectors</p>
            <div className="w-20 h-1.5 bg-brand-red mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {[
              { name: "BK EDUCATIONAL AND WELFARE SOCIETY", domain: "BKNGO.IN", link: "https://bkngo.in", logo: "/assets/logo-DqA5YpSe.png", color: "from-red-500/20 to-red-500/5", shadow: "shadow-red-500/10", border: "border-red-500/20" },
              { name: "BK CAREER ACADEMY", domain: "BKEDUCATION.CO.IN", link: "https://www.bkeducation.co.in/", logo: "/assets/bk.png", color: "from-amber-500/20 to-amber-500/5", shadow: "shadow-amber-500/10", border: "border-amber-500/20" },
              { name: "BK SPORTS ACADEMY", domain: "BKSPORTS.IN", link: "https://www.bksports.in/", logo: "/assets/bksports.png", color: "from-blue-500/20 to-blue-500/5", shadow: "shadow-blue-500/10", border: "border-blue-500/20" },
              { name: "BK TIMES", domain: "BKTIMES.CO.IN", link: "https://www.bktimes.co.in/", logo: "/assets/bktimes.png", color: "from-pink-500/20 to-pink-500/5", shadow: "shadow-pink-500/10", border: "border-pink-500/20" },
              { name: "GURUKUL VIDYA NIKETAN", domain: "BKGURUKUL.IN", link: "https://bkgurukul.in/", logo: "/assets/GurukulLogo.jpg", color: "from-emerald-500/20 to-emerald-500/5", shadow: "shadow-emerald-500/10", border: "border-emerald-500/20" },
              { name: "SANSKAR ENGLISH MEDIUM SCHOOL", domain: "BKSANSKAR.IN", link: "https://www.bksanskar.in/", logo: "/assets/sanskar.png", color: "from-orange-500/20 to-orange-500/5", shadow: "shadow-orange-500/10", border: "border-orange-500/20" }
            ].map((org, i) => (
              <a 
                key={i} 
                href={org.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`relative h-full bg-white border-2 ${org.border} p-3 md:p-6 rounded-2xl md:rounded-[2.5rem] flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-6 group transition-all duration-500 hover:shadow-2xl ${org.shadow} hover:-translate-y-2 overflow-hidden`}>
                  {/* Colorful Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${org.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 w-10 h-10 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl p-1.5 md:p-2 shrink-0 flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <SafeImage 
                      src={org.logo} 
                      className="w-full h-full object-contain" 
                      fallbackText={org.name} 
                    />
                  </div>
                  
                  <div className="relative z-10 flex-1 text-center md:text-left">
                    <h3 className="text-[10px] md:text-sm font-black text-brand-dark leading-tight uppercase mb-1 md:mb-2 group-hover:text-brand-red transition-colors line-clamp-2 md:line-clamp-none">
                      {org.name}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">{org.domain}</span>
                      <div className="hidden md:block h-px w-0 group-hover:w-8 bg-brand-red transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
