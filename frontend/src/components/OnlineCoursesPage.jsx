import React, { useState, useEffect, useRef } from 'react';

const courses = [
  {
    id: 1,
    title: 'Anushaasan',
    subtitle: 'JEE/NEET Online Live',
    tagline: 'Discipline Meets Digital Learning',
    description: 'Live interactive classes with India\'s top faculty. Structured daily schedule, real-time doubt resolution, and comprehensive test series — all from the comfort of your home.',
    features: ['Live Interactive Classes', 'Daily Doubt Sessions', 'Recorded Backup Lectures', 'Weekly Test Series', 'Personal Mentorship', 'Parent Progress Reports'],
    price: '₹24,999',
    originalPrice: '₹39,999',
    duration: '12 Months',
    tag: 'Most Popular',
    tagColor: 'bg-brand-yellow text-brand-dark',
    gradient: 'from-brand-red via-red-700 to-red-900',
    icon: '🔴',
    rating: 4.9,
    students: '15,000+',
  },
  {
    id: 2,
    title: 'Crash Course',
    subtitle: 'JEE Quick Revision',
    tagline: 'Last Mile, Best Preparation',
    description: 'Intensive crash course designed for rapid revision. Master key concepts, solve high-yield problems, and perfect your exam strategy in record time.',
    features: ['45-Day Intensive Program', '150+ Hours of Content', 'Daily Practice Problems', 'Full Syllabus Mock Tests', 'Quick Revision Notes', 'Strategy Sessions'],
    price: '₹8,999',
    originalPrice: '₹14,999',
    duration: '45 Days',
    tag: 'Fast Track',
    tagColor: 'bg-orange-500 text-white',
    gradient: 'from-orange-500 via-orange-600 to-red-700',
    icon: '⚡',
    rating: 4.8,
    students: '8,500+',
  },
  {
    id: 3,
    title: 'Brahmastra',
    subtitle: 'JEE/NEET Test Series',
    tagline: 'The Ultimate Weapon for Toppers',
    description: 'Our most powerful test series with All-India ranking, detailed analytics, and chapter-wise tests designed to simulate the real exam experience.',
    features: ['50+ Full Tests', '100+ Chapter Tests', 'All India Ranking', 'Detailed Performance Analytics', 'Video Solutions', 'Difficulty Adaptive'],
    price: '₹4,999',
    originalPrice: '₹7,999',
    duration: '6 Months',
    tag: 'Best Value',
    tagColor: 'bg-green-500 text-white',
    gradient: 'from-green-600 via-emerald-700 to-teal-800',
    icon: '🎯',
    rating: 4.9,
    students: '25,000+',
  },
  {
    id: 4,
    title: 'Vajra Rapid',
    subtitle: 'NEET Rapid Test Series',
    tagline: 'Strike Hard, Score High',
    description: 'NEET-specific rapid test series with daily micro-tests, subject-wise drills, and biology-focused deep dives to maximize your NEET score.',
    features: ['Daily Micro Tests', 'Biology Deep Dives', 'NCERT-Based Questions', 'Previous Year Analysis', 'Rank Prediction', 'Mobile App Access'],
    price: '₹3,999',
    originalPrice: '₹6,999',
    duration: '4 Months',
    tag: 'NEET Special',
    tagColor: 'bg-purple-500 text-white',
    gradient: 'from-purple-600 via-purple-700 to-indigo-900',
    icon: '⚡',
    rating: 4.7,
    students: '12,000+',
  },
  {
    id: 5,
    title: 'Amrit Course',
    subtitle: 'JEE/NEET Video Lectures',
    tagline: 'Learn Anytime, Anywhere',
    description: 'Complete recorded video lectures by our star faculty. Self-paced learning with comprehensive coverage of every topic, concept, and problem type.',
    features: ['500+ Hours Video', 'Complete Syllabus Coverage', 'Concept Building Focus', 'Downloadable Notes', 'Practice Problem Sets', 'Lifetime Access'],
    price: '₹12,999',
    originalPrice: '₹19,999',
    duration: 'Lifetime',
    tag: 'Self Paced',
    tagColor: 'bg-blue-500 text-white',
    gradient: 'from-blue-600 via-blue-700 to-blue-900',
    icon: '📚',
    rating: 4.8,
    students: '30,000+',
  },
];

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

const CourseCard = ({ course, index, onSelect }) => {
  const [ref, isVisible] = useInView();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(course)}
      className={`group relative bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden cursor-pointer
        transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-brand-red/10 hover:border-brand-red/20
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
      style={{ transitionDelay: isVisible ? '0ms' : `${index * 100}ms` }}
    >
      {/* Tag */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`inline-flex items-center gap-1 ${course.tagColor} text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg`}>
          {course.tag}
        </span>
      </div>

      {/* Card Header */}
      <div className={`relative h-36 bg-gradient-to-br ${course.gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-6 text-7xl transform rotate-12">{course.icon}</div>
        </div>
        {/* Animated shine */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
        <div className="absolute bottom-5 left-5">
          <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{course.tagline}</p>
          <h3 className="text-2xl font-black text-white drop-shadow-lg tracking-tight">{course.title}</h3>
          <p className="text-white/90 text-sm font-bold">{course.subtitle}</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 pt-3">
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{course.description}</p>

        {/* Stats Row */}
        <div className="flex items-center gap-3 mb-4 py-3 bg-gray-50 rounded-2xl px-4">
          <div className="text-center flex-1">
            <div className="text-base font-black text-brand-dark">{course.duration}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Duration</div>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-1">
              <svg className="w-3.5 h-3.5 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-base font-black text-brand-dark">{course.rating}</span>
            </div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rating</div>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="text-center flex-1">
            <div className="text-base font-black text-brand-dark">{course.students}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Students</div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.features.slice(0, 3).map((feature) => (
            <span key={feature} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-brand-red border border-red-100">
              {feature}
            </span>
          ))}
          {course.features.length > 3 && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
              +{course.features.length - 3} more
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-black text-brand-dark">{course.price}</span>
            <span className="text-sm text-gray-400 line-through ml-2 font-bold">{course.originalPrice}</span>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-black text-brand-red hover:text-white hover:bg-brand-red px-4 py-2 rounded-xl border border-brand-red/20 hover:border-brand-red transition-all duration-300">
            Enroll
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseModal = ({ course, onClose, navigateTo }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-modal-bg"></div>
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] shadow-2xl overflow-hidden animate-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`relative h-32 bg-gradient-to-br ${course.gradient} overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-6 -right-4 text-8xl transform rotate-12 opacity-20">{course.icon}</div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
          <div className="absolute bottom-5 left-6">
            <p className="text-white/70 text-xs font-black uppercase tracking-[0.2em] mb-1">{course.tagline}</p>
            <h3 className="text-3xl font-black text-white drop-shadow-lg">{course.title}</h3>
            <p className="text-white/90 text-base font-bold">{course.subtitle}</p>
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
          <p className="text-sm text-gray-600 leading-relaxed mb-6">{course.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="text-xl font-black text-brand-dark">{course.duration}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Duration</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <svg className="w-4 h-4 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xl font-black text-brand-dark">{course.rating}</span>
              </div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Rating</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="text-xl font-black text-brand-dark">{course.students}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Students</div>
            </div>
          </div>

          {/* All Features */}
          <div className="mb-6">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">What You Get</h4>
            <div className="grid grid-cols-2 gap-2">
              {course.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-gray-700 font-bold">
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6 bg-red-50 rounded-2xl p-4">
            <span className="text-3xl font-black text-brand-dark">{course.price}</span>
            <span className="text-lg text-gray-400 line-through font-bold">{course.originalPrice}</span>
            <span className="text-xs font-black text-green-600 bg-green-100 px-2 py-1 rounded-full ml-auto">
              {Math.round((1 - parseInt(course.price.replace(/[₹,]/g, '')) / parseInt(course.originalPrice.replace(/[₹,]/g, ''))) * 100)}% OFF
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => { onClose(); navigateTo('registration'); }}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-red text-white font-black py-3.5 rounded-2xl hover:bg-red-700 transition-all duration-300 shadow-lg shadow-brand-red/20 uppercase tracking-wider text-sm"
            >
              Enroll Now
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

const OnlineCoursesPage = ({ navigateTo }) => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedCourse]);

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
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Learn From Home</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-6">
              Online
              <span className="text-brand-yellow ml-4">Courses</span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
              World-class JEE &amp; NEET preparation from the comfort of your home. Live classes, test series, and video lectures by India&apos;s top faculty.
            </p>

            <div className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80 text-xs font-bold">Live Classes</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80 text-xs font-bold">Test Series</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80 text-xs font-bold">Video Lectures</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80 text-xs font-bold">Mentorship</span>
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

      {/* Stats Bar */}
      <section className="py-12 md:py-16 bg-white relative">
        <div className="container mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 max-w-4xl mx-auto">
            <CounterStat value="5" label="Courses" icon="📚" delay={0} />
            <CounterStat value="50K+" label="Students" icon="🎓" delay={100} />
            <CounterStat value="4.8" label="Avg Rating" icon="⭐" delay={200} />
            <CounterStat value="24/7" label="Support" icon="💬" delay={300} />
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="pb-16 md:pb-24 bg-white">
        <div className="container mx-auto px-5 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <div className="w-1 h-8 bg-brand-red rounded-full"></div>
              <h2 className="text-xl md:text-2xl font-black text-brand-dark uppercase tracking-tight">All Courses</h2>
              <span className="text-sm font-bold text-gray-400 ml-2">({courses.length})</span>
              <div className="flex-1 h-px bg-gray-100 ml-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {courses.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} onSelect={setSelectedCourse} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Online With Us */}
      <WhySection />

      {/* Comparison Table */}
      <ComparisonSection />

      {/* CTA */}
      <section className="py-16 md:py-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-brand-red/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-yellow/10 rounded-full blur-[80px]"></div>
        </div>
        <div className="container mx-auto px-5 md:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-5 leading-tight">
            Start Learning
            <br />
            <span className="text-brand-yellow">Today</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10">
            Enroll now and get up to 37% off on your first course. Limited time offer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('registration')}
              className="bg-brand-red text-white font-black py-4 px-10 rounded-2xl hover:bg-red-700 transition-all duration-500 shadow-xl shadow-brand-red/30 uppercase tracking-widest text-sm hover:scale-105"
            >
              Enroll Now
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
      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} navigateTo={navigateTo} />

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

const WhySection = () => {
  const [ref, isVisible] = useInView();

  const reasons = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: 'HD Live Classes',
      desc: 'Crystal-clear video quality with interactive whiteboard and real-time polling',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Instant Doubt Solving',
      desc: 'Get your doubts cleared within minutes through dedicated doubt sessions and chat',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Performance Analytics',
      desc: 'Track your progress with detailed analytics, weak area identification, and rank predictions',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Flexible Schedule',
      desc: 'Missed a class? Watch recorded lectures anytime. Learn at your own pace with lifetime access',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-gray relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-[100px]"></div>
      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="h-0.5 w-14 bg-brand-red mx-auto mb-5"></div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark uppercase tracking-tighter leading-tight">
            Why Learn
            <span className="text-brand-red ml-3">Online With Us</span>
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
          {reasons.map((item, i) => (
            <div
              key={i}
              className={`group bg-white rounded-3xl p-6 md:p-7 border border-gray-100 shadow-lg shadow-gray-100/50
                transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-red/5
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-brand-red mb-5 group-hover:bg-brand-red group-hover:text-white transition-all duration-500 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-lg font-black text-brand-dark mb-2 tracking-tight">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ComparisonSection = () => {
  const [ref, isVisible] = useInView();

  const rows = [
    { feature: 'Live Interactive Classes', online: true, offline: true },
    { feature: 'Recorded Backup Lectures', online: true, offline: false },
    { feature: 'Learn From Anywhere', online: true, offline: false },
    { feature: 'Flexible Schedule', online: true, offline: false },
    { feature: 'Doubt Resolution', online: true, offline: true },
    { feature: 'Test Series & Analytics', online: true, offline: true },
    { feature: 'Personal Mentorship', online: true, offline: true },
    { feature: 'Affordable Pricing', online: true, offline: false },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="h-0.5 w-14 bg-brand-red mx-auto mb-5"></div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark uppercase tracking-tighter leading-tight">
            Online vs
            <span className="text-brand-red ml-3">Offline</span>
          </h2>
          <p className="text-sm md:text-base mt-3 font-bold text-gray-400 max-w-lg mx-auto">
            Get the same quality education with added flexibility
          </p>
        </div>

        <div ref={ref} className="max-w-2xl mx-auto">
          <div className={`bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-brand-dark text-white">
              <div className="p-4 md:p-5 font-black text-sm uppercase tracking-wider">Feature</div>
              <div className="p-4 md:p-5 font-black text-sm uppercase tracking-wider text-center">Online</div>
              <div className="p-4 md:p-5 font-black text-sm uppercase tracking-wider text-center">Offline</div>
            </div>

            {/* Table Rows */}
            {rows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-b border-gray-50 last:border-0 transition-all duration-500 hover:bg-red-50/30 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="p-4 md:p-5 text-sm font-bold text-gray-700">{row.feature}</div>
                <div className="p-4 md:p-5 flex justify-center items-center">
                  {row.online ? (
                    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-5 flex justify-center items-center">
                  {row.offline ? (
                    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineCoursesPage;
