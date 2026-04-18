import React, { useState, useEffect } from 'react';

const CareersPage = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [expandedJob, setExpandedJob] = useState(null);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  const jobOpenings = [
    {
      title: "Senior Physics Faculty",
      department: "Academic",
      location: "Nashik Center",
      type: "Full-Time",
      description: "We are looking for an experienced Physics educator to lead JEE Advanced and NEET batches. Must have a proven track record of producing top ranks.",
      requirements: ["M.Sc. in Physics or equivalent", "5+ years teaching experience", "Proven JEE/NEET results", "Excellent communication skills"],
      benefits: ["Competitive salary", "Performance bonuses", "Professional development", "State-of-the-art infrastructure"]
    },
    {
      title: "Chemistry Subject Matter Expert",
      department: "Content & Academic",
      location: "Remote / Hybrid",
      type: "Full-Time",
      description: "Help us build the next generation of study material and online test series for competitive exams.",
      requirements: ["B.Sc./M.Sc. in Chemistry", "Experience in content creation", "Knowledge of JEE/NEET syllabus", "Strong analytical skills"],
      benefits: ["Flexible work hours", "Creative freedom", "Innovation allowance", "Career growth path"]
    },
    {
      title: "Academic Counselor",
      department: "Sales & Admission",
      location: "Nashik Center",
      type: "Full-Time",
      description: "Guide students and parents through their academic journey and help them choose the right programs at BK Science Academy.",
      requirements: ["Bachelor's degree", "1+ year in counseling/sales", "Strong interpersonal skills", "Target-driven mindset"],
      benefits: ["Attractive commissions", "Training programs", "Performance incentives", "Health insurance"]
    },
    {
      title: "DTP Operator (Science)",
      department: "Operations",
      location: "Nashik Center",
      type: "Full-Time",
      description: "Expertise in LaTeX or specialized science typing for creating high-quality question papers and modules.",
      requirements: ["Proficiency in LaTeX", "Science notation expertise", "Attention to detail", "Deadline-oriented"],
      benefits: ["Stable job", "Skills training", "Creative projects", "Team environment"]
    },
    {
      title: "Mathematics Faculty (JEE/NEET)",
      department: "Academic",
      location: "Nashik Center",
      type: "Full-Time",
      description: "Join our math team to mentor students preparing for competitive exams with innovative teaching methods.",
      requirements: ["M.Sc. in Mathematics", "3+ years teaching experience", "Strong problem-solving skills", "Digital teaching proficiency"],
      benefits: ["Research opportunities", "Advanced tools access", "Workshop participation", "Publication support"]
    },
    {
      title: "Biology Faculty (NEET)",
      department: "Academic",
      location: "Nashik Center",
      type: "Full-Time",
      description: "Teach Biology with passion and help students achieve their dreams of becoming doctors.",
      requirements: ["B.Sc./M.Sc. in Zoology/Botany", "NEET teaching experience", "Concept clarity", "Student engagement skills"],
      benefits: ["Specialization support", "Lab resources", "Medical workshop access", "Growth opportunities"]
    },
    {
      title: "Digital Marketing Manager",
      department: "Marketing",
      location: "Remote / Hybrid",
      type: "Full-Time",
      description: "Lead our digital presence and drive student enrollment through innovative marketing campaigns.",
      requirements: ["MBA in Marketing", "3+ years digital marketing", "SEO/SEM expertise", "Data analytics skills"],
      benefits: ["Creative budget", "Remote flexibility", "Performance bonuses", "Brand building"]
    },
    {
      title: "Frontend Developer",
      department: "Technology",
      location: "Remote / Hybrid",
      type: "Full-Time",
      description: "Build engaging and responsive web experiences for our student portal and learning platforms.",
      requirements: ["React/Next.js expertise", "2+ years experience", "UI/UX understanding", "API integration skills"],
      benefits: ["Latest tech stack", "Learning budget", "Flexible hours", "Startup culture"]
    },
    {
      title: "Content Writer (Science)",
      department: "Content & Academic",
      location: "Remote / Hybrid",
      type: "Part-Time",
      description: "Create engaging educational content, blogs, and study materials for our platforms.",
      requirements: ["Science background", "Creative writing skills", "SEO knowledge", "Research ability"],
      benefits: ["Work from home", "Flexible deadlines", "Creative input", "Portfolio building"]
    },
    {
      title: "Operations Manager",
      department: "Operations",
      location: "Nashik Center",
      type: "Full-Time",
      description: "Oversee day-to-day operations ensuring smooth functioning of all academic and administrative processes.",
      requirements: ["MBA or equivalent", "5+ years operations experience", "Leadership skills", "Process optimization expertise"],
      benefits: ["Strategic role", "Decision making authority", "Performance incentives", "Leadership training"]
    },
    {
      title: "Student Success Coordinator",
      department: "Student Services",
      location: "Nashik Center",
      type: "Full-Time",
      description: "Monitor student progress and provide guidance to ensure optimal learning outcomes.",
      requirements: ["Bachelor's degree", "Experience in student services", "Analytical mindset", "Communication excellence"],
      benefits: ["Impactful role", "Student interaction", "Incentive programs", "Career advancement"]
    },
    {
      title: "Video Producer / Editor",
      department: "Content & Academic",
      location: "Remote / Hybrid",
      type: "Full-Time",
      description: "Create high-quality video lectures and promotional content for our digital platforms.",
      requirements: ["Video production expertise", "Adobe Premiere/After Effects", "Educational content experience", "Storytelling skills"],
      benefits: ["Creative projects", "Latest equipment", "Production budget", "Portfolio growth"]
    }
  ];

  const toggleJob = (index) => {
    setExpandedJob(expandedJob === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,_rgba(192,0,0,0.15)_0%,_transparent_60%)]"></div>
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' 
          }}></div>
        </div>

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className={`max-w-4xl transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block px-5 py-2 bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
              Join Our Mission
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic">
              Empower <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-orange-400">The Future.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl leading-relaxed">
              We're building a team of passionate educators and innovators dedicated to shaping the next generation of scientists and doctors.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-brand-dark leading-[0.95] tracking-tighter mb-10">
                Why Build Your <br />
                <span className="text-brand-red">Career At BK?</span>
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Academic Excellence", desc: "Work alongside some of the finest minds in the coaching industry." },
                  { title: "Innovation Led", desc: "We leverage cutting-edge technology to enhance the learning experience." },
                  { title: "Growth & Impact", desc: "Directly influence the success of thousands of aspiring students." },
                  { title: "Cinematic Workspace", desc: "A professional, high-energy environment built for excellence." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-red font-black text-xl group-hover:bg-brand-red group-hover:text-white transition-all duration-500 shrink-0">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-brand-dark mb-2 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl">
                 <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                  alt="Team at BK Science" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-brand-red p-10 rounded-[2.5rem] shadow-2xl max-w-[280px]">
                <p className="text-white font-black text-lg italic leading-tight">
                  "Working here is not just a job, it's a commitment to excellence."
                </p>
                <div className="mt-4 text-white/60 text-xs font-black uppercase tracking-widest">— Director, BK Science</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">Current Openings</div>
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter">Your Next <span className="text-brand-red">Chapter</span></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {jobOpenings.map((job, i) => (
              <div 
                key={i} 
                className={`bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/40 transition-all duration-500 group cursor-pointer overflow-hidden ${expandedJob === i ? 'ring-2 ring-brand-red ring-offset-4' : 'hover:-translate-y-2'}`}
                onClick={() => toggleJob(i)}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">{job.department}</span>
                    <h3 className="text-2xl font-black text-brand-dark mt-2 tracking-tight">{job.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-1.5 bg-gray-50 rounded-full text-[9px] font-black text-gray-500 uppercase tracking-widest">
                      {job.type}
                    </div>
                    <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center transition-all duration-300 ${expandedJob === i ? 'bg-brand-red rotate-180' : 'group-hover:bg-brand-red group-hover:text-white'}`}>
                      <svg className={`w-5 h-5 transition-all duration-300 ${expandedJob === i ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 mb-8 leading-relaxed font-medium">{job.description}</p>
                
                <div className={`grid gap-4 transition-all duration-500 ease-out ${expandedJob === i ? 'opacity-100 max-h-[500px] translate-y-0' : 'opacity-0 max-h-0 -translate-y-4 overflow-hidden'}`}>
                  {job.requirements && (
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="text-xs font-black text-brand-dark uppercase tracking-widest mb-4">Requirements</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, ri) => (
                          <li key={ri} className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="w-2 h-2 bg-brand-red rounded-full"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {job.benefits && (
                    <div className="bg-gradient-to-r from-brand-red/5 to-brand-red/10 rounded-2xl p-6">
                      <h4 className="text-xs font-black text-brand-red uppercase tracking-widest mb-4">What We Offer</h4>
                      <ul className="space-y-2">
                        {job.benefits.map((ben, bi) => (
                          <li key={bi} className="flex items-center gap-3 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            {ben}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className={`flex items-center justify-between mt-6 transition-all duration-500 ${expandedJob === i ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100'}`}>
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span className="text-xs font-bold uppercase tracking-widest">{job.location}</span>
                  </div>
                  <button className="px-6 py-3 bg-brand-dark text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-red transition-all duration-300">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-red relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none select-none overflow-hidden">
          <div className="text-[20rem] font-black text-white whitespace-nowrap -skew-x-12 translate-x-1/4">CAREERS</div>
        </div>
        <div className="container mx-auto px-6 md:px-10 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tighter leading-none italic">
            Don't See The Right Fit?
          </h2>
          <p className="text-xl md:text-2xl font-medium mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed">
            We are always on the look out for extraordinary talent. Send us your CV and we'll keep you in mind for future roles.
          </p>
          <a 
            href="mailto:hr@bkscienceacademy.com" 
            className="inline-block px-12 py-6 bg-white text-brand-dark rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all duration-500"
          >
            Send Your Resume
          </a>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
