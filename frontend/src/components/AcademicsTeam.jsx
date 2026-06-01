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
      category: "Leadership & Senior Mentors",
      members: [
        {
          name: "Nivrutti Khekade",
          role: "Managing Director",
          qual: "B.E. (Mech), 20+ Years Educational Leadership",
          specialty: "Institutional Vision",
          img: "/assets/team/Nivrutti Khekade.jpeg",
          bio: "Driving the vision of making BK Science Academy a global benchmark in science education.",
          theme: "from-blue-50 to-indigo-50 border-blue-200 text-blue-600 badge:bg-blue-600 glow:bg-blue-400"
        },
        {
          name: "Sneha Lachke",
          role: "Academic Coordinator",
          qual: "M.Sc., B.Ed., Expert in Mentorship",
          specialty: "Student Relations",
          img: "/assets/team/Sneha Lachke.jpeg",
          bio: "Ensuring seamless academic delivery and personalized support for every student.",
          theme: "from-emerald-50 to-teal-50 border-emerald-200 text-emerald-600 badge:bg-emerald-600 glow:bg-emerald-400"
        },
        {
          name: "Rishabh Sir",
          role: "Senior Physics Mentor",
          qual: "B.Tech, JEE/NEET Physics Expert",
          specialty: "Advanced Mechanics",
          img: "/assets/team/rishabh sir.jpeg",
          bio: "Simplifying complex physics concepts through real-world applications and logic.",
          theme: "from-amber-50 to-orange-50 border-amber-200 text-amber-600 badge:bg-amber-600 glow:bg-amber-400"
        },
        {
          name: "Senior Academic Expert",
          role: "Senior Faculty",
          qual: "Expert in Competitive Training",
          specialty: "Strategic Prep",
          img: "/assets/team/sir2.jpeg",
          bio: "Specialist in building the foundational grit needed for top-tier competitive exams.",
          theme: "from-purple-50 to-pink-50 border-purple-200 text-purple-600 badge:bg-purple-600 glow:bg-purple-400"
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
      
      {/* --- TEAM GRID --- */}
      <section className="pt-24 md:pt-32 pb-8 md:py-10 relative bg-gray-50/50">
        <div className="container mx-auto px-6">
          {faculty.map((group, groupIdx) => (
            <div key={groupIdx} className="faculty-group mb-12 last:mb-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 animate-fade-up">
                <div className="space-y-2">
                  <div className="text-brand-red font-black uppercase tracking-[0.4em] text-[10px]">Academic Division</div>
                  <h2 className="text-4xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter leading-none">
                    {group.category}
                  </h2>
                </div>
                <div className="h-1 flex-grow hidden md:block bg-brand-dark/10 mb-2"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                {group.members.map((member, idx) => {
                  const [bg, border, text, badge, glow] = member.theme.split(' ');
                  const badgeColor = badge.split(':')[1];
                  const glowColor = glow.split(':')[1];
                  
                  return (
                    <div 
                      key={idx} 
                      className={`faculty-card group bg-gradient-to-br ${member.theme.split(' ').slice(0,2).join(' ')} border ${member.theme.split(' ')[2]} p-4 md:p-8 rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:shadow-brand-red/10 hover:-translate-y-2 opacity-0 text-center`}
                    >
                      {/* Portrait Area */}
                      <div className="relative w-24 h-24 md:w-40 md:h-40 mx-auto mb-6">
                        <div className={`absolute inset-0 ${glowColor} rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700`}></div>
                        <div className="relative w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden transition-all duration-700 ring-1 ring-gray-100">
                          <SafeImage 
                            src={member.img} 
                            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                            fallbackText={member.name} 
                          />
                        </div>
                        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${badgeColor} text-white text-[7px] md:text-[9px] font-black px-3 py-1.5 rounded-full border-2 border-white shadow-lg uppercase tracking-widest whitespace-nowrap z-10`}>
                          {member.specialty}
                        </div>
                      </div>

                      {/* Content Area */}
                      <div>
                        <h3 className="text-sm md:text-xl font-black text-brand-dark uppercase leading-tight group-hover:text-brand-red transition-colors mb-1">
                          {member.name}
                        </h3>
                        <div className={`${member.theme.split(' ')[3]} font-black text-[8px] md:text-[10px] uppercase tracking-[0.2em]`}>
                          {member.role}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MENTORSHIP CALL --- */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <div className="bg-brand-red rounded-[2rem] md:rounded-[4rem] p-8 md:p-12 relative overflow-hidden text-center text-white">
            <div className="absolute top-0 right-0 w-[50%] h-full bg-black/10 skew-x-12 translate-x-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                Ready to learn from <br /> the <span className="text-brand-yellow">Very Best?</span>
              </h2>
              <p className="text-sm md:text-base text-white/80 font-medium max-w-2xl mx-auto mb-8">
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
