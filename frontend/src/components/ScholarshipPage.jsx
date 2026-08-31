import React, { useState, useEffect, useRef } from 'react';
import { apiFetch } from '../api';
import { motion } from 'framer-motion';
import { X, Sparkles, CheckCircle, Ticket, User, Phone, Bot } from 'lucide-react';

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

const CounterStat = ({ value, label, icon, delay }) => {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-3xl md:text-4xl mb-2">{icon}</div>
      <div className="text-2xl md:text-3xl lg:text-4xl font-black text-brand-dark">{value}</div>
      <div className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">{label}</div>
    </div>
  );
};

const StepCard = ({ step, index }) => {
  const [ref, isVisible] = useInView();

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Connector line */}
      {index < 3 && (
        <div className="hidden lg:block absolute top-10 left-[calc(50%+60px)] w-[calc(100%-120px)] h-0.5 bg-gradient-to-r from-brand-red/30 to-brand-red/10 z-0"></div>
      )}

      <div className="relative bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 p-6 md:p-8 text-center
        transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-red/10 hover:border-brand-red/20 z-10">
        {/* Step Number */}
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-brand-red text-white flex items-center justify-center font-black text-xl md:text-2xl mx-auto mb-5 shadow-lg shadow-brand-red/30 group-hover:scale-110 transition-transform duration-500">
          {step.number}
        </div>

        <h3 className="text-lg md:text-xl font-black text-brand-dark mb-2 tracking-tight">{step.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
      </div>
    </div>
  );
};

const ScholarshipCard = ({ scholarship, index, onSelect }) => {
  const [ref, isVisible] = useInView();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(scholarship)}
      className={`group relative bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden cursor-pointer
        transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-brand-red/10 hover:border-brand-red/20
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
      style={{ transitionDelay: isVisible ? '0ms' : `${index * 100}ms` }}
    >
      {/* Tag */}
      {scholarship.tag && (
        <div className="absolute top-4 right-4 z-10">
          <span className={`inline-flex items-center gap-1 ${scholarship.tagColor || 'bg-brand-yellow text-brand-dark'} text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg`}>
            {scholarship.tag}
          </span>
        </div>
      )}

      {/* Card Header */}
      <div className={`relative h-32 bg-gradient-to-br ${scholarship.gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-3 right-5 text-7xl transform rotate-12">{scholarship.icon}</div>
        </div>
        {/* Shine */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        <div className="absolute bottom-4 left-5">
          <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{scholarship.subtitle}</p>
          <h3 className="text-xl font-black text-white drop-shadow-lg tracking-tight">{scholarship.title}</h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 pt-2">
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{scholarship.description}</p>

        {/* Benefits */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(Array.isArray(scholarship.benefits) ? scholarship.benefits : []).slice(0, 3).map((b) => (
            <span key={b} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-brand-red border border-red-100">{b}</span>
          ))}
        </div>

        {/* Discount & Eligibility */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-black text-brand-dark">{scholarship.discount}</span>
            <span className="text-xs text-gray-400 ml-1 font-bold">Fee Waiver</span>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-black text-brand-red hover:text-white hover:bg-brand-red px-4 py-2 rounded-xl border border-brand-red/20 hover:border-brand-red transition-all duration-300">
            Apply
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const ScholarshipModal = ({ scholarship, onClose, navigateTo, options }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    mobile: '', 
    email: '', 
    class: '', 
    stream: '',
    selectedScholarships: scholarship ? [scholarship.title] : [] 
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const scholarshipOptions = options && options.length > 0 ? options.map(s => s.title) : [
    'Scholarship Test',
    'Board Toppers',
    'EWS Scholarship'
  ];

  if (!scholarship) return null;

  const handleCheckboxChange = (option) => {
    setFormData(prev => ({
      ...prev,
      selectedScholarships: prev.selectedScholarships.includes(option)
        ? prev.selectedScholarships.filter(s => s !== option)
        : [...prev.selectedScholarships, option]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.selectedScholarships.length === 0) {
      alert('Please select at least one scholarship');
      return;
    }
    setLoading(true);
    try {
      await apiFetch('/api/scholarship/apply', {
        method: 'POST',
        body: JSON.stringify({ 
          ...formData, 
          scholarshipType: formData.selectedScholarships.join(', ') 
        }),
      });
      setSuccess(true);
    } catch (err) {
      alert(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, icon: Icon, ...props }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
        {Icon && <Icon size={12} className="text-brand-red" />} {label}
      </label>
      <input 
        className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-[20px] px-6 py-4 text-sm font-bold focus:bg-white focus:border-brand-red focus:shadow-xl focus:shadow-brand-red/5 outline-none transition-all duration-300"
        {...props}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md"></motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className="relative bg-white rounded-[40px] max-w-4xl w-full max-h-[90vh] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`relative h-48 bg-gradient-to-br ${scholarship.gradient} shrink-0 overflow-hidden p-10 flex flex-col justify-end`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 text-[200px] transform rotate-12 opacity-30">{scholarship.icon}</div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/20 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-brand-red text-white transition-all z-20 backdrop-blur-md border border-white/10 rounded-full group shadow-xl"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Cancel</span>
            <X size={18} className="group-hover:rotate-90 transition-transform" />
          </button>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mb-3 border border-white/10">
               <Sparkles size={12} className="text-brand-yellow" />
               <span className="text-[9px] font-black text-white uppercase tracking-widest">{scholarship.subtitle}</span>
            </span>
            <h3 className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl tracking-tighter leading-none">{scholarship.title}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-10 md:p-14 custom-scrollbar bg-slate-50/30">
          {success ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/10 rotate-12">
                 <CheckCircle size={48} />
              </div>
              <h4 className="text-3xl font-black text-brand-dark uppercase tracking-tighter mb-4">Application Success!</h4>
              <p className="text-gray-500 font-bold max-w-sm mx-auto mb-10">Our scholarship committee will review your profile and contact you within 48 hours.</p>
              <button onClick={onClose} className="bg-brand-dark text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-red transition-all shadow-2xl shadow-brand-red/20">Return Home</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Info Column */}
              <div className="lg:col-span-2 space-y-10">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-indigo-950 uppercase tracking-[0.2em] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-red rounded-full"></div> Scholarship Details
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">{scholarship.description}</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-brand-red/10 group">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div>
                      <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">Reward Value</div>
                      <p className="text-lg font-black text-brand-red leading-none">{scholarship.discount} Fee Waiver</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-brand-red/10 group">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <div>
                      <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">Eligibility</div>
                      <p className="text-sm font-black text-gray-700 leading-tight">{scholarship.eligibility}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                    <Ticket size={12} className="text-brand-red" /> Select Interest Area
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {scholarshipOptions.map(option => (
                      <label key={option} className={`flex items-center gap-3 p-4 rounded-[20px] border-2 transition-all cursor-pointer ${formData.selectedScholarships.includes(option) ? 'border-brand-red bg-red-50 shadow-lg shadow-brand-red/5' : 'border-gray-50 bg-gray-50/50 hover:border-gray-200'}`}>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={formData.selectedScholarships.includes(option)}
                          onChange={() => handleCheckboxChange(option)}
                        />
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${formData.selectedScholarships.includes(option) ? 'bg-brand-red border-brand-red' : 'border-gray-300'}`}>
                          {formData.selectedScholarships.includes(option) && <CheckCircle size={12} className="text-white" />}
                        </div>
                        <span className={`text-[11px] font-black uppercase tracking-tight ${formData.selectedScholarships.includes(option) ? 'text-brand-red' : 'text-gray-400'}`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <InputField label="Full Name" icon={User} required placeholder="e.g. Rahul Sharma" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Mobile Number" icon={Phone} required type="tel" maxLength="10" placeholder="10-digit number" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '')})} />
                    <InputField label="Email Address" icon={Bot} required type="email" placeholder="rahul@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Current Class</label>
                      <select required className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-[20px] px-6 py-4 text-sm font-bold focus:bg-white focus:border-brand-red outline-none appearance-none" value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})}>
                        <option value="">Select</option>
                        <option>8th</option><option>9th</option><option>10th</option><option>11th</option><option>12th</option><option>12th Pass</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Academic Stream</label>
                      <select required className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-[20px] px-6 py-4 text-sm font-bold focus:bg-white focus:border-brand-red outline-none appearance-none" value={formData.stream} onChange={e => setFormData({...formData, stream: e.target.value})}>
                        <option value="">Select</option>
                        <option>PCM</option><option>PCB</option><option>General</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button 
                  disabled={loading} 
                  type="submit" 
                  className="w-full bg-brand-dark text-white py-5 rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-brand-dark/10 hover:bg-brand-red hover:shadow-brand-red/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 mt-4 disabled:opacity-50"
                >
                  {loading ? 'Processing Application...' : 'Submit Application'}
                </button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const defaultScholarships = [
  {
    id: 1,
    title: 'Scholarship Test',
    subtitle: 'Merit Based',
    icon: '📝',
    description: 'Appear for our scholarship test and earn up to 100% fee waiver based on your performance. The test covers Physics, Chemistry, Mathematics/Biology fundamentals.',
    benefits: ['Up to 100% Fee Waiver', 'Free Study Material', 'Priority Batch Selection', 'Mentorship Program'],
    discount: 'Up to 100%',
    eligibility: 'Students of Class 8th to 12th (Science stream)',
    deadline: 'Rolling admissions — Apply anytime',
    tag: 'Most Popular',
    tagColor: 'bg-brand-yellow text-brand-dark',
    gradient: 'from-brand-red via-red-700 to-red-900',
  },
  {
    id: 2,
    title: 'Board Toppers',
    subtitle: 'Academic Excellence',
    icon: '🏆',
    description: 'Students who scored above 90% in their Board exams (CBSE/ICSE/State) are eligible for direct fee concession based on their marks.',
    benefits: ['Direct Fee Concession', 'No Test Required', 'Top Batch Allocation', 'Certificate of Merit'],
    discount: 'Up to 75%',
    eligibility: '90%+ in Board exams (CBSE/ICSE/State Board)',
    deadline: 'Submit marksheet within 30 days of result',
    tag: 'Direct Entry',
    tagColor: 'bg-green-500 text-white',
    gradient: 'from-amber-400 via-amber-600 to-amber-800',
  },
  {
    id: 3,
    title: 'EWS Scholarship',
    subtitle: 'Need Based Support',
    icon: '🤝',
    description: 'We believe talent should not be limited by financial constraints. Economically weaker students can apply for need-based scholarships with income proof.',
    benefits: ['Up to 80% Fee Waiver', 'Free Books', 'Counseling Support', 'Flexible Payment'],
    discount: 'Up to 80%',
    eligibility: 'Family income below ₹3,00,000/year with valid proof',
    deadline: 'Applications reviewed quarterly',
    tag: 'Support',
    tagColor: 'bg-blue-500 text-white',
    gradient: 'from-blue-600 via-blue-700 to-blue-900',
  },
  {
    id: 4,
    title: 'Special Talent Exam',
    subtitle: 'Summer Scholarship',
    icon: '🚀',
    description: 'A special summer talent quest to identify and support bright minds. Test sessions will be held on select dates next month.',
    benefits: ['June 28 (Sunday)', 'July 1 (Wednesday)', 'July 5 (Sunday)'],
    discount: 'Up to 90%',
    eligibility: 'Class 10th, 11th, and 12th students',
    deadline: 'Registration closes 24 hours before each test',
    tag: 'Limited Seats',
    tagColor: 'bg-purple-500 text-white',
    gradient: 'from-purple-600 via-purple-700 to-indigo-900',
  }
];

const ScholarshipPage = ({ navigateTo }) => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [scholarships, setScholarships] = useState(defaultScholarships);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ categories: '4', maxWaiver: '100%', awarded: '500+', disbursed: '₹2Cr+' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typeRes, configRes] = await Promise.all([
          apiFetch('/api/scholarship/types'),
          apiFetch('/api/scholarship/config')
        ]);
        
        if (typeRes.success && typeRes.data.length > 0) setScholarships(typeRes.data);
        else setScholarships(defaultScholarships);

        if (configRes.success) setStats(configRes.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setScholarships(defaultScholarships);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  useEffect(() => {
    const handleScrollLock = () => {
      if (selectedScholarship) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };
    handleScrollLock();
    return () => { document.body.style.overflow = ''; };
  }, [selectedScholarship]);


  const steps = [
    { number: '01', title: 'Register', desc: 'Fill the online scholarship application form with your academic details' },
    { number: '02', title: 'Appear for Test', desc: 'Take the scholarship test at our Nashik center or online' },
    { number: '03', title: 'Get Results', desc: 'Results declared within 7 days via SMS and email' },
    { number: '04', title: 'Enroll & Save', desc: 'Use your scholarship code during enrollment for instant fee waiver' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-gray-900 to-brand-dark pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-brand-red/10 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[150px]"></div>
        </div>

        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}></div>

        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Nashik Center</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-6">
              Earn Your
              <span className="text-brand-yellow block">Scholarship</span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Deserving students deserve every opportunity. Apply for our scholarship program and get up to 100% fee waiver on JEE & NEET courses.
            </p>

            <div className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {['Up to 100% Fee Waiver', 'Merit & Need Based', 'Easy Application', 'Quick Results'].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/80 text-xs font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 80L48 74.7C96 69 192 59 288 53.3C384 48 480 48 576 53.3C672 59 768 69 864 74.7C960 80 1056 80 1152 74.7C1248 69 1344 59 1392 53.3L1440 48V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 md:py-10 bg-white relative">
        <div className="container mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 max-w-4xl mx-auto">
            <CounterStat value={stats.categories} label="Categories" icon="📋" delay={0} />
            <CounterStat value={stats.maxWaiver} label="Max Waiver" icon="💰" delay={100} />
            <CounterStat value={stats.awarded} label="Awarded" icon="🎓" delay={200} />
            <CounterStat value={stats.disbursed} label="Disbursed" icon="🏆" delay={300} />
          </div>
        </div>
      </section>

      {/* Scholarship Cards */}
      <section className="pb-10 md:pb-12 bg-white">
        <div className="container mx-auto px-5 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <div className="w-1 h-8 bg-brand-red rounded-full"></div>
              <h2 className="text-xl md:text-2xl font-black text-brand-dark uppercase tracking-tight">Scholarship Categories</h2>
              <div className="flex-1 h-px bg-gray-100 ml-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {scholarships.map((s, i) => (
                <ScholarshipCard key={s._id || s.id || i} scholarship={s} index={i} onSelect={setSelectedScholarship} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-10 md:py-12 bg-brand-gray relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-[100px]"></div>
        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="h-0.5 w-14 bg-brand-red mx-auto mb-5"></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark uppercase tracking-tighter leading-tight">
              How to
              <span className="text-brand-red ml-3">Apply</span>
            </h2>
            <p className="text-sm md:text-base mt-3 font-bold text-gray-400 max-w-lg mx-auto">
              Simple 4-step process to earn your scholarship
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ-style info */}
      <FaqSection />

      {/* CTA */}
      <section className="py-12 md:py-16 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-brand-red/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-yellow/10 rounded-full blur-[80px]"></div>
        </div>
        <div className="container mx-auto px-5 md:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-5 leading-tight">
            Don&apos;t Let Fees
            <br />
            <span className="text-brand-yellow">Hold You Back</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10">
            Apply for a scholarship today and take the first step towards your dream college.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('registration')}
              className="bg-brand-red text-white font-black py-4 px-10 rounded-2xl hover:bg-red-700 transition-all duration-500 shadow-xl shadow-brand-red/30 uppercase tracking-widest text-sm hover:scale-105"
            >
              Apply Now
            </button>
            <a
              href="tel:+918888301363"
              className="border-2 border-white/20 text-white font-black py-4 px-10 rounded-2xl hover:bg-white/10 transition-all duration-500 uppercase tracking-widest text-sm hover:scale-105"
            >
              Call +91 88883 01363
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ScholarshipModal scholarship={selectedScholarship} options={scholarships} onClose={() => setSelectedScholarship(null)} navigateTo={navigateTo} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

        @keyframes modal-bg {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-modal-bg { animation: modal-bg 0.3s ease-out forwards; }

        @keyframes modal-content {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-content { animation: modal-content 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}} />
    </div>
  );
};

const FaqSection = () => {
  const [ref, isVisible] = useInView();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'Can I apply for multiple scholarships?',
      a: 'Yes, you can apply for multiple scholarships. However, only the highest value scholarship will be awarded if you qualify for more than one.',
    },
    {
      q: 'Is the scholarship renewable?',
      a: 'Scholarships are awarded for one academic year. Students can reapply annually based on their academic performance.',
    },
    {
      q: 'What documents are required?',
      a: 'You need your marksheet, ID proof, passport photo, and income proof (for EWS category).',
    },
    {
      q: 'When will I know the result?',
      a: 'Scholarship test results are declared within 7 days. Board topper applications are reviewed within 15 days.',
    },
    {
      q: 'Can the scholarship be combined with other discounts?',
      a: 'Scholarships cannot be combined with other promotional offers or discounts. The highest applicable discount will be applied.',
    },
  ];

  return (
    <section className="py-10 md:py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="h-0.5 w-14 bg-brand-red mx-auto mb-5"></div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark uppercase tracking-tighter leading-tight">
            Frequently Asked
            <span className="text-brand-red ml-3">Questions</span>
          </h2>
        </div>

        <div ref={ref} className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-500 hover:shadow-md
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-sm md:text-base font-black text-brand-dark pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-brand-red shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipPage;
