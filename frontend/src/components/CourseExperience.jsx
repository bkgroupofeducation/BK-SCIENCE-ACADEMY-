import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Activity, 
  Cpu, 
  ShieldCheck, 
  BarChart3, 
  Library, 
  Award, 
  Lightbulb, 
  TrendingUp, 
  UserCheck, 
  BookOpen, 
  Video, 
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Fingerprint
} from 'lucide-react';
import SafeImage from './SafeImage';

const CourseExperience = ({ courseType, navigateTo }) => {
  const configs = {
    'jee': {
      title: "JEE (Main & Advanced) | Future Engineers Program",
      subtitle: "Where discipline, technology, and elite mentorship create future IITians.",
      themeColor: "from-blue-600 via-indigo-900 to-black",
      accentGlow: "rgba(37, 99, 235, 0.4)",
      neonText: "text-blue-400",
      stats: [
        { label: "Engineering Visuals", icon: <Cpu className="text-blue-400" /> },
        { label: "Digital Formulas", icon: <Zap className="text-orange-400" /> },
        { label: "Advanced Numericals", icon: <TrendingUp className="text-blue-400" /> }
      ],
      testFocus: "Advanced numerical problem-solving tests",
      libraryFocus: "Advanced reference books & numericals",
      mentors: "IIT-focused mentors"
    },
    'neet': {
      title: "Medical NEET | Future Doctors Mission",
      subtitle: "Precision learning for future medical achievers.",
      themeColor: "from-teal-600 via-slate-900 to-black",
      accentGlow: "rgba(20, 184, 166, 0.4)",
      neonText: "text-teal-400",
      stats: [
        { label: "Medical Holograms", icon: <Activity className="text-teal-400" /> },
        { label: "Anatomy Graphics", icon: <UserCheck className="text-rose-400" /> },
        { label: "Lab-Style Environment", icon: <ShieldCheck className="text-teal-400" /> }
      ],
      testFocus: "Biology + MCQ precision practice",
      libraryFocus: "Medical preparation modules",
      mentors: "Medical mentors"
    },
    'mht-cet': {
      title: "MHT-CET | Maharashtra Excellence Program",
      subtitle: "Focused preparation for Maharashtra’s top engineering and medical colleges.",
      themeColor: "from-purple-600 via-slate-900 to-black",
      accentGlow: "rgba(147, 51, 234, 0.4)",
      neonText: "text-purple-400",
      stats: [
        { label: "Maharashtra Ecosystem", icon: <Cpu className="text-purple-400" /> },
        { label: "Science & Engineering", icon: <Lightbulb className="text-cyan-400" /> },
        { label: "Smart Classroom", icon: <Video className="text-purple-400" /> }
      ],
      testFocus: "Speed + concept-based tests",
      libraryFocus: "CET-focused resources",
      mentors: "CET specialists"
    },
    'nda': {
      title: "NDA | Defence Leadership Academy",
      subtitle: "Building discipline, confidence, leadership, and national pride.",
      themeColor: "from-emerald-700 via-zinc-900 to-black",
      accentGlow: "rgba(16, 185, 129, 0.4)",
      neonText: "text-emerald-400",
      stats: [
        { label: "Defence Atmosphere", icon: <ShieldCheck className="text-emerald-400" /> },
        { label: "Leadership Visuals", icon: <Award className="text-amber-400" /> },
        { label: "Military Aesthetics", icon: <Zap className="text-emerald-400" /> }
      ],
      testFocus: "Written + discipline-based assessments",
      libraryFocus: "Defence studies & aptitude materials",
      mentors: "Defence-oriented trainers"
    },
    'boards': {
      title: "State Board | Academic Excellence Program",
      subtitle: "Strong concepts, consistent practice, and academic excellence.",
      themeColor: "from-blue-700 via-slate-900 to-black",
      accentGlow: "rgba(29, 78, 216, 0.4)",
      neonText: "text-blue-300",
      stats: [
        { label: "Academic Foundation", icon: <BookOpen className="text-blue-300" /> },
        { label: "Learning Ecosystem", icon: <Library className="text-white" /> },
        { label: "Concept-Based Learning", icon: <Lightbulb className="text-blue-300" /> }
      ],
      testFocus: "Strong conceptual weekly evaluations",
      libraryFocus: "Strong academic foundation materials",
      mentors: "Academic excellence faculty"
    },
    'foundation': {
      title: "State Board | Academic Excellence Program",
      subtitle: "Strong concepts, consistent practice, and academic excellence.",
      themeColor: "from-blue-700 via-slate-900 to-black",
      accentGlow: "rgba(29, 78, 216, 0.4)",
      neonText: "text-blue-300",
      stats: [
        { label: "Academic Foundation", icon: <BookOpen className="text-blue-300" /> },
        { label: "Learning Ecosystem", icon: <Library className="text-white" /> },
        { label: "Concept-Based Learning", icon: <Lightbulb className="text-blue-300" /> }
      ],
      testFocus: "Strong conceptual weekly evaluations",
      libraryFocus: "Strong academic foundation materials",
      mentors: "Academic excellence faculty"
    },

  };

  const config = configs[courseType.toLowerCase()] || configs['jee'];

  const GlassCard = ({ children, className = "" }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[1.75rem] p-4 md:p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl ${className}`}
    >
      {children}
    </motion.div>
  );

  return (
    <section className="bg-black py-8 md:py-12 overflow-hidden relative selection:bg-white selection:text-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(circle_at_50%_0%,${config.accentGlow}_0%,transparent_70%)]`}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #444 1px, transparent 1px), linear-gradient(to bottom, #444 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
        
        {/* Floating Particles Simulation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.5, 1],
                y: [0, -100, 0],
                x: [0, 50, 0]
              }}
              transition={{ 
                duration: 10 + Math.random() * 20, 
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%` 
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Experience */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-[0.4em] mb-6">
              Premium Educational Ecosystem
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-6">
              {config.title.split('|')[0]}
              <span className={`block italic mt-3 text-transparent bg-clip-text bg-gradient-to-r ${config.themeColor.includes('indigo') ? 'from-blue-400 to-indigo-500' : 'from-teal-400 to-emerald-500'}`}>
                {config.title.split('|')[1]}
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
              {config.subtitle}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {config.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-xl"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className="text-xs font-black text-white uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-5 mb-8">
          {/* Smart Attendance */}
          <GlassCard>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500/20 rounded-lg md:rounded-xl flex items-center justify-center text-blue-400 mb-3 md:mb-5 border border-blue-500/30">
              <Fingerprint size={16} className="md:w-6 md:h-6" />
            </div>
            <h3 className="text-sm md:text-xl font-black text-white uppercase tracking-tight mb-2 md:mb-3">Smart Attendance</h3>
            <p className="text-gray-500 text-[10px] md:text-sm font-bold mb-4 md:mb-6 leading-relaxed">
              Biometric thumb attendance with real-time parent notifications via our dedicated mobile app.
            </p>
            <ul className="space-y-3">
              {['Live Tracking', 'AI-Powered Analytics', 'QR Integration'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-black text-white/70 uppercase tracking-widest">
                  <CheckCircle2 size={14} className="text-blue-400" /> {f}
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Performance Analytics */}
          <GlassCard>
            <div className="flex flex-col gap-6 h-full">
              <div className="flex-1">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-500/20 rounded-lg md:rounded-xl flex items-center justify-center text-orange-400 mb-3 md:mb-5 border border-orange-500/30">
                  <BarChart3 size={16} className="md:w-6 md:h-6" />
                </div>
                <h3 className="text-sm md:text-xl font-black text-white uppercase tracking-tight mb-2 md:mb-3">Performance Analytics</h3>
                <p className="text-gray-500 text-[10px] md:text-sm font-bold mb-4 md:mb-6 leading-relaxed">
                  {config.testFocus}. Detailed rank prediction and subject-wise progress heatmaps.
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1.5 md:px-5 md:py-3 bg-white/5 rounded-lg md:rounded-xl border border-white/10 text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">Weekly Mock Tests</div>
                  <div className="px-3 py-1.5 md:px-5 md:py-3 bg-white/5 rounded-lg md:rounded-xl border border-white/10 text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">AI Progress Reports</div>
                </div>
              </div>
              <div className="flex-1 bg-white/5 rounded-3xl border border-white/10 p-6 flex items-center justify-center relative overflow-hidden">
                {/* Mock Chart Visual */}
                <div className="w-full space-y-4">
                   {[80, 45, 95, 60].map((w, i) => (
                     <div key={i} className="space-y-1.5">
                       <div className="flex justify-between text-[8px] font-black text-white/50 uppercase">
                         <span>Subject {i+1}</span>
                         <span>{w}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${w}%` }}
                           className={`h-full bg-gradient-to-r ${config.themeColor.includes('teal') ? 'from-teal-400 to-emerald-500' : 'from-blue-400 to-indigo-500'}`}
                         />
                       </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Digital Library */}
          <GlassCard>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500/20 rounded-lg md:rounded-xl flex items-center justify-center text-emerald-400 mb-3 md:mb-5 border border-emerald-500/30">
              <Library size={16} className="md:w-6 md:h-6" />
            </div>
            <h3 className="text-sm md:text-xl font-black text-white uppercase tracking-tight mb-2 md:mb-3">Knowledge Vault</h3>
            <p className="text-gray-500 text-[10px] md:text-sm font-bold mb-4 md:mb-6 leading-relaxed">
              {config.libraryFocus}. E-library access with silent study zones and premium study materials.
            </p>
            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center gap-4 group/btn cursor-pointer">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover/btn:bg-white/10 transition-colors">
                <BookOpen size={18} className="text-emerald-400" />
              </div>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Access Digital Assets</span>
            </div>
          </GlassCard>

          {/* Student Amenities */}
          <GlassCard>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-500/20 rounded-lg md:rounded-xl flex items-center justify-center text-amber-400 mb-3 md:mb-5 border border-amber-500/30">
              <Award size={16} className="md:w-6 md:h-6" />
            </div>
            <h3 className="text-sm md:text-xl font-black text-white uppercase tracking-tight mb-2 md:mb-3">Premium Amenities</h3>
            <p className="text-gray-500 text-[10px] md:text-sm font-bold mb-4 md:mb-6 leading-relaxed">
              Ergonomic seating, air-cooled classrooms, RO water, and high-speed campus internet.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {['Smart Boards', 'CCTV Security', 'Support Desk', 'Doubt Cabins'].map((a, i) => (
                <div key={i} className="px-3 py-2 bg-white/5 rounded-lg border border-white/5 text-[8px] font-black text-white/60 uppercase text-center">{a}</div>
              ))}
            </div>
          </GlassCard>

          {/* Mentorship */}
          <GlassCard className="md:col-span-2">
            <div className={`w-8 h-8 md:w-10 md:h-10 bg-indigo-500/20 rounded-lg md:rounded-xl flex items-center justify-center ${config.neonText} mb-3 md:mb-5 border border-indigo-500/30`}>
              <UserCheck size={16} className="md:w-6 md:h-6" />
            </div>
            <h3 className="text-sm md:text-xl font-black text-white uppercase tracking-tight mb-2 md:mb-3">Expert Mentorship</h3>
            <p className="text-gray-500 text-[10px] md:text-sm font-bold mb-4 md:mb-6 leading-relaxed">
              {config.mentors}. One-to-one guidance and personalized consistency monitoring.
            </p>
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-[10px] font-black text-white">M{i}</div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-black bg-white/10 backdrop-blur-md flex items-center justify-center text-[8px] font-black text-white">+Expert</div>
            </div>
          </GlassCard>
        </div>

        {/* Success Culture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 lg:p-12 text-center"
        >
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent`}></div>
          
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter mb-6">
              Discipline & <span className={config.neonText}>Success Culture</span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed mb-8">
              Join an ecosystem where accountability meets ambition. We build the "Ranker Mindset" through daily consistency and a high-performance academic atmosphere.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { title: "Ranker Mindset", desc: "Elite competitive focus" },
                { title: "Consistency", desc: "Daily accountability" },
                { title: "Atmosphere", desc: "Disciplined excellence" }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className={`text-2xl font-black ${config.neonText} mb-2 tracking-tighter`}>{item.title}</div>
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <div className="mt-12 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[0.9] mb-8">
              Your Dream Career <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Starts Here.</span>
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => navigateTo('registration')}
                className="px-8 py-4.5 bg-white text-black font-black rounded-xl text-xs uppercase tracking-widest hover:bg-brand-red hover:text-white transition-all duration-500 group flex items-center gap-2"
              >
                Apply Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigateTo('contact')}
                className="px-8 py-4.5 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-500"
              >
                Book Counseling
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-10">
               <div className="text-center">
                 <div className="text-2xl font-black text-white tracking-tighter">2026-27</div>
                 <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Admission Open</div>
               </div>
               <div className="w-[1px] h-10 bg-white/10"></div>
               <div className="text-center">
                 <div className="text-2xl font-black text-white tracking-tighter">Limited</div>
                 <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Batch Strength</div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CourseExperience;
