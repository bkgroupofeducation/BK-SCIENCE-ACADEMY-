import React, { useState, useEffect } from 'react';
import SafeImage from './SafeImage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AcademicsTeam = ({ navigateTo }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // GSAP Hero Animations
    const tl = gsap.timeline();
    tl.fromTo(".hero-badge", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.5 })
      .fromTo(".hero-title", { y: 50, opacity: 0, skewY: 5 }, { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: "power4.out" }, "-=0.6")
      .fromTo(".hero-desc", { opacity: 0 }, { opacity: 1, duration: 1.5 }, "-=0.8")
      .fromTo(".stat-card", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" }, "-=1");

    // Scroll Animations for Faculty Groups
    gsap.utils.toArray(".faculty-group").forEach((group) => {
      gsap.fromTo(group.querySelectorAll(".faculty-card"), 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  const faculty = [
    {
      category: "JEE & NEET Command",
      members: [
        {
          name: "Dr. Arvind K. Sharma",
          role: "Head of Biology & Academic Dean",
          qual: "Ph.D. in Molecular Biology, 18+ Years Exp.",
          specialty: "NEET Zoology Specialist",
          img: "/assets/team/arvind.png",
          bio: "Specializing in cracking complex biological systems through visualization."
        },
        {
          name: "Er. Rajesh Deshmukh",
          role: "Director of Physics Hub",
          qual: "IIT Bombay Alumni, 15+ Years Exp.",
          specialty: "Advanced Mechanics & Optics",
          img: "/assets/team/rajesh.png",
          bio: "Transformer of complex physics equations into simple logical stories."
        },
        {
          name: "Prof. Sunita Verma",
          role: "Head of Chemistry Division",
          qual: "M.Sc. Chemistry, CSIR NET Qualified",
          specialty: "Organic & Physical Chemistry",
          img: "/assets/team/sunita.png",
          bio: "Renowned for proprietary memory techniques in Organic Chemistry."
        }
      ]
    },
    {
      category: "Foundation Architects",
      members: [
        {
          name: "Sanjay Pathak",
          role: "Foundation Program Lead",
          qual: "M.Sc. Mathematics, NTSE Expert",
          specialty: "Logical Reasoning & Mental Ability",
          img: "/assets/team/sanjay.png",
          bio: "Building the curiosity and logic required for early-age competitive success."
        },
        {
          name: "Meera Kulkarni",
          role: "Junior Science Mentor",
          qual: "B.Ed, CTET Certified",
          specialty: "Concept Visualization for K-10",
          img: "/assets/team/meera.png",
          bio: "Expert in making science 'alive' for young minds through experiments."
        }
      ]
    }
  ];

  const stats = [
    { label: "Faculty Members", value: "50+" },
    { label: "Avg. Experience", value: "12 Yrs" },
    { label: "IITians/Doctors", value: "20+" },
    { label: "Success Rate", value: "92%" }
  ];

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-20 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full animate-grid-move bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark to-brand-dark"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="hero-badge inline-block px-6 py-2 bg-brand-red/10 border border-brand-red/20 rounded-full text-brand-red text-xs font-black uppercase tracking-[0.4em] mb-12 opacity-0">
            The Architects of Excellence
          </div>
          
          <h1 className="hero-title text-6xl md:text-9xl font-black text-white leading-none tracking-tighter mb-8 uppercase opacity-0">
            Meet the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-orange-500 to-brand-red">Academics</span> Team
          </h1>
          
          <p className="hero-desc text-xl md:text-2xl text-gray-400 font-medium max-w-3xl mx-auto mb-16 opacity-0 leading-relaxed">
            Led by researchers, innovators, and industry titans, our team is dedicated to sculpting the next generation of scientific leaders.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {stats.map((s, idx) => (
              <div key={idx} className="stat-card bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl group hover:bg-brand-red/10 transition-colors duration-500 opacity-0">
                <div className="stat-value text-4xl font-black text-brand-red mb-2">{s.value}</div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM GRID --- */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          {faculty.map((group, groupIdx) => (
            <div key={groupIdx} className="faculty-group mb-20 last:mb-0">
              <div className="flex items-center gap-6 mb-10 overflow-hidden">
                <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter whitespace-nowrap">
                  {group.category}
                </h2>
                <div className="h-1 flex-grow bg-brand-gray">
                  <div className="h-full w-24 bg-brand-red"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {group.members.map((member, idx) => (
                  <div 
                    key={idx} 
                    className="faculty-card group relative bg-brand-gray rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-700 opacity-0"
                  >
                    {/* Portrait Area */}
                    <div className="aspect-square bg-brand-dark overflow-hidden relative">
                      <img 
                        src={member.img} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-brand-dark to-transparent">
                        <div className="inline-block px-3 py-1 bg-brand-red text-white text-[9px] font-black uppercase tracking-widest rounded-lg mb-2">
                          {member.specialty}
                        </div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">{member.name}</h3>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-4 pb-6">
                      <div className="mb-3">
                        <div className="text-brand-red font-black text-[10px] uppercase tracking-widest mb-1">{member.role}</div>
                        <div className="text-gray-500 text-[10px] font-bold italic">{member.qual}</div>
                      </div>
                      <p className="text-gray-600 font-medium leading-relaxed text-xs">
                        "{member.bio}"
                      </p>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <button className="text-[9px] font-black text-brand-dark uppercase tracking-[0.2em] flex items-center gap-2 hover:text-brand-red transition-colors">
                          Research <span>→</span>
                        </button>
                        <div className="flex gap-3">
                          <div className="w-7 h-7 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[10px] hover:bg-brand-red hover:text-white transition-all cursor-pointer">In</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MENTORSHIP CALL --- */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="bg-brand-red rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center text-white">
            <div className="absolute top-0 right-0 w-[50%] h-full bg-black/10 skew-x-12 translate-x-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8">
                Ready to learn from <br /> the <span className="text-brand-yellow">Very Best?</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/80 font-medium max-w-3xl mx-auto mb-12 italic">
                Our academics team provides individual mentoring sessions for every enrolled student. Secure your mentorship slot today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => navigateTo('registration')}
                  className="bg-white text-brand-red px-12 py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-all duration-500 active:scale-95 shadow-2xl"
                >
                  Book My Slot
                </button>
                <button 
                  onClick={() => navigateTo('contact')}
                  className="bg-transparent border-2 border-white/30 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
                >
                  Enquire Further
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER BANNER --- */}
      <div className="bg-brand-red py-8 text-center">
        <span className="text-sm md:text-xl font-black text-white uppercase tracking-[0.3em]">
           BK Science Academy • Academic Excellence • Global Standards
        </span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fade-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
        .stagger-1 { animation-delay: 0.15s; }
        .stagger-2 { animation-delay: 0.3s; }
        .stagger-3 { animation-delay: 0.45s; }
        @keyframes grid-move { from { background-position: 0 0; } to { background-position: 60px 60px; } }
        .animate-grid-move { animation: grid-move 30s linear infinite; }
      `}} />
    </div>
  );
};

export default AcademicsTeam;
