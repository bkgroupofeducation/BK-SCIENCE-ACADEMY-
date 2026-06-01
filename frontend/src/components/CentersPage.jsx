import React, { useState, useEffect, useRef } from 'react';

const center = {
  id: 1,
  city: 'Nashik',
  state: 'Maharashtra',
  address: 'BK Science Academy, College Road, Nashik, Maharashtra 422005',
  phone: '0253-2345678',
  courses: ['JEE', 'NEET', 'Foundation'],
  featured: true,
  students: '2,500+',
  established: '2007',
  icon: '🏛️',
};

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

const AnimatedStat = ({ value, label, icon, delay }) => {
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

const CenterCard = ({ center, index, onClick }) => {
  const [ref, isVisible] = useInView();

  return (
    <div
      ref={ref}
      onClick={() => onClick(center)}
      className={`group relative bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden cursor-pointer
        transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-red/10 hover:border-brand-red/20
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
        ${center.featured ? 'ring-2 ring-brand-red/10' : ''}
      `}
      style={{ transitionDelay: isVisible ? '0ms' : `${index * 80}ms` }}
    >
      {center.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1 bg-brand-red text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg shadow-brand-red/30">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured
          </span>
        </div>
      )}

      {/* Card Header Gradient */}
      <div className={`relative h-28 ${center.featured ? 'bg-gradient-to-br from-brand-red via-red-700 to-red-900' : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900'} overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-4 text-6xl transform rotate-12">{center.icon}</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        <div className="absolute bottom-4 left-5">
          <h3 className="text-2xl font-black text-white drop-shadow-lg tracking-tight">{center.city}</h3>
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest">{center.state}</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 pt-2">
        <div className="flex items-start gap-2 mb-4">
          <svg className="w-4 h-4 text-brand-red mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm text-gray-500 leading-relaxed">{center.address}</p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-4 py-3 bg-gray-50 rounded-2xl px-4">
          <div className="text-center flex-1">
            <div className="text-lg font-black text-brand-dark">{center.students}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Students</div>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="text-center flex-1">
            <div className="text-lg font-black text-brand-dark">{center.established}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Est.</div>
          </div>
        </div>

        {/* Courses */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {center.courses.map((course) => (
            <span
              key={course}
              className="text-[11px] font-bold px-3 py-1 rounded-full bg-red-50 text-brand-red border border-red-100"
            >
              {course}
            </span>
          ))}
        </div>

        {/* Contact */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <a
            href={`tel:${center.phone}`}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-red transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z" />
            </svg>
            {center.phone}
          </a>
          <button
            className="flex items-center gap-1.5 text-xs font-black text-brand-red hover:text-white hover:bg-brand-red px-3 py-1.5 rounded-xl border border-brand-red/20 hover:border-brand-red transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            View Details
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const CentersPage = ({ navigateTo }) => {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-gray-900 to-brand-dark py-20 md:py-28 lg:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-brand-red/10 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[150px]"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}></div>

        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Nashik, Maharashtra</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-6">
              Our
              <span className="text-brand-yellow ml-4">Center</span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Experience world-class JEE &amp; NEET preparation at our Nashik center. Visit us for a free counseling session and campus tour.
            </p>
          </div>
        </div>

        {/* Bottom Wave */}
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
            <AnimatedStat value="2,500+" label="Students" icon="🎓" delay={0} />
            <AnimatedStat value="19+" label="Years" icon="🏛️" delay={100} />
            <AnimatedStat value="JEE" label="Preparation" icon="📚" delay={200} />
            <AnimatedStat value="NEET" label="Preparation" icon="🩺" delay={300} />
          </div>
        </div>
      </section>

      {/* Center Card */}
      <section className="pb-16 md:pb-24 bg-white">
        <div className="container mx-auto px-5 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-brand-red rounded-full"></div>
              <h2 className="text-xl md:text-2xl font-black text-brand-dark uppercase tracking-tight">Our Nashik Center</h2>
              <div className="flex-1 h-px bg-gray-100 ml-4"></div>
            </div>
            <CenterCard center={center} index={0} onClick={() => {}} />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-brand-gray relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-[100px]"></div>
        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="h-0.5 w-14 bg-brand-red mx-auto mb-5"></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-dark uppercase tracking-tighter leading-tight">
              Why Our Center
              <span className="text-brand-red ml-3">Stands Out</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'Expert Faculty',
                desc: 'Learn from IIT/NIT alumni and top educators with 15+ years of experience',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: 'Proven Curriculum',
                desc: 'Structured study material updated yearly with latest exam patterns',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Regular Testing',
                desc: 'Weekly tests, All-India test series, and detailed performance analytics',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Doubt Support',
                desc: '24/7 doubt resolution with dedicated mentors at every center',
              },
            ].map((item, i) => (
              <FeatureCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-brand-red/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-yellow/10 rounded-full blur-[80px]"></div>
        </div>
        <div className="container mx-auto px-5 md:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-5 leading-tight">
            Ready to Start Your
            <br />
            <span className="text-brand-yellow">Journey?</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10">
            Visit your nearest center for a free counseling session and campus tour.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('registration')}
              className="bg-brand-red text-white font-black py-4 px-10 rounded-2xl hover:bg-red-700 transition-all duration-500 shadow-xl shadow-brand-red/30 uppercase tracking-widest text-sm hover:scale-105"
            >
              Register Now
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

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

const FeatureCard = ({ item, index }) => {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={`group bg-white rounded-3xl p-6 md:p-7 border border-gray-100 shadow-lg shadow-gray-100/50
        transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-red/5
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-brand-red mb-5 group-hover:bg-brand-red group-hover:text-white transition-all duration-500 shadow-sm">
        {item.icon}
      </div>
      <h3 className="text-lg font-black text-brand-dark mb-2 tracking-tight">{item.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
    </div>
  );
};

export default CentersPage;
