import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Target, 
  Award, 
  Globe, 
  CheckCircle, 
  Users, 
  ShieldCheck, 
  Zap, 
  Star,
  BookOpen,
  MapPin,
  Calendar,
  Navigation
} from 'lucide-react';

const useInView = (options = { threshold: 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
};

const FeatureCard = ({ feature, index }) => {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={`p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-700 group hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-red transition-all duration-500">
        <div className="group-hover:text-white transition-colors duration-500">{feature.icon}</div>
      </div>
      <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter group-hover:text-brand-red transition-colors">{feature.title}</h3>
      <p className="text-gray-400 leading-relaxed font-medium">{feature.desc}</p>
    </div>
  );
};

const SyllabusCard = ({ data, index }) => {
  const [ref, isVisible] = useInView();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const cardRef = React.useRef(null);

  const toggleExpand = (i) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group spotlight tilt-card relative bg-[#0a0a0f] border border-white/5 p-8 md:p-10 rounded-[2.5rem] transition-all duration-300 hover:border-brand-red/40 shadow-2xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-[60px] group-hover:bg-brand-red/10 transition-all duration-500"></div>
        
        <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
          <div className="flex items-center gap-5 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-red to-red-700 flex items-center justify-center shadow-xl shadow-brand-red/20 group-hover:scale-110 transition-transform duration-500">
              <BookOpen size={24} className="text-white" />
            </div>
            <div>
              <span className="text-brand-red font-black text-[9px] uppercase tracking-[0.4em] mb-1 block animate-pulse">Curriculum Tier</span>
              <h3 className="text-white font-black text-2xl uppercase tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-red transition-all duration-500 font-[Outfit]">{data.level}</h3>
            </div>
          </div>

          <div className="space-y-5">
            {data.subjects.map((sub, j) => (
              <div 
                key={j} 
                className={`relative pl-8 group/item cursor-pointer border-l-2 transition-all duration-500 ${expandedIndex === j ? 'border-brand-yellow' : 'border-white/5 hover:border-brand-red/30'}`}
                onClick={() => toggleExpand(j)}
              >
                <div className="transition-transform duration-300">
                  <div className="flex items-center justify-between group/title">
                    <div className="flex items-center gap-3">
                      {/* Sub-topic Icon Representation */}
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10 group-hover/item:border-brand-red/30 transition-all">
                        <img 
                          src={`https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=100&h=100&fit=crop&auto=format`} 
                          alt={sub.name}
                          className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <h4 className={`font-black text-base uppercase tracking-wider transition-all duration-300 ${expandedIndex === j ? 'text-brand-yellow translate-x-1' : 'text-gray-300 group-hover/item:text-white'}`}>
                        {sub.name}
                      </h4>
                    </div>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${expandedIndex === j ? 'bg-brand-yellow text-black rotate-90 scale-110 shadow-lg shadow-brand-yellow/20' : 'bg-white/5 text-gray-500 group-hover/item:bg-brand-red/20 group-hover/item:text-brand-red group-hover/item:scale-110'}`}>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <p className={`text-[12px] leading-relaxed font-medium transition-colors mb-2 ml-13 ${expandedIndex === j ? 'text-gray-400' : 'text-gray-600'}`}>
                    {sub.focus}
                  </p>

                  <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${expandedIndex === j ? 'max-h-[600px] opacity-100 mt-5 pb-5' : 'max-h-0 opacity-0'}`}>
                    <div className="grid grid-cols-1 gap-2.5 border-t border-white/5 pt-5 relative">
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-brand-yellow/50 via-transparent to-transparent"></div>
                      {sub.topics.map((topic, k) => (
                        <div 
                          key={k} 
                          className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 group/topic hover:translate-x-1"
                          style={{ transitionDelay: `${k * 30}ms` }}
                        >
                          <div className="w-1 h-1 rounded-full bg-brand-red/40 group-hover/topic:bg-brand-red group-hover/topic:scale-150 transition-all"></div>
                          <span className="text-[12px] font-medium tracking-wide">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
               <div className={`w-1.5 h-1.5 rounded-full animate-pulse transition-all duration-500 ${expandedIndex !== null ? 'bg-brand-yellow shadow-[0_0_15px_rgba(251,191,36,0.8)] scale-125' : 'bg-brand-red'}`}></div>
               <span className="text-gray-500 text-[9px] font-black uppercase tracking-[0.2em] font-mono">
                 {expandedIndex !== null ? 'Subject Active' : 'System Idle'}
               </span>
            </div>
            <CheckCircle size={12} className={`transition-all duration-500 ${expandedIndex !== null ? 'text-brand-yellow scale-125 rotate-[360deg]' : 'text-gray-700'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CounterStat = ({ value, label, icon, delay }) => {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 text-brand-red' : 'opacity-0 translate-y-8 text-gray-300'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-4 flex justify-center">{icon}</div>
      <div className="text-5xl md:text-6xl font-black mb-2 tracking-tighter">{value}</div>
      <div className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400">{label}</div>
    </div>
  );
};

const MOSTPage = ({ navigateTo }) => {
  const [activeBoard, setActiveBoard] = useState('NASHIK');
  const [activeTab, setActiveTab] = useState('offline');

  const syllabus = [
    {
      level: "Class 8th, 9th & 10th",
      subjects: [
        { 
          name: "Mathematics", 
          focus: "Foundation of Algebra & Geometry", 
          topics: ["Number Systems", "Polynomials", "Co-ordinate Geometry", "Linear Equations", "Introduction to Euclid's Geometry", "Lines and Angles", "Triangles", "Quadrilaterals"]
        },
        { 
          name: "Science", 
          focus: "Conceptual Physics & Chemistry", 
          topics: ["Matter in Our Surroundings", "Is Matter Around Us Pure", "Atoms and Molecules", "Structure of the Atom", "The Fundamental Unit of Life", "Tissues", "Motion", "Force and Laws of Motion"]
        },
        { 
          name: "Mental Ability", 
          focus: "Logical Reasoning & IQ", 
          topics: ["Series Completion", "Analogy", "Classification", "Coding-Decoding", "Blood Relations", "Direction Sense Test", "Logical Venn Diagrams", "Alpha-Numeric Sequence Puzzle"]
        }
      ]
    },
    {
      level: "Class 11th & 12th",
      subjects: [
        { 
          name: "Physics", 
          focus: "Mechanics, Thermodynamics, Optics", 
          topics: ["Physical World", "Units and Measurements", "Motion in a Straight Line", "Motion in a Plane", "Laws of Motion", "Work, Energy and Power", "Systems of Particles and Rotational Motion", "Gravitation"]
        },
        { 
          name: "Chemistry", 
          focus: "Organic, Inorganic, Physical", 
          topics: ["Some Basic Concepts of Chemistry", "Structure of Atom", "Classification of Elements", "Chemical Bonding", "States of Matter", "Thermodynamics", "Equilibrium", "Redox Reactions"]
        },
        { 
          name: "Maths/Biology", 
          focus: "Advanced Calculation / Cell Bio", 
          topics: ["Sets", "Relations and Functions", "Trigonometric Functions", "Principle of Mathematical Induction", "Complex Numbers", "Linear Inequalities", "Permutations and Combinations", "Binomial Theorem"]
        }
      ]
    }
  ];

  const features = [
    { icon: <Target size={32} />, title: "Benchmarking", desc: "Compare performance against thousands of engineering and medical aspirants." },
    { icon: <Award size={32} />, title: "Scholarships", desc: "Win up to 100% scholarship on tuition fees based on your exam rank." },
    { icon: <Globe size={32} />, title: "Real-time AI", desc: "Get detailed AI-driven analytics of your strengths and weak areas." },
    { icon: <Zap size={32} />, title: "Fast-Track", desc: "Direct admission to our elite batches for top rankers of the test." }
  ];

  const stats = [
    { value: "50K+", label: "Aspirants", icon: <Users size={24} /> },
    { value: "₹2Cr", label: "Pool", icon: <Award size={24} /> },
    { value: "100%", label: "Potential", icon: <Zap size={24} /> },
    { value: "Elite", label: "Badges", icon: <ShieldCheck size={24} /> }
  ];

  const centers = {
    'NASHIK': [
      { city: 'Nashik Main', address: 'Ashok Stambh' },
      { city: 'Gangapur', address: 'Gangapur Road' },
      { city: 'Indira Nagar', address: 'Near Petrol Pump' },
      { city: 'Panchvati', address: 'Tapovan' }
    ]
  };

  return (
    <div className="bg-brand-dark min-h-screen selection:bg-brand-red selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[60%] h-full bg-[radial-gradient(circle_at_fade,rgba(255,50,50,0.1)_0%,transparent_70%)] opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-[60%] h-full bg-[radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.1)_0%,transparent_70%)] opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-3/5 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full mb-10 transition-all hover:bg-white/10 cursor-default group">
                <div className="w-2 h-2 rounded-full bg-brand-red animate-ping"></div>
                <span className="text-white text-xs font-black uppercase tracking-[0.5em]">BK Champions 2026</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10 uppercase transition-all">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-500 to-orange-500 italic">Ultimate</span><br/>
                Scholarship Test
              </h1>
              
              <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-2xl mb-12 leading-relaxed opacity-80">
                Unlock your potential with India's most rigorous benchmarking exam. Win up to <span className="text-white font-black">100% scholarship</span> for JEE & NEET preparation.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <button 
                  onClick={() => navigateTo('registration')}
                  className="group relative px-12 py-6 bg-brand-red text-white font-black rounded-2xl shadow-2xl shadow-brand-red/30 hover:bg-white hover:text-black hover:-translate-y-2 transition-all duration-700 uppercase tracking-widest text-sm overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">Register For BK <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" /></span>
                </button>
                <div className="flex items-center gap-4 px-5 py-3 bg-white/5 rounded-2xl border border-white/10 rotate-1 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border-2 border-brand-yellow flex items-center justify-center">
                    <span className="text-brand-yellow text-xl font-black">₹</span>
                  </div>
                  <div>
                    <div className="text-brand-yellow font-black text-xl leading-none">199/-</div>
                    <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Registration Fee</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/5 w-full">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-red/20 blur-[120px] rounded-full animate-pulse"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-[4rem] p-10 md:p-12 backdrop-blur-2xl shadow-2xl glassmorphism overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-50"></div>
                  
                  <div className="space-y-8 relative z-10">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 rounded-full mb-4">
                        <Star size={14} className="text-brand-yellow" />
                        <span className="text-brand-yellow text-[10px] font-black uppercase tracking-widest">Scholarship Tiers</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-white">Up to 100% Off</h3>
                      <p className="text-gray-400 text-sm mt-2">Based on your performance ranking</p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { rank: '1st Rank', discount: '100% Off', color: 'from-yellow-400 to-orange-500', icon: '🥇' },
                        { rank: '2nd - 5th', discount: '75% Off', color: 'from-red-400 to-pink-500', icon: '🥈' },
                        { rank: '6th - 10th', discount: '50% Off', color: 'from-blue-400 to-indigo-500', icon: '🥉' },
                        { rank: '11th - 50th', discount: '25% Off', color: 'from-emerald-400 to-teal-500', icon: '⭐' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-red/30 hover:bg-white/10 transition-all group">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-lg`}>
                              {item.icon}
                            </div>
                            <span className="text-white font-black uppercase tracking-wider text-sm">{item.rank}</span>
                          </div>
                          <span className="text-brand-yellow font-black text-lg">{item.discount}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center">
                          <Calendar size={18} className="text-brand-red" />
                        </div>
                        <div>
                          <div className="text-white font-black text-xs uppercase">Test Dates</div>
                          <div className="text-gray-500 text-[10px]">20th & 27th April 2026</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center">
                          <MapPin size={18} className="text-brand-red" />
                        </div>
                        <div>
                          <div className="text-white font-black text-xs uppercase">Mode</div>
                          <div className="text-gray-500 text-[10px]">Offline & Online</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 80L48 74.7C96 69 192 59 288 53.3C384 48 480 48 576 53.3C672 59 768 69 864 74.7C960 80 1056 80 1152 74.7C1248 69 1344 59 1392 53.3L1440 48V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <CounterStat key={i} value={s.value} label={s.label} icon={s.icon} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-brand-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-brand-red/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-brand-yellow/10 rounded-full blur-[150px]"></div>
        
        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 rounded-full mb-4">
              <Award size={14} className="text-brand-red" />
              <span className="text-brand-red text-[10px] font-black uppercase tracking-widest">Why Participate</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Why Take <span className="text-brand-red">BK Test?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">Join thousands of students who have secured their future through our scholarship program.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-12 bg-brand-dark relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[150px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[150px] translate-y-1/2"></div>
        
        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm mb-4">
              <Globe size={16} className="text-brand-red animate-pulse" />
              <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.4em]">Curriculum Overview</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
              Master The <span className="text-brand-red italic px-2">Test</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Our comprehensive exam pattern is meticulously crafted to evaluate fundamental knowledge and advanced problem-solving capabilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {syllabus.map((s, i) => (
              <SyllabusCard key={i} data={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Exam Centers */}
      <section className="py-12 bg-white relative">
        <div className="container mx-auto px-5 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/5 rounded-full mb-3">
                <MapPin size={14} className="text-brand-red" />
                <span className="text-brand-red text-[10px] font-black uppercase tracking-widest">Global Presence</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-brand-dark uppercase tracking-tighter">Exam Centers</h2>
            </div>
            
            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-gray-100 rounded-[2rem] p-2 shadow-inner">
                <button 
                  onClick={() => setActiveTab('offline')}
                  className={`px-12 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all duration-500 ${activeTab === 'offline' ? 'bg-brand-red text-white shadow-xl shadow-brand-red/20' : 'text-gray-400 hover:text-brand-dark'}`}
                >
                  Offline Center
                </button>
                <button 
                  onClick={() => setActiveTab('online')}
                  className={`px-12 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all duration-500 ${activeTab === 'online' ? 'bg-brand-red text-white shadow-xl shadow-brand-red/20' : 'text-gray-400 hover:text-brand-dark'}`}
                >
                  Online Mode
                </button>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className={`transition-all duration-700 transform ${activeTab ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {activeTab === 'offline' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {centers[activeBoard].map((center, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group/center hover:bg-brand-red/5 hover:border-brand-red/10 transition-all duration-500 hover:-translate-y-1"
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-lg group-hover:shadow-brand-red/10 transition-shadow">
                          <img 
                            src={`https://images.unsplash.com/photo-1596422846543-75c6fc18a593?q=80&w=200&h=200&fit=crop&auto=format`} 
                            alt={center.city}
                            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-black text-brand-dark uppercase tracking-tight text-lg">{center.city}</h4>
                            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-brand-red opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                              <Navigation size={14} />
                            </div>
                          </div>
                          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                            <MapPin size={10} className="text-brand-red" />
                            Nashik Division
                          </p>
                          <div className="flex flex-wrap gap-2">
                             <span className="px-2 py-0.5 bg-brand-red/5 text-brand-red text-[8px] font-black uppercase tracking-widest rounded-md border border-brand-red/10">Active Slot</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 md:p-12 bg-brand-dark rounded-[3rem] text-center relative overflow-hidden group shadow-2xl transition-all hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Globe className="text-brand-red" size={40} />
                      </div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">India's Largest Online Infrastructure</h3>
                      <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
                        Take the exam from any device with AI-monitored proctoring for a fair and transparent evaluation process.
                      </p>
                      <button 
                        onClick={() => navigateTo('registration')}
                        className="mt-8 px-10 py-4 bg-brand-red text-white font-black rounded-xl uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all"
                      >
                        Register for Online Mode
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,50,50,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-14 text-center backdrop-blur-3xl shine-effect relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent"></div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 rounded-full mb-8">
                <Star size={16} className="text-brand-yellow fill-brand-yellow animate-spin-slow" />
                <span className="text-brand-red text-[10px] font-black uppercase tracking-[0.3em]">Special Registrations Open</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
                Ready To <br/>
                <span className="text-brand-red">Transform</span> Your <span className="text-brand-yellow">Future?</span>
              </h2>
              
              <p className="text-slate-400 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                Join a community of high achievers. Secure your spot in the BK Scholarship Test and unlock doors to elite education.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={() => navigateTo('registration')}
                  className="group w-full sm:w-auto px-10 py-5 bg-brand-red text-white font-black rounded-xl shadow-xl shadow-brand-red/30 hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-500 uppercase tracking-widest text-xs pulse-glow flex items-center justify-center gap-3"
                >
                  Register Free <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
                <a 
                  href="mailto:admission@bkscienceacademy.com" 
                  className="w-full sm:w-auto px-10 py-5 border-2 border-white/10 text-white font-black rounded-xl hover:bg-white/5 hover:-translate-y-1 transition-all duration-500 uppercase tracking-widest text-xs backdrop-blur-sm flex items-center justify-center"
                >
                  Download Brochure
                </a>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-10">
                <div className="text-center">
                  <div className="text-xl font-black text-white">88,883+</div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Students Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-white">20th April</div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Next Test Date</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-white">Nashik</div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Primary Center</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .glassmorphism {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .shine-effect::after {
          content: '';
          position: absolute;
          top: -100%;
          left: -100%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.05) 50%,
            transparent 60%,
            transparent 100%
          );
          transition: all 0.7s;
        }
        .shine-effect:hover::after {
          top: 100%;
          left: 100%;
        }
        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.2); }
          50% { box-shadow: 0 0 40px rgba(220, 38, 38, 0.4); }
        }
        .tilt-card {
          transition: transform 0.3s ease-out;
          transform-style: preserve-3d;
        }
        .spotlight::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.06),
            transparent 40%
          );
          z-index: 3;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s;
        }
        .spotlight:hover::before {
          opacity: 1;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default MOSTPage;