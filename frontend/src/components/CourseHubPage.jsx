import React, { useState, useEffect } from 'react';

const CourseHubPage = ({ courseType, navigateTo }) => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTopic, setActiveTopic] = useState(null);

  useEffect(() => {
    // Reset visibility state on courseType change to trigger animations
    setHeroVisible(false);
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, [courseType]);

  const courseData = {
    'jee': {
      title: "JEE MAIN & ADVANCED",
      subtitle: "The Gold Standard Of Engineering",
      description: "A two-year integrated program meticulously designed to tackle the architectural complexity of the IIT-JEE. Our curriculum bridges the gap between fundamental theory and advanced multi-concept problem solving with surgical precision.",
      features: [
        { title: "Quantum Physics", desc: "Developing deep intuition for mechanics and electromagnetism with advanced derivation techniques.", icon: "⚡" },
        { title: "Calculus Mastery", desc: "Extensive training in high-weightage topics like Definite Integration and Complex Numbers.", icon: "📐" },
        { title: "Organic Logic", desc: "Scientific approach to reaction mechanisms, moving beyond rote learning to conceptual mastery.", icon: "🧪" }
      ],
      syllabus: {
        "Physics": [
          { label: "Mechanics & Fluids", details: "Kinematics, Laws of Motion, Work Energy, Rotation, and Hydrostatics. Focus on complex multi-body systems." },
          { label: "Thermodynamics", details: "Laws of Thermo, Kinetic Theory, Heat Transfer, and Engine Cycles. Mastering PV diagrams and Entropy." },
          { label: "Electrostatics", details: "Gauss Law, Capacitance, Electric Potential, and Dielectrics. Advanced integration-based problems." },
          { label: "Optics", details: "Ray and Wave Optics including Interference, Diffraction, and Polarization. Lens maker formulae and Huygens Principle." },
          { label: "Modern Physics", details: "Photoelectric effect, Atomic Structure, Nuclear Physics, and Duality. Quantum transitions and Decay patterns." }
        ],
        "Chemistry": [
          { label: "Physical Chemistry", details: "Thermodynamics, Equilibrium, Electrochemistry, and Solutions. Emphasis on numerical accuracy and state variables." },
          { label: "Inorganic Coordination", details: "Ligands, Crystal Field Theory, Isomerism, and Metallurgy of transition metals. Color and magnetic properties." },
          { label: "Organic Mechanisms", details: "SN1/SN2, E1/E2, Carbonyl chemistry, and Aromaticity. Understanding electron flow and intermediate stability." },
          { label: "Biomolecules", details: "Proteins, DNA/RNA, Polymers, and Everyday Chemistry. Essential for both JEE and bridge-builders." }
        ],
        "Maths": [
          { label: "Calculus", details: "Limits, Continuity, Differentiation, and Definite/Indefinite Integration. The backbone of JEE advanced math." },
          { label: "Algebra & Matrices", details: "Permutations, Complex Numbers, Determinants, and Quadratic Equations. Logic-heavy scoring sections." },
          { label: "Vectors & 3D Geometry", details: "Dot/Cross products, Lines and Planes in space. High-weightage visual mathematics." },
          { label: "Probability", details: "Bayes Theorem, Distribution, and Conditional probability. Critical for logical assessment." }
        ]
      },
      careers: [
        { role: "Software Architect", company: "Google, Meta, Microsoft", details: "Designing complex systems and managing large-scale infrastructure. High salary potential with roles in top-tier tech firms." },
        { role: "Aerospace Engineer", company: "ISRO, NASA, SpaceX", details: "Working on satellites, launch vehicles, and deep space exploration. A prestigious career paths for JEE Advanced rankers." },
        { role: "Data Scientist", company: "AI Research, Fintech", details: "Using statistical models and machine learning to solve real-world problems. The fastest growing sector in tech." },
        { role: "Product Manager", company: "Tech Unicorns, Startups", details: "Bridging the gap between business and technology. Ideal for those with leadership and tech vision." },
        { role: "Civil/Robot Specialist", company: "Infra & Automation", details: "Building the physical and mechanical future of the world through robotics and sustainable infra." }
      ],
      stats: ["Top AIR 500 Rankings", "Dedicated R&D Material", "CBT Test Environment"],
      themeColor: "text-brand-red",
      bgGradient: "from-brand-dark via-indigo-950 to-brand-dark"
    },
    'neet': {
      title: "NEET PRE-MEDICAL",
      subtitle: "Designing Future Clinicians",
      description: "An intensive training module built for the high-stakes environment of medical entrances. We emphasize 100% NCERT retention combined with the speed required to clear AIIMS and top government medical colleges.",
      features: [
        { title: "NCERT decoding", desc: "Line-by-line analysis of Biology with high-resolution digital anatomy diagrams.", icon: "🧬" },
        { title: "Medic-Physics", desc: "Specialized focus on solving calculation-heavy physics problems without complex math aids.", icon: "🩺" },
        { title: "Daily Evaluation", desc: "30-minute high-intensity daily tests mirroring the NEET difficulty and time pressure.", icon: "⏱️" }
      ],
      syllabus: {
        "Biology": [
          { label: "Human Physiology", details: "Digestion, Circulation, Nervous System, and Endocrine control. High-resolution anatomical mapping." },
          { label: "Genetics & Evolution", details: "Molecular inheritance, Mendelian laws, and Evolutionary trends. 100% NCERT focused." },
          { label: "Biotechnology", details: "Recombinant DNA tech, PCR, and Applications. Understanding the future of medical science." },
          { label: "Plant Physiology", details: "Photosynthesis, Respiration, and Growth hormones. Complex biochemical cycles simplified." },
          { label: "Ecology", details: "Biomes, Ecosystems, and Biodiversity conservation. Essential data-heavy scoring unit." }
        ],
        "Physics": [
          { label: "Class 11/12 Mechanics", details: "Projectile motion, Rigid body dynamics, and Gravitation. Simplified math for medical aspirants." },
          { label: "Heat & Thermodynamics", details: "Calorimetry, Kinetic theory, and engine efficiencies. Conceptual clarity over complex derivations." },
          { label: "Magnetism", details: "Magnetic effects of current, Induction, and AC. Visualizing field lines and flux." },
          { label: "Dual Nature of Matter", details: "Matter waves, Atomic models, and Semiconductor basics. Exploring the microscopic universe." }
        ],
        "Chemistry": [
          { label: "Chemical Bonding", details: "VSEPR theory, Hybridization, and Molecular Orbital Theory. Core foundation for chemistry." },
          { label: "Equilibrium", details: "Ionic and Chemical equilibrium, pH calculations, and Buffer solutions. Numerical mastery." },
          { label: "Hydrocarbons", details: "Alkanes, Alkenes, Alkynes, and Benzene. Reaction mechanisms and naming conventions." },
          { label: "P-Block Elements", details: "Groups 13 to 18 properties, oxoacids, and structures. Memory-intensive NCERT unit." }
        ]
      },
      careers: [
        { role: "Surgeon / Physician", company: "Top AIIMS & Govt Hospitals", details: "Leading clinical operations and performing life-saving surgeries. The pinnacle of medical achievement." },
        { role: "Dentist", company: "BDS Specialist Centers", details: "Specializing in oral health and cosmetic dentistry. Great balance of clinical practice and lifestyle." },
        { role: "Medical Researcher", company: "WHO, ICMR, Pharma Labs", details: "Conducting clinical trials and developing new drugs/vaccines. Essential for global health security." },
        { role: "Veterinary Specialist", company: "Wildlife & Animal Care", details: "Caring for animals and preventing zoonotic diseases. A unique and rewarding medical field." },
        { role: "Ayush Expert", company: "BAMS/BHMS Global Practice", details: "Integrating traditional medicine with modern health practices for holistic patient care." }
      ],
      stats: ["State Rank 1 Holder", "Focus on Anatomy & Physiology", "Exclusive PCB Modules"],
      themeColor: "text-green-500",
      bgGradient: "from-brand-dark via-emerald-950 to-brand-dark"
    },
    'mht-cet': {
      title: "MHT-CET EXPERT",
      subtitle: "State Board Excellence Hub",
      description: "Specialized coaching for the Maharashtra State Common Entrance Test. Our approach targets the high-speed requirements of CET while ensuring perfect alignment with the Maharashtra State Board HSC syllabus.",
      features: [
        { title: "Speed-Accuracy", desc: "Learn to solve 100 MCQ questions in 90 minutes using shortcut methods and mental math.", icon: "🚀" },
        { title: "HSC Synergy", desc: "Perfect synchronization between Board preparations and CET objective requirements.", icon: "🏗️" },
        { title: "CET Mock Lab", desc: "20+ full-length computer-based mocks based on the exact same platform as the actual exam.", icon: "🎖️" }
      ],
      syllabus: {
        'Mathematics': [
          { label: "Calculus", details: "Integration, Differentiation, and Differential equations based on the HSC syllabus." },
          { label: "Vectors & 3D", details: "Lines, Planes, and Vector Algebra with MHT-CET shortcut techniques." },
          { label: "Trigonometry", details: "Trigonometric functions and Inverse Trig. Focused on fast evaluation." },
          { label: "Logic & Matrices", details: "Mathematical Logic and Matrix operations for scoring quick marks." }
        ],
        'Physics': [
          { label: "State Board Mechanics", details: "Rotational dynamics and Oscillations as per the latest HSC pattern." },
          { label: "Electrodynamics", details: "Current electricity and Magnetic effects. Theory combined with MCQ speed." },
          { label: "Optics", details: "Wave theory of light and Interference. High-weightage CET unit." },
          { label: "Kinetic Theory", details: "Gases and Radiation properties. Fundamental scoring topics." }
        ],
        'Chemistry': [
          { label: "Solid State", details: "Crystal lattices and defects. Visualizing 3D structures for boards." },
          { label: "Solutions", details: "Colligative properties and concentration terms. Numerical heavy." },
          { label: "Polymers", details: "Classification and uses. Essential for high-speed memory-based MCQs." },
          { label: "Coordination Compounds", details: "IUPAC naming and Werner's theory. Core inorganic concepts." }
        ],
        'Biology': [
          { label: "Genetics", details: "Inheritance and Variation. Focused on the MH HSC Board textbook." },
          { label: "Physiology", details: "Respiration and Circulation. In-depth understanding of biological systems." },
          { label: "Enhanced Modules", details: "Syncing State Board theory with CET objective requirements." }
        ]
      },
      careers: [
        { role: "Software Engineer", company: "TCS, Infosys, Tech Mahindra", details: "Developing applications and services for global clients. High employability in the IT sector." },
        { role: "Pharmacist", company: "Abbott, Cipla, Sun Pharma", details: "Managing medicinal logistics and working in pharmaceutical giants after MHT-CET Pharmacy." },
        { role: "Agriculture Officer", company: "State Govt Departments", details: "Managing state-level agricultural research and rural policy implementation." },
        { role: "Mechanical Engineer", company: "Auto Hubs (Pune/Nashik)", details: "Working in the heart of Maharashtra's automobile industry with giants like Tata or Mahindra." }
      ],
      stats: ["99.98 Highest Percentile", "1000+ COEP/VJTI Admits", "Targeting Top State Colleges"],
      themeColor: "text-brand-yellow",
      bgGradient: "from-brand-dark via-orange-950 to-brand-dark"
    },
    'nda': {
      title: "NDA LEADERSHIP",
      subtitle: "Officer Cadre Training",
      description: "The premier preparation hub for the Union Public Service Commission's NDA exam. We integrate academic vigor with personality development to groom the next generation of Indian Armed Forces officers.",
      features: [
        { title: "UPSC Standard Math", desc: "In-depth coverage of Class 11th & 12th Mathematics as per the UPSC exam pattern.", icon: "⚔️" },
        { title: "General Ability", desc: "Strong focus on English, Static GK, and World Geography to maximize GAT scores.", icon: "📡" },
        { title: "Personality Dev", desc: "Preliminary SSB guidance including OIR tests, PPDT, and basic psychological grooming.", icon: "🎖️" }
      ],
      syllabus: {
        'Mathematics': [
          { label: "Algebra & Calculus", details: "Complex numbers, Sequence & Series, and basic integration as per UPSC levels." },
          { label: "Trigonometry", details: "Heights & Distances and trigonometric identities. Crucial for NDA Paper I." },
          { label: "Statistics", details: "Probability and data interpretation. Logical assessment unit." },
          { label: "3D Geometry", details: "Vectors and Coordinate geometry. Spatial reasoning in math." }
        ],
        'GAT English': [
          { label: "Grammar", details: "Error spotting, Fillers, and sentence improvement for officer-level English." },
          { label: "Vocabulary", details: "Synonyms, Antonyms, and Idioms. High-frequency UPSC vocabulary." }
        ],
        'GAT General Science': [
          { label: "Applied Physics", details: "Concepts of motion, work, and electricity applied to real-world scenarios." },
          { label: "Basics of Biology", details: "Human health, nutrition, and environmental science basics." }
        ],
        'GAT Humanities': [
          { label: "Indian History", details: "Modern Indian History and the Freedom Struggle in detail." },
          { label: "World Geography", details: "Mapping, Climates, and Indian Geography essentials." }
        ]
      },
      careers: [
        { role: "Army Lieutenant", company: "Indian Army", details: "Serving the nation in the most prestigious officer cadre. Leading battalions and managing defense strategies." },
        { role: "Flying Officer", company: "Indian Air Force", details: "Piloting the country's most advanced aerospace technology. A career of high honor and skill." },
        { role: "Sub Lieutenant", company: "Indian Navy", details: "Defending the country's maritime borders with technological and tactical excellence." },
        { role: "Intelligence Officer", company: "Defense Strategic Roles", details: "Managing tactical intelligence and national security operations." }
      ],
      stats: ["Sainik School Pedagogy", "Current Affairs Daily", "Mental Stamina Built"],
      themeColor: "text-blue-500",
      bgGradient: "from-brand-dark via-sky-950 to-brand-dark"
    },
    'boards': {
      title: "STATE BOARD SCHOLARS",
      subtitle: "HSC & SSC Foundation",
      description: "Dedicated academic support for 11th and 12th State Board students. We focus on building a crystalline foundation in core sciences while ensuring pupils excel in theory and practical result patterns.",
      features: [
        { title: "Theory Mastery", desc: "Step-by-step guidance on writing perfectly structured answers for Board evaluations.", icon: "📚" },
        { title: "Practical Lab Prep", desc: "Simulation and guidance for Physics, Chemistry, and Biology laboratory experiments.", icon: "✒️" },
        { title: "Grammar & Lang", desc: "Comprehensive support for English and optional languages to boost overall percentage.", icon: "🔗" }
      ],
      syllabus: {
        'Physics': [
          { label: "Rotational Dynamics", details: "Circular motion and moment of inertia. Core 12th board unit." },
          { label: "Thermodynamics", details: "State board specific cycles and laws of heat." },
          { label: "Wave Optics", details: "Huygens Principle and Diffraction theory for theory papers." }
        ],
        'Chemistry': [
          { label: "Solid State", details: "Standard 12th state board modules on crystal systems." },
          { label: "Chemical Kinetics", details: "Rate laws and order of reactions. Essential for numericals." },
          { label: "Halogens", details: "Properties and reactions of group 17 elements." }
        ],
        'Mathematics': [
          { label: "Logic", details: "Truth tables and logic statements for the board exam." },
          { label: "Integration", details: "Standard indefinite and definite integration methods." }
        ],
        'Biology': [
          { label: "Inheritance", details: "Mendelian genetics according to the State Board textbook." },
          { label: "Control & Coordination", details: "Nervous and hormonal systems in humans." }
        ]
      },
      careers: [
        { role: "Scientist / Researcher", company: "BARC, DRDO, CSIR", details: "Pursuing deep scientific research in India's top research organizations." },
        { role: "Academician", company: "Top Tech Universities", details: "Shaping the minds of future generations through teaching and academic leadership." },
        { role: "Competitive Aspirant", status: "Base for UPSC/IFS", details: "Using the board foundation to clear UPSC, MPSC, and other high-level competitive exams." },
        { role: "Tech Specialist", company: "Innovation Centers", details: "Expertise in specific technical domains like VLSI or Advanced Chem-Tech." }
      ],
      stats: ["100% Passing Record", "District Merit List Hold", "Concept-Driven Core"],
      themeColor: "text-purple-500",
      bgGradient: "from-brand-dark via-purple-950 to-brand-dark"
    }
  };

  const data = courseData[courseType] || courseData['jee'];

  return (
    <div className="min-h-screen bg-white">
      {/* Cinematic Hero */}
      <section className={`relative min-h-[85vh] flex items-center bg-gradient-to-br ${data.bgGradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-red/20 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[120px]"></div>
          <div className="grid-bg opacity-[0.05] absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className={`max-w-5xl transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-brand-red"></div>
              <span className="text-white/60 font-black uppercase tracking-[0.4em] text-xs pb-1">{data.subtitle}</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter mb-10">
              {data.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? data.themeColor : ""}>{word} </span>
              ))}
            </h1>

            <p className="text-xl md:text-3xl text-gray-400 font-medium max-w-3xl leading-snug mb-16">
              {data.description}
            </p>

            <div className="flex flex-wrap gap-8 items-center mb-16">
              {data.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-red animate-ping"></div>
                  <span className="text-white font-black uppercase tracking-widest text-xs md:text-sm">{stat}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => navigateTo('registration')}
                className="bg-brand-red text-white py-5 px-12 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand-red/20"
              >
                Start Your Journey
              </button>
              <button 
                onClick={() => navigateTo('enquiry')}
                className="border-2 border-white/20 text-white py-5 px-12 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Download Syllabus
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Abstract Background Text */}
        <div className="absolute bottom-10 right-10 text-[15rem] font-black text-white/5 pointer-events-none select-none -skew-x-12 hidden lg:block uppercase leading-none">
          {courseType}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter uppercase mb-6">
              Our <span className="text-brand-red">Proprietary</span> Approach
            </h2>
            <div className="w-24 h-1 bg-brand-red mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.features.map((f, i) => (
              <div key={i} className="group p-10 bg-gray-50 rounded-[3rem] hover:bg-brand-dark transition-all duration-700 hover:-translate-y-4">
                <div className="text-6xl mb-10 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-2xl font-black text-brand-dark group-hover:text-white transition-colors mb-4 uppercase tracking-tighter">{f.title}</h3>
                <p className="text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum & Syllabus Section */}
      <section className="py-24 md:py-40 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-brand-red/[0.02] -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-24">
            {/* --- CURRICULUM LEFT --- */}
            <div className="lg:w-1/2">
              <div className="mb-16">
                <div className="inline-block px-4 py-1 bg-brand-red/10 border border-brand-red/20 rounded-full text-brand-red text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                  Academic Blueprint
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter leading-none">
                  Curriculum <br />
                  <span className="text-brand-red">Structure</span>
                </h2>
              </div>

              <div className="grid gap-6">
                {Object.entries(data.syllabus).map(([subject, topics], idx) => (
                  <div 
                    key={subject} 
                    className="group relative bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-brand-red/20 transition-all duration-700 hover:-translate-y-2"
                  >
                    <div className="absolute top-8 right-10 text-5xl font-black text-gray-50 opacity-0 group-hover:opacity-100 group-hover:text-brand-red/10 transition-all duration-700 uppercase leading-none select-none">
                      {subject}
                    </div>
                    
                    <h4 className="text-2xl font-black text-brand-dark mb-8 flex items-center gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-brand-red/5 flex items-center justify-center text-brand-red text-lg font-black italic">
                        0{idx + 1}
                      </span>
                      {subject}
                    </h4>

                    <div className="flex flex-wrap gap-2.5">
                      {topics.map(topic => (
                        <div 
                          key={topic.label} 
                          onClick={() => setActiveTopic(topic)}
                          className="px-5 py-2.5 bg-gray-50 text-gray-500 hover:bg-brand-red hover:text-white text-[10px] font-extrabold rounded-xl border border-gray-100 uppercase tracking-widest transition-all duration-300 cursor-pointer active:scale-95"
                        >
                          {topic.label}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- TOPIC DETAIL MODAL --- */}
            {activeTopic && (
              <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-brand-dark/90 backdrop-blur-md animate-fade-in">
                <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 md:p-16 relative overflow-hidden animate-topic-pop shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 rounded-bl-[4rem]"></div>
                   
                   <button 
                    onClick={() => setActiveTopic(null)}
                    className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full hover:bg-brand-red hover:text-white transition-all group"
                   >
                     <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   </button>

                   <div className="mb-8">
                     <span className="text-brand-red font-black text-xs uppercase tracking-[0.4em] mb-4 block">
                       {activeTopic.type === 'Career' ? 'Future Insight' : 'Detailed Module'}
                     </span>
                     <h3 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter leading-none">{activeTopic.label}</h3>
                   </div>

                   <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed mb-12">
                     {activeTopic.details}
                   </p>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 bg-gray-50 rounded-2xl flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-brand-red"></div>
                        <span className="text-[10px] font-black uppercase text-gray-400">Expert Lectures</span>
                      </div>
                      <div className="p-6 bg-gray-50 rounded-2xl flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-brand-red"></div>
                        <span className="text-[10px] font-black uppercase text-gray-400">Practice Mocks</span>
                      </div>
                   </div>

                   <button 
                    onClick={() => setActiveTopic(null)}
                    className="mt-12 w-full py-6 bg-brand-dark text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-red transition-all"
                   >
                     Got it, Close
                   </button>
                </div>
              </div>
            )}

            {/* --- CAREERS RIGHT --- */}
            <div className="lg:w-1/2">
              <div className="mb-16">
                <div className="inline-block px-4 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                  Future Landscapes
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter leading-none">
                  Career <br />
                  <span className="text-brand-red">Horizons</span>
                </h2>
              </div>

              <div className="relative pl-10 border-l-2 border-dashed border-gray-200 space-y-8">
                {data.careers.map((career, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveTopic({ label: career.role, details: career.details, type: 'Career' })}
                    className="group relative flex items-center justify-between p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:bg-brand-dark transition-all duration-500 cursor-pointer"
                  >
                    <div className="absolute -left-[51px] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-brand-red rounded-full z-10 group-hover:scale-125 transition-transform"></div>
                    
                    <div>
                      <h4 className="text-xl font-black text-brand-dark group-hover:text-white transition-colors uppercase tracking-tight mb-1">{career.role}</h4>
                      <p className="text-[10px] text-gray-400 group-hover:text-brand-red transition-colors font-black uppercase tracking-[0.2em]">{career.company || career.status}</p>
                    </div>

                    <div className="w-14 h-14 bg-gray-50 group-hover:bg-brand-red/20 rounded-2xl flex items-center justify-center transition-all">
                      <svg className="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-12 bg-brand-red rounded-[3.5rem] text-white shadow-3xl shadow-brand-red/30 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
                <p className="font-extrabold text-2xl md:text-3xl leading-tight mb-10 relative z-10 italic">
                  "The best way to predict the future is to create it."
                </p>
                <button 
                  onClick={() => navigateTo('admission')}
                  className="relative z-10 px-8 py-4 bg-white text-brand-red font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-brand-dark hover:text-white transition-all duration-500"
                >
                  Join the Next Batch »
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Callout */}
      <section className="py-24 bg-brand-dark rounded-[4rem] mx-4 md:mx-10 mb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <div className="text-[25rem] font-black text-white rotate-12 translate-x-1/2 uppercase leading-none">{courseType}</div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-8 leading-none">
                Integrated <br />
                <span className="text-brand-yellow">Lighthouse</span> Learning
              </h2>
              <div className="space-y-6 text-gray-400 text-lg font-medium">
                <p>We synchronize state board preparation with competitive exam rigor, ensuring zero duplication of effort.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Phase-wise syllabus", "Customized Assignments", "Doubt Solving Cafeteria", "Mental Readiness Drills"].map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-brand-red" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                      <span className="text-sm font-black uppercase text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3 bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[4rem] text-center">
              <div className="text-brand-red font-black text-5xl mb-4">BATCHES</div>
              <div className="text-white text-xl font-bold mb-8 uppercase tracking-widest opacity-60">Admission Open 2025-26</div>
              <button 
                onClick={() => navigateTo('registration')}
                className="w-full py-5 bg-brand-yellow text-brand-dark font-black rounded-3xl uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-yellow/10"
              >
                Book Your Seat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-8xl font-black text-brand-dark tracking-tighter leading-none mb-10">
            Build Your <br />
            <span className="text-brand-red">Legacy Of Success.</span>
          </h2>
          <button 
            onClick={() => navigateTo('admission')}
            className="px-16 py-6 bg-brand-red text-white font-black rounded-3xl text-sm uppercase tracking-widest hover:bg-brand-dark transition-all duration-500 shadow-3xl shadow-brand-red/20"
          >
            Apply For Admission
          </button>
        </div>
      </section>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes topic-pop { 
          from { opacity: 0; transform: scale(0.9) translateY(40px); filter: blur(10px); } 
          to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); } 
        }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        .animate-topic-pop { animation: topic-pop 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}} />
    </div>
  );
};

export default CourseHubPage;
