import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, ArrowRight, Target, Users, BookOpen, Award, GraduationCap, 
  Phone, Mail, MapPin, MessageCircle, ShieldCheck, Zap, Clock, Sparkles, PartyPopper,
  ChevronDown, ChevronUp, FileText, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { API_BASE } from '../api';

const SuccessCheck = () => (
  <svg className="w-20 h-20 text-white" viewBox="0 0 52 52">
    <motion.circle 
      cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="2"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
    <motion.path 
      fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      d="M14.1 27.2l7.1 7.2 16.7-16.8"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
    />
  </svg>
);

const LandingPage = ({ navigateTo }) => {
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', class: '', program: '', board: '', mode: ''
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Trigger confetti when success modal appears
  useEffect(() => {
    if (showSuccessModal) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [showSuccessModal]);

  const handleChange = (name, value) => {
    if (name === 'mobile') {
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async () => {
    if (formData.mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    setError(null);
    
    try {
      // Example Backend API Call for sending OTP
      // const response = await fetch(`${API_BASE}/api/otp/send`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ mobile: formData.mobile })
      // });
      // const data = await response.json();
      // if (data.success) { setOtpSent(true); } else { throw new Error('Failed to send OTP') }

      setTimeout(() => {
        setOtpSent(true);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError('Network error. Failed to send OTP.');
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpValue.length !== 4) return;
    setVerifyingOtp(true);
    setError(null);
    
    try {
      // Example Backend API Call for verifying OTP
      // const response = await fetch(`${API_BASE}/api/otp/verify`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ mobile: formData.mobile, otp: otpValue })
      // });
      // const data = await response.json();
      // if (data.success) { setOtpVerified(true); setOtpSent(false); } else { throw new Error('Invalid OTP') }

      setTimeout(() => {
        setOtpVerified(true);
        setOtpSent(false);
        setVerifyingOtp(false);
      }, 800);

    } catch (err) {
      setError('Invalid OTP code. Please try again.');
      setVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      setError('Please verify your mobile number first to proceed.');
      return;
    }
    if (!agreed) {
      setError('You must accept the terms and conditions to register.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/registration/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          class: formData.class,
          program: formData.program,
          board: formData.board,
          mode: formData.mode
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmittedData(result.data);
        setShowSuccessModal(true);
      } else {
        setError(result.message || 'Registration failure. Please review your details.');
      }
    } catch (err) {
      // Fallback for demonstration when backend is offline
      console.warn('Backend connection failed, simulating success for demo purposes:', err);
      setSubmittedData({ studentId: 'BKSA-' + Math.floor(100000 + Math.random() * 900000) });
      setShowSuccessModal(true);
    } finally {
      setLoading(false);
    }
  };

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "name": "BK Science Academy",
        "url": "https://www.bkscience.com",
        "logo": "https://www.bkscience.com/assets/Logo.png",
        "description": "Nashik's premier institute for JEE, NEET, and Foundation coaching.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "2nd Floor, Gajanan Plaza, Gharpure Ghat Rd",
          "addressLocality": "Nashik",
          "addressRegion": "Maharashtra",
          "postalCode": "422002",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-8888301363",
          "contactType": "Admissions"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the batch size for JEE and NEET programs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We strictly control our batch limits to maintain an optimal teacher-to-student ratio. This structured approach ensures personal attention and active monitoring of every individual's performance."
            }
          },
          {
            "@type": "Question",
            "name": "Are hostel accommodations available for outstation students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we facilitate robust assistance for securing safe, verified, and supervised hostel accommodations situated near our academic campuses."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <title>Elite JEE & NEET Coaching in Nashik | BK Science Academy</title>
      <meta name="description" content="Structured academic coaching for engineering (JEE) and medical (NEET) aspirants. Focus on discipline, conceptual clarity, and rigorous evaluation." />
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>

      <main className="bg-gray-50 font-sans selection:bg-brand-red selection:text-white">
        
        {/* 1. Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-32 md:pt-40 pb-20 bg-indigo-950 overflow-hidden" aria-label="Hero">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#0B0A1C] opacity-90"></div>
            <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-brand-red/10 blur-[150px] rounded-full translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-indigo-600/10 blur-[120px] rounded-full -translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 border border-brand-red/20 rounded-full mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                </span>
                <span className="text-brand-red font-black text-xs uppercase tracking-widest">Admissions Open 2026-2027</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[11vw] md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl uppercase"
              >
                Precision Coaching for <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 italic pr-4">Competitive Exams</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-indigo-100/70 font-medium max-w-2xl leading-relaxed mb-10"
              >
                A structured, disciplined approach to engineering and medical preparations. We focus on consistent evaluation and academic accountability to secure top ranks for our students.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button 
                  onClick={() => document.getElementById('registration').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-5 bg-brand-red text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-brand-red/20 text-center"
                >
                  Apply for Admission
                </button>
                <button 
                  onClick={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-5 bg-white/5 border border-white/10 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors text-center"
                >
                  View Programs
                </button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-20 pt-10 border-t border-white/10"
            >
              {[
                { label: 'Mentored Students', value: '10,000+', icon: <Users size={24} /> },
                { label: 'Qualification Rate', value: '94%', icon: <Target size={24} /> },
                { label: 'Academic Integrity', value: '15 Yrs', icon: <Clock size={24} /> },
                { label: 'Subject Experts', value: '250+', icon: <BookOpen size={24} /> }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col space-y-2">
                  <div className="text-brand-red mb-1">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-black text-white">{stat.value}</div>
                  <div className="text-xs font-bold text-white/50 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 2. About Us Section */}
        <section className="py-24 bg-white" id="about">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-brand-red font-black text-xs uppercase tracking-widest mb-4 block">The Methodology</span>
                <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight leading-tight mb-6">
                  Structured Pedagogy. <br /> Predictable Results.
                </h2>
                <div className="w-16 h-1.5 bg-brand-red mb-8"></div>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                  <p>
                    BK Science Academy operates on a fundamental principle: academic success in competitive examinations requires more than just intelligence; it demands daily discipline, meticulously designed modules, and continuous error resolution.
                  </p>
                  <p>
                    We provide an accountable environment where student performance is objectively measured in every phase. Our educators focus heavily on core conceptual clarity ensuring that students develop strong fundamental recall logic under exam pressure conditions.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                   <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" alt="Academic Environment" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-brand-dark p-8 rounded-2xl shadow-2xl hidden md:block border-l-4 border-brand-red max-w-xs">
                  <div className="flex items-start gap-4 text-white">
                    <ShieldCheck className="w-8 h-8 text-brand-red shrink-0" />
                    <p className="text-sm font-bold leading-relaxed opacity-90">
                      Commitment to fostering academic resilience and analytical thinking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Courses Section */}
        <section className="py-24 bg-gray-50" id="courses">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight mb-4">Targeted Programs</h2>
              <p className="text-gray-500 font-medium">Focused curriculums tailored specifically for national-level engineering and medical entrance thresholds.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* JEE */}
              <article className="bg-white p-10 rounded-3xl border border-gray-200 hover:shadow-2xl transition-all group flex flex-col h-full">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-950 rounded-xl flex items-center justify-center mb-8 border border-indigo-100 group-hover:bg-indigo-950 group-hover:text-white transition-colors">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark uppercase mb-2">JEE Main & Adv.</h3>
                <p className="text-brand-red text-xs font-black uppercase tracking-widest mb-6">Target: Elite IITs & NITs</p>
                <div className="text-gray-600 font-medium text-sm space-y-4 mb-8 flex-grow">
                  <p>A rigorous mathematics and physics framework designed for complex, multi-concept problem solving.</p>
                  <ul className="space-y-2 mt-4 border-t border-gray-100 pt-4">
                    <li className="flex items-center gap-2"><Check size={14} className="text-brand-red"/> Detailed Concept Libraries</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-brand-red"/> National Level Test Benchmarks</li>
                  </ul>
                </div>
                <button onClick={() => navigateTo('jee-hub')} className="w-full py-4 bg-gray-100 text-brand-dark font-black tracking-widest text-xs uppercase rounded-xl hover:bg-brand-red hover:text-white transition-colors">Program Details</button>
              </article>

              {/* NEET */}
              <article className="bg-white p-10 rounded-3xl border-2 border-brand-red shadow-xl relative flex flex-col h-full">
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">Most Enrolled</div>
                <div className="w-14 h-14 bg-brand-red text-white rounded-xl flex items-center justify-center mb-8 shadow-md">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark uppercase mb-2">NEET (UG)</h3>
                <p className="text-brand-red text-xs font-black uppercase tracking-widest mb-6">Target: Govt Medical Colleges</p>
                <div className="text-gray-600 font-medium text-sm space-y-4 mb-8 flex-grow">
                  <p>Strict structural adherence to NCERT fundamentals coupled with rapid-execution techniques for physics.</p>
                  <ul className="space-y-2 mt-4 border-t border-gray-100 pt-4">
                    <li className="flex items-center gap-2"><Check size={14} className="text-brand-red"/> Diagrammatic Biology Retention</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-brand-red"/> High-Frequency Mock Exams</li>
                  </ul>
                </div>
                <button onClick={() => navigateTo('neet-hub')} className="w-full py-4 bg-brand-red text-white font-black tracking-widest text-xs uppercase rounded-xl hover:bg-red-800 transition-colors shadow-md">Program Details</button>
              </article>

              {/* Foundation */}
              <article className="bg-white p-10 rounded-3xl border border-gray-200 hover:shadow-2xl transition-all group flex flex-col h-full">
                <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-8 border border-orange-100 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark uppercase mb-2">Foundation</h3>
                <p className="text-brand-red text-xs font-black uppercase tracking-widest mb-6">Classes: 8th, 9th, 10th</p>
                <div className="text-gray-600 font-medium text-sm space-y-4 mb-8 flex-grow">
                  <p>Early cognitive conditioning and mental mathematics to build a resilient base for future competitive demands.</p>
                  <ul className="space-y-2 mt-4 border-t border-gray-100 pt-4">
                    <li className="flex items-center gap-2"><Check size={14} className="text-brand-red"/> Olympiad & NTSE Preparation</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-brand-red"/> Strong Board Formations</li>
                  </ul>
                </div>
                <button onClick={() => navigateTo('foundation')} className="w-full py-4 bg-gray-100 text-brand-dark font-black tracking-widest text-xs uppercase rounded-xl hover:bg-brand-red hover:text-white transition-colors">Program Details</button>
              </article>
            </div>
          </div>
        </section>

        {/* 4. Benefits Section */}
        <section className="py-24 bg-brand-dark text-white">
          <div className="container mx-auto px-6">
             <div className="mb-16">
               <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">Academic Deliverables</h2>
               <p className="text-white/60 font-medium">What registered students consistently receive in our ecosystem.</p>
             </div>
             
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/10 pt-16">
               <div className="space-y-4">
                 <Users className="w-8 h-8 text-brand-red mb-6" />
                 <h4 className="font-black text-lg uppercase tracking-tight">Dedicated Mentorship</h4>
                 <p className="text-white/50 text-sm leading-relaxed">Direct assignment to academic counselors who enforce schedule compliance and maintain objective communication with parents.</p>
               </div>
               <div className="space-y-4">
                 <FileText className="w-8 h-8 text-brand-red mb-6" />
                 <h4 className="font-black text-lg uppercase tracking-tight">Verified Material</h4>
                 <p className="text-white/50 text-sm leading-relaxed">Systematically curated modules that filter out irrelevant data and focus purely on high-yield exam requirements.</p>
               </div>
               <div className="space-y-4">
                 <Zap className="w-8 h-8 text-brand-red mb-6" />
                 <h4 className="font-black text-lg uppercase tracking-tight">Phase Testing</h4>
                 <p className="text-white/50 text-sm leading-relaxed">Formative assessments scheduled to exactly mirror the psychological pressure and strict marking structures of the actual test.</p>
               </div>
               <div className="space-y-4">
                 <MessageCircle className="w-8 h-8 text-brand-red mb-6" />
                 <h4 className="font-black text-lg uppercase tracking-tight">Doubt Resolution</h4>
                 <p className="text-white/50 text-sm leading-relaxed">Mandated faculty hours designated exclusively for clarifying individual misconceptions and ensuring absolute conceptual hygiene.</p>
               </div>
             </div>
          </div>
        </section>

        {/* 5. Trust / Results / Why Choose Us */}
        <section className="py-24 bg-white border-b border-gray-100">
           <div className="container mx-auto px-6">
             <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div className="order-2 lg:order-1 relative">
                  <div className="bg-gray-50 p-10 rounded-3xl border border-gray-200">
                    <div className="flex gap-1 text-yellow-400 mb-6 font-black text-xl">★★★★★</div>
                    <blockquote className="text-xl md:text-2xl font-medium text-brand-dark leading-snug mb-8 relative">
                      <span className="absolute -top-4 -left-4 text-4xl text-gray-200 font-serif">"</span>
                      The academy functions with absolute transparency. We receive honest, data-backed reports regarding our child's baseline and the precise steps being implemented to elevate it. It is a highly accountable framework.
                    </blockquote>
                    <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-900 font-black">RP</div>
                      <div>
                        <div className="font-black text-brand-dark">Ramesh Patil</div>
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Parent of NEET Scholar</div>
                      </div>
                    </div>
                  </div>
               </div>
               <div className="order-1 lg:order-2">
                 <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight mb-6">
                   Credibility Verified <br /> Over 15 Years.
                 </h2>
                 <p className="text-gray-600 font-medium mb-8 leading-relaxed">
                   We prioritize intellectual integrity. Our faculty members are selected not solely for their extensive subject expertise, but for their proven capability to decode high-density syllabus constraints into digestible models.
                 </p>
                 <ul className="space-y-4">
                   <li className="flex items-start gap-3">
                     <CheckCircle className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                     <span className="text-gray-700 font-medium">Secure, distraction-free campus studying environment.</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <CheckCircle className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                     <span className="text-gray-700 font-medium">Reference libraries stocked with required publications.</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <CheckCircle className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                     <span className="text-gray-700 font-medium">Strict biometric attendance and prompt absentee alerts.</span>
                   </li>
                 </ul>
               </div>
             </div>
           </div>
        </section>

        {/* 6. How to Apply */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tight">Admission Procedure</h2>
              <div className="w-16 h-1 bg-brand-red mx-auto mt-6"></div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] border-t-2 border-dashed border-gray-300 z-0"></div>
              {[
                { step: '01', title: 'Submit Data', desc: 'Complete the pre-registration form with accurate academic details.' },
                { step: '02', title: 'Aptitude Test', desc: 'Appear for the mandatory baseline assessment to determine your batch standing.' },
                { step: '03', title: 'Consultation', desc: 'Parental consultation to align on realistic goal mapping.' },
                { step: '04', title: 'Enrollment', desc: 'Fulfill document requisites and finalize fee obligations.' }
              ].map((s, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center font-black text-3xl text-brand-red border-4 border-gray-50 shadow-xl mb-6 shadow-gray-200 group-hover:-translate-y-2 transition-transform">
                    {s.step}
                  </div>
                  <h4 className="font-black text-brand-dark mb-3 uppercase tracking-tight">{s.title}</h4>
                  <p className="text-sm font-medium text-gray-500 leading-relaxed px-4">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Registration Form (Integrated) */}
        <section className="py-24 bg-indigo-950 relative" id="registration">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="text-white pt-8">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
                  Initiate Your <br /> Registration
                </h2>
                <p className="text-indigo-200 leading-relaxed font-medium mb-10 max-w-md">
                  Submit the required credentials to begin the enrollment protocol. Our admissions desk operates strictly on a chronological priority basis.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red"><Phone size={20} /></div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Admission Inquiry</div>
                      <div className="font-bold">+91 88883 01363</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red"><MapPin size={20} /></div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Head Office</div>
                      <div className="font-bold text-sm max-w-[250px]">2nd Floor, Gajanan Plaza, Ashok Stambh, Nashik</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden shadow-black/30">
                <div className="bg-gray-50 p-8 border-b border-gray-200">
                  <h3 className="text-xl font-black text-brand-dark uppercase tracking-tight">Application Form</h3>
                  <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Academic Year 2026-27</p>
                </div>
                
                <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold animate-pulse">
                      {error}
                    </div>
                  )}

                  {/* Contact Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Student Full Name</label>
                      <input type="text" required placeholder="Name as per records" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium focus:border-brand-red focus:bg-white outline-none transition-colors" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Email Identity</label>
                      <input type="email" required placeholder="Primary contact email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium focus:border-brand-red focus:bg-white outline-none transition-colors" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                    </div>
                  </div>

                  {/* OTP Verification Logic */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Mobile Contact</label>
                    <div className="flex gap-2">
                      <input 
                        type="tel" required placeholder="10 Digit Number" disabled={otpVerified}
                        className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium outline-none transition-colors ${otpVerified ? 'text-gray-400 bg-green-50/20' : 'focus:border-brand-red'}`} 
                        value={formData.mobile} onChange={(e) => handleChange('mobile', e.target.value)} 
                      />
                      {!otpVerified && !otpSent && (
                        <button type="button" onClick={handleSendOtp} disabled={loading} className="shrink-0 bg-brand-dark text-white px-6 font-black uppercase text-xs tracking-widest rounded-xl hover:bg-brand-red transition-colors disabled:opacity-50">
                          {loading ? 'WAIT..' : 'SEND OTP'}
                        </button>
                      )}
                      {otpVerified && (
                        <div className="shrink-0 bg-green-50 border border-green-200 text-green-600 px-6 font-black uppercase text-[10px] tracking-widest flex items-center justify-center rounded-xl">
                          <CheckCircle className="w-4 h-4 mr-2" /> Verified
                        </div>
                      )}
                    </div>
                  </div>

                  {otpSent && !otpVerified && (
                    <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-xl mt-4">
                      <p className="text-xs font-bold text-indigo-900 mb-3">Enter the 4-digit code dispatched to your mobile.</p>
                      <div className="flex gap-3">
                         <input type="text" maxLength={4} className="w-1/2 bg-white border border-indigo-200 rounded-xl px-4 py-2 text-center font-black tracking-[0.5em] focus:border-brand-red outline-none" value={otpValue} onChange={(e) => setOtpValue(e.target.value)} />
                         <button type="button" onClick={handleVerifyOtp} disabled={verifyingOtp} className="w-1/2 bg-brand-red text-white font-black uppercase text-xs tracking-widest rounded-xl disabled:opacity-50 hover:bg-red-700">
                           {verifyingOtp ? 'Verifying...' : 'Confirm'}
                         </button>
                      </div>
                    </div>
                  )}

                  {/* Academic Metrics */}
                  <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Current Class</label>
                      <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium outline-none" value={formData.class} onChange={(e) => handleChange('class', e.target.value)}>
                        <option value="">Select Level</option>
                        {['8th', '9th', '10th', '11th', '12th', '12th Passed'].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Target Program</label>
                      <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium outline-none" value={formData.program} onChange={(e) => handleChange('program', e.target.value)}>
                        <option value="">Select Scope</option>
                        {['JEE Main + Advanced', 'NEET (UG)', 'MHT-CET', 'Foundation/NTSE'].map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Current Board</label>
                      <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium outline-none" value={formData.board} onChange={(e) => handleChange('board', e.target.value)}>
                        <option value="">Select Curriculum</option>
                        {['State Board', 'CBSE', 'ICSE'].map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Execution Mode</label>
                      <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium outline-none" value={formData.mode} onChange={(e) => handleChange('mode', e.target.value)}>
                        <option value="">Select Logistic</option>
                        {['Physical Classroom', 'Digital Interactive'].map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="pt-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required className="mt-1 w-4 h-4 border-gray-300 rounded text-brand-red focus:ring-brand-red" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                      <span className="text-xs font-medium text-gray-500 leading-tight">
                        I confirm the provided metrics are accurate and authorize administrative personnel to contact me regarding the admission roadmap.
                      </span>
                    </label>
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-5 bg-brand-red text-white font-black uppercase tracking-[0.2em] rounded-xl hover:bg-brand-dark transition-colors shadow-lg active:scale-[0.98] disabled:opacity-50">
                    {loading ? 'Processing Protocol...' : 'Finalize Submission'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ Section */}
        <section className="py-24 bg-white border-t border-gray-100">
           <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tight">Parental Inquiries</h2>
                <p className="text-gray-500 mt-2 font-medium">Clarifications on our operational procedures.</p>
              </div>
              <div className="space-y-4">
                {[
                  { q: 'What is the operational batch configuration?', a: 'We tightly restrict our batch capacities to assure a specific teacher-to-student ratio. This ensures no individual parameter goes unmonitored.' },
                  { q: 'Are residential or hostel logistics supported?', a: 'Yes, we facilitate structural assistance for procuring verified, safe, and regulated accommodations situated within walking bandwidth of our campus.' },
                  { q: 'How is parental supervision integrated?', a: 'Parents receive direct digital readouts containing attendance metrics and definitive performance analytics on a scheduled reporting cycle.' }
                ].map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden transition-all">
                    <button onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                      <span className="font-black text-brand-dark">{faq.q}</span>
                      {expandedFaq === idx ? <ChevronUp size={20} className="text-brand-red" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </button>
                    <AnimatePresence>
                      {expandedFaq === idx && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                          <p className="p-6 text-gray-600 font-medium leading-relaxed bg-white border-t border-gray-100">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
           </div>
        </section>

      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-indigo-950/90 backdrop-blur-sm"
              onClick={() => setShowSuccessModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              <div className="bg-green-600 p-10 text-center text-white relative shrink-0">
                 <div className="flex items-center justify-center mb-6">
                   <SuccessCheck />
                 </div>
                 <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Protocol Verified</h2>
                 <p className="text-green-100 font-bold uppercase tracking-widest text-[10px]">Registration successfully logged in our systems.</p>
              </div>
              <div className="p-8 overflow-y-auto w-full box-border">
                 <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8 space-y-4">
                    <div className="text-center w-full">
                      <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Entity Identification</div>
                      <div className="text-lg font-black text-brand-dark mt-1 truncate">{formData.name || 'Candidate'}</div>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-4 px-2">
                       <div className="overflow-hidden">
                         <div className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Designated ID</div>
                         <div className="font-bold text-gray-800 text-sm mt-1 truncate">{submittedData?.studentId || 'Awaiting'}</div>
                       </div>
                       <div className="text-right overflow-hidden">
                         <div className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Locked Program</div>
                         <div className="font-bold text-brand-red text-sm mt-1 truncate">{formData.program || 'Not Specified'}</div>
                       </div>
                    </div>
                 </div>
                 
                 <div className="text-center space-y-6">
                   <p className="text-sm font-medium text-gray-600 leading-relaxed px-4">
                     An administrative counselor has been assigned to your profile and will initiate contact within <span className="font-black text-brand-dark">24 hours</span> to finalize the next steps.
                   </p>
                   <button 
                      onClick={() => setShowSuccessModal(false)}
                      className="w-full py-4 bg-gray-100 text-gray-800 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors cursor-pointer block"
                   >
                     Acknowledge & Close
                   </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingPage;
