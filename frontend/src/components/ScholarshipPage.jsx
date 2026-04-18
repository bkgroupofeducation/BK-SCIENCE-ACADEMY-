import React, { useState, useEffect, useRef } from 'react';

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
      <div className="absolute top-4 right-4 z-10">
        <span className={`inline-flex items-center gap-1 ${scholarship.tagColor} text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg`}>
          {scholarship.tag}
        </span>
      </div>

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
          {scholarship.benefits.slice(0, 3).map((b) => (
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

const ScholarshipModal = ({ scholarship, onClose, navigateTo }) => {
  if (!scholarship) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-modal-bg"></div>
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] shadow-2xl overflow-hidden animate-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`relative h-44 bg-gradient-to-br ${scholarship.gradient} overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-8 text-9xl transform rotate-12">{scholarship.icon}</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <p className="text-white/70 text-xs font-black uppercase tracking-[0.2em] mb-1">{scholarship.subtitle}</p>
            <h3 className="text-3xl font-black text-white drop-shadow-lg">{scholarship.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <p className="text-sm text-gray-600 leading-relaxed mb-6">{scholarship.description}</p>

          {/* Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Eligibility</div>
                <p className="text-sm font-bold text-gray-700">{scholarship.eligibility}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Scholarship Value</div>
                <p className="text-sm font-bold text-brand-red">{scholarship.discount} Fee Waiver</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Application Deadline</div>
                <p className="text-sm font-bold text-gray-700">{scholarship.deadline}</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Benefits</h4>
            <div className="flex flex-wrap gap-2">
              {scholarship.benefits.map((b) => (
                <span key={b} className="text-xs font-bold px-3 py-1.5 rounded-full bg-red-50 text-brand-red border border-red-100">{b}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => { onClose(); navigateTo('registration'); }}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-red text-white font-black py-3.5 rounded-2xl hover:bg-red-700 transition-all duration-300 shadow-lg shadow-brand-red/20 uppercase tracking-wider text-sm"
            >
              Apply Now
            </button>
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600 font-black py-3.5 rounded-2xl hover:border-brand-red hover:text-brand-red transition-all duration-300 uppercase tracking-wider text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScholarshipPage = ({ navigateTo }) => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  useEffect(() => {
    if (selectedScholarship) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedScholarship]);

  const scholarships = [
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
      gradient: 'from-green-600 via-emerald-700 to-teal-800',
    },
    {
      id: 3,
      title: 'Olympiad Scholars',
      subtitle: 'Competition Champions',
      icon: '🥇',
      description: 'National/International Olympiad winners and NTSE scholars receive special scholarships recognizing their outstanding achievement.',
      benefits: ['Up to 90% Fee Waiver', 'Special Batch', 'Research Mentorship', 'Competition Coaching'],
      discount: 'Up to 90%',
      eligibility: 'Olympiad winners (INMO/INPhO/INChO/NTSE scholars)',
      deadline: 'Submit certificates within 60 days of announcement',
      tag: 'Elite',
      tagColor: 'bg-purple-500 text-white',
      gradient: 'from-purple-600 via-purple-700 to-indigo-900',
    },
    {
      id: 4,
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
  ];

  const steps = [
    { number: '01', title: 'Register', desc: 'Fill the online scholarship application form with your academic details' },
    { number: '02', title: 'Appear for Test', desc: 'Take the scholarship test at our Nashik center or online' },
    { number: '03', title: 'Get Results', desc: 'Results declared within 7 days via SMS and email' },
    { number: '04', title: 'Enroll & Save', desc: 'Use your scholarship code during enrollment for instant fee waiver' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-gray-900 to-brand-dark py-20 md:py-28 lg:py-32">
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
      <section className="py-12 md:py-16 bg-white relative">
        <div className="container mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 max-w-4xl mx-auto">
            <CounterStat value="4" label="Categories" icon="📋" delay={0} />
            <CounterStat value="100%" label="Max Waiver" icon="💰" delay={100} />
            <CounterStat value="500+" label="Awarded" icon="🎓" delay={200} />
            <CounterStat value="₹2Cr+" label="Disbursed" icon="🏆" delay={300} />
          </div>
        </div>
      </section>

      {/* Scholarship Cards */}
      <section className="pb-16 md:pb-24 bg-white">
        <div className="container mx-auto px-5 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <div className="w-1 h-8 bg-brand-red rounded-full"></div>
              <h2 className="text-xl md:text-2xl font-black text-brand-dark uppercase tracking-tight">Scholarship Categories</h2>
              <div className="flex-1 h-px bg-gray-100 ml-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {scholarships.map((s, i) => (
                <ScholarshipCard key={s.id} scholarship={s} index={i} onSelect={setSelectedScholarship} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 md:py-24 bg-brand-gray relative overflow-hidden">
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
      <section className="py-16 md:py-20 bg-brand-dark relative overflow-hidden">
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
      <ScholarshipModal scholarship={selectedScholarship} onClose={() => setSelectedScholarship(null)} navigateTo={navigateTo} />

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
      a: 'You need your marksheet, ID proof, passport photo, and income proof (for EWS category). Olympiad scholars need certificates.',
    },
    {
      q: 'When will I know the result?',
      a: 'Scholarship test results are declared within 7 days. Board topper and Olympiad applications are reviewed within 15 days.',
    },
    {
      q: 'Can the scholarship be combined with other discounts?',
      a: 'Scholarships cannot be combined with other promotional offers or discounts. The highest applicable discount will be applied.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
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
