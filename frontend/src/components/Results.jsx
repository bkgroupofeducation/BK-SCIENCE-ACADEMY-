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

const AnimatedCounter = ({ value, delay = 0, suffix = '' }) => {
  const [ref, isVisible] = useInView();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const numValue = parseInt(value.replace(/[^0-9]/g, ''));
      const duration = 2000;
      const steps = 60;
      const increment = numValue / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numValue) {
          setCount(numValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return (
    <span ref={ref} className="inline-block">
      {count}{suffix}
    </span>
  );
};

const StarPerformer = ({ name, rank, exam, score, img, delay }) => {
  const [ref, isVisible] = useInView();
  
  return (
    <div 
      ref={ref}
      className={`relative group cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-brand-red to-brand-yellow rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
      <div className="relative glass-panel-dark rounded-[2rem] p-5 border border-white/5 group-hover:-translate-y-2 transition-all duration-700">
        <div className="absolute -top-3 -right-3 w-9 h-9 bg-brand-yellow rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(253,185,19,0.5)] z-20">
          <span className="text-lg">⭐</span>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 group-hover:scale-110 transition-transform">
            <span className="text-xl font-black text-white">{name.charAt(0)}</span>
          </div>
          <div>
            <p className="font-black text-white text-base leading-none mb-1">{name}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{exam}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between relative z-10">
          <div className="px-4 py-1.5 bg-brand-red rounded-full shadow-lg shadow-brand-red/20">
            <span className="text-white font-black text-xs uppercase tracking-tighter">AIR {rank}</span>
          </div>
          <span className="text-brand-yellow text-xs font-black tracking-widest">{score}</span>
        </div>
      </div>
    </div>
  );
};

const ResultCard = ({ title, year, color, stats, rankers, delay }) => {
  const [ref, isVisible] = useInView();
  const [expanded, setExpanded] = useState(false);

  const colorClasses = {
    red: { bg: 'bg-brand-red', gradient: 'from-brand-red to-orange-600', text: 'text-brand-red', glow: 'shadow-brand-red/20' },
    blue: { bg: 'bg-indigo-600', gradient: 'from-indigo-600 to-blue-400', text: 'text-indigo-400', glow: 'shadow-indigo-600/20' },
    green: { bg: 'bg-emerald-600', gradient: 'from-emerald-600 to-teal-400', text: 'text-emerald-400', glow: 'shadow-emerald-600/20' },
    purple: { bg: 'bg-purple-600', gradient: 'from-purple-600 to-pink-400', text: 'text-purple-400', glow: 'shadow-purple-600/20' },
  };

  const colors = colorClasses[color] || colorClasses.red;

  return (
    <div 
      ref={ref}
      className={`glass-panel-dark rounded-[3rem] border border-white/5 overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`h-1.5 bg-gradient-to-r ${colors.gradient} opacity-80`}></div>
      <div className="p-6 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tight leading-none mb-1">{title}</h3>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Session {year}</p>
          </div>
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-2xl relative`}>
            <div className="absolute inset-0 blur-lg bg-inherit opacity-40"></div>
            <svg className="w-7 h-7 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 rounded-[1.5rem] p-4 text-center border border-white/5 group hover:bg-white/10 transition-colors">
              <div className={`text-xl md:text-2xl font-black ${colors.text} tracking-tighter mb-1`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} />
              </div>
              <div className="text-[8px] md:text-[9px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {rankers && (
          <div className="pt-8 border-t border-white/5">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Elite Champions</p>
              <button 
                onClick={() => setExpanded(!expanded)}
                className={`text-[10px] font-black tracking-widest uppercase py-1 px-4 rounded-full border border-white/10 hover:bg-white/5 transition-all text-gray-400`}
              >
                {expanded ? 'Show Less' : 'View All'}
              </button>
            </div>
            <div className={`grid gap-4 ${expanded ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-4'}`}>
              {rankers.slice(0, expanded ? rankers.length : 4).map((r, i) => (
                <div key={i} className="flex flex-col items-center p-4 bg-white/5 rounded-3xl group hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-dark border-2 border-white/10 shadow-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform overflow-hidden">
                     <span className="font-black text-white text-lg">{r.name.charAt(0)}</span>
                  </div>
                  <span className={`text-xs font-black ${colors.text} mb-1`}>{r.rank}</span>
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Results = ({ navigateTo }) => {
  const [headerRef, headerVisible] = useInView();
  const [activeYear, setActiveYear] = useState('2026');
  const [activeTab, setActiveTab] = useState('jee');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const years = ['2026', '2025', '2024', '2023'];

  const tabs = [
    { id: 'jee', label: 'JEE', color: 'red' },
    { id: 'neet', label: 'NEET', color: 'green' },
    { id: 'mht-cet', label: 'MHT-CET', color: 'blue' },
  ];

  const starPerformers = [
    { name: 'Devansh Sharma', rank: 11, exam: 'JEE Advanced', score: '99.99%ile', img: '/assets/ranker1.png' },
    { name: 'Aisha Khan', rank: 1, exam: 'NEET 2026', score: '720/720', img: '/assets/ranker2.png' },
    { name: 'Aditya Verma', rank: 22, exam: 'JEE Advanced', score: '99.97%ile', img: '/assets/ranker3.png' },
    { name: 'Sanskar Patil', rank: 3, exam: 'NEET 2026', score: '718/720', img: '/assets/sanskar.png' },
  ];

  const jeeData = {
    '2026': {
      advanced: {
        title: 'JEE Advanced',
        year: '2026',
        color: 'red',
        stats: [
          { value: '51', suffix: '%', label: 'Selection' },
          { value: '150', suffix: '+', label: 'Qualified' },
          { value: '11', label: 'Top AIR' },
        ],
        rankers: [
          { name: 'Devansh', rank: 'AIR 11', img: '/assets/ranker1.png' },
          { name: 'Aditya', rank: 'AIR 22', img: '/assets/ranker2.png' },
          { name: 'Raj', rank: 'AIR 33', img: '/assets/ranker3.png' },
          { name: 'Sanskar', rank: 'AIR 44', img: '/assets/sanskar.png' },
          { name: 'Priya', rank: 'AIR 56', img: '/assets/ranker1.png' },
          { name: 'Rahul', rank: 'AIR 78', img: '/assets/ranker2.png' },
          { name: 'Sohan', rank: 'AIR 89', img: '/assets/ranker3.png' },
          { name: 'Ankit', rank: 'AIR 95', img: '/assets/ranker4.png' },
        ],
      },
      main: {
        title: 'JEE Main',
        year: '2026',
        color: 'blue',
        stats: [
          { value: '99.9', suffix: '%', label: 'Avg Percentile' },
          { value: '500', suffix: '+', label: 'Above 99%' },
          { value: '1200', suffix: '+', label: 'Selected' },
        ],
        rankers: [
          { name: 'Rahul', rank: '99.98%ile', color: 'from-indigo-100 to-indigo-200' },
          { name: 'Priya', rank: '99.95%ile', color: 'from-blue-100 to-blue-200' },
          { name: 'Sohan', rank: '99.91%ile', color: 'from-indigo-100 to-indigo-200' },
          { name: 'Ankit', rank: '99.87%ile', color: 'from-blue-100 to-blue-200' },
          { name: 'Sneha', rank: '99.82%ile', color: 'from-indigo-100 to-indigo-200' },
          { name: 'Vikram', rank: '99.78%ile', color: 'from-blue-100 to-blue-200' },
          { name: 'Meera', rank: '99.74%ile', color: 'from-indigo-100 to-indigo-200' },
          { name: 'Rohan', rank: '99.69%ile', color: 'from-blue-100 to-blue-200' },
        ],
      },
    },
    '2025': {
      advanced: {
        title: 'JEE Advanced',
        year: '2025',
        color: 'red',
        stats: [
          { value: '48', suffix: '%', label: 'Selection' },
          { value: '130', suffix: '+', label: 'Qualified' },
          { name: '15', label: 'Top AIR' },
        ],
        rankers: [
          { name: 'Arjun', rank: 'AIR 15', color: 'from-red-100 to-red-200' },
          { name: 'Sneha', rank: 'AIR 28', color: 'from-orange-100 to-orange-200' },
          { name: 'Vikram', rank: 'AIR 41', color: 'from-yellow-100 to-yellow-200' },
          { name: 'Meera', rank: 'AIR 55', color: 'from-amber-100 to-amber-200' },
        ],
      },
      main: {
        title: 'JEE Main',
        year: '2025',
        color: 'blue',
        stats: [
          { value: '99.7', suffix: '%', label: 'Avg Percentile' },
          { value: '450', suffix: '+', label: 'Above 99%' },
          { value: '1000', suffix: '+', label: 'Selected' },
        ],
        rankers: [
          { name: 'Arjun', rank: '99.96%ile', color: 'from-indigo-100 to-indigo-200' },
          { name: 'Sneha', rank: '99.92%ile', color: 'from-blue-100 to-blue-200' },
          { name: 'Vikram', rank: '99.88%ile', color: 'from-indigo-100 to-indigo-200' },
          { name: 'Meera', rank: '99.85%ile', color: 'from-blue-100 to-blue-200' },
        ],
      },
    },
  };

  const neetData = {
    '2026': {
      main: {
        title: 'NEET',
        year: '2026',
        color: 'green',
        stats: [
          { value: '48', suffix: '%', label: 'Selection' },
          { value: '120', suffix: '+', label: 'Qualified' },
          { value: '1', label: 'Top AIR' },
        ],
        rankers: [
          { name: 'Aisha', rank: 'AIR 1', color: 'from-green-100 to-green-200' },
          { name: 'Krishna', rank: 'AIR 3', color: 'from-emerald-100 to-emerald-200' },
          { name: 'Farhan', rank: 'AIR 7', color: 'from-teal-100 to-teal-200' },
          { name: 'Diya', rank: 'AIR 12', color: 'from-green-100 to-green-200' },
          { name: 'Raj', rank: 'AIR 18', color: 'from-emerald-100 to-emerald-200' },
          { name: 'Priya', rank: 'AIR 25', color: 'from-teal-100 to-teal-200' },
          { name: 'Aman', rank: 'AIR 32', color: 'from-green-100 to-green-200' },
          { name: 'Sana', rank: 'AIR 40', color: 'from-emerald-100 to-emerald-200' },
        ],
      },
      state: {
        title: 'State Toppers',
        year: '2026',
        color: 'green',
        stats: [
          { value: '8', suffix: '', label: 'State Toppers' },
          { value: '1', suffix: '', label: 'State Rank' },
          { value: '100', suffix: '%', label: 'Selection' },
        ],
        rankers: [
          { name: '#1', rank: 'State', color: 'from-yellow-100 to-yellow-200' },
          { name: '#2', rank: 'State', color: 'from-green-100 to-green-200' },
          { name: '#3', rank: 'State', color: 'from-green-100 to-green-200' },
          { name: '#4', rank: 'State', color: 'from-green-100 to-green-200' },
          { name: '#5', rank: 'State', color: 'from-green-100 to-green-200' },
          { name: '#6', rank: 'State', color: 'from-green-100 to-green-200' },
          { name: '#7', rank: 'State', color: 'from-green-100 to-green-200' },
          { name: '#8', rank: 'State', color: 'from-green-100 to-green-200' },
        ],
      },
    },
  };

  const mhtcetData = {
    '2026': {
      main: {
        title: 'MHT-CET',
        year: '2026',
        color: 'blue',
        stats: [
          { value: '55', suffix: '%', label: 'Selection' },
          { value: '200', suffix: '+', label: 'Qualified' },
          { value: '99.98', suffix: '%ile', label: 'Top Score' },
        ],
        rankers: [
          { name: 'Sameer', rank: '99.98%ile', color: 'from-blue-100 to-blue-200' },
          { name: 'Anjali', rank: '99.95%ile', color: 'from-indigo-100 to-indigo-200' },
          { name: 'Omkar', rank: '99.92%ile', color: 'from-blue-100 to-blue-200' },
          { name: 'Tanvi', rank: '99.88%ile', color: 'from-indigo-100 to-indigo-200' },
        ],
      },
      state: {
        title: 'District Rankers',
        year: '2026',
        color: 'blue',
        stats: [
          { value: '15', suffix: '+', label: 'Dist. Toppers' },
          { value: '1', suffix: '', label: 'Nashik Rank' },
          { value: '100', suffix: '%', label: 'Pass Ratio' },
        ],
        rankers: [
          { name: '#1', rank: 'Nashik', color: 'from-blue-100 to-blue-200' },
          { name: '#1', rank: 'Sinnar', color: 'from-indigo-100 to-indigo-200' },
          { name: '#1', rank: 'Yeola', color: 'from-blue-100 to-blue-200' },
          { name: '#2', rank: 'Nashik', color: 'from-indigo-100 to-indigo-200' },
        ],
      },
    },
  };



  const currentData = activeTab === 'jee' ? jeeData[activeYear] : activeTab === 'neet' ? neetData[activeYear] : activeTab === 'mht-cet' ? mhtcetData[activeYear] : null;

  return (
    <section className="pt-10 pb-20 bg-brand-dark overflow-hidden relative">
      {/* Premium Spotlight Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(192,0,0,0.15)_0,transparent_60%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_100%,rgba(253,185,19,0.05)_0,transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-10 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-2.5 mb-6 shadow-2xl">
            <div className="w-2.5 h-2.5 bg-brand-yellow rounded-full animate-pulse shadow-[0_0_10px_rgba(253,185,19,0.8)]"></div>
            <span className="text-white text-[12px] md:text-[14px] font-black uppercase tracking-[0.3em]">Live Results 2025-26</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase mb-3 tracking-tighter leading-[1] text-white">
            Our <span className="text-brand-red">Champions</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-black uppercase tracking-[0.4em] max-w-2xl mx-auto">
            19 Years of Excellence in JEE & NEET
          </p>
          {/* Year Selector */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex bg-white/10 backdrop-blur-xl rounded-2xl p-1.5 border border-white/10 shadow-2xl">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-8 py-3 rounded-xl font-black text-sm transition-all duration-500 uppercase tracking-widest ${
                    activeYear === year 
                      ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30 scale-[1.05]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Star Performers Highlights */}
        <div className="mb-14 relative">
          <div className="absolute inset-0 bg-brand-red/5 blur-[100px] rounded-full"></div>
          <div className="flex items-center justify-between mb-6 relative z-10 px-4">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center text-lg shadow-lg">⭐</div>
               <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tight">Wall Of Fame</h3>
            </div>
            <span className="text-brand-yellow text-xs font-black uppercase tracking-[0.4em] hidden md:block">Elite Rankers Spotlight</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {starPerformers.map((s, i) => (
              <StarPerformer key={i} {...s} delay={i * 100} />
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white/5 backdrop-blur-xl rounded-[2rem] p-1.5 border border-white/10 shadow-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 md:px-12 py-4 rounded-[1.5rem] font-black text-xs md:text-sm uppercase tracking-widest transition-all duration-500 ${
                  activeTab === tab.id 
                    ? 'bg-white text-brand-dark shadow-xl scale-[1.05]' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* JEE Content */}
        {activeTab === 'jee' && currentData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ResultCard 
              {...currentData.advanced}
              stats={currentData.advanced.stats}
              rankers={currentData.advanced.rankers}
              delay={100}
            />
            <ResultCard 
              {...currentData.main}
              stats={currentData.main.stats}
              rankers={currentData.main.rankers}
              delay={200}
            />
          </div>
        )}

        {/* NEET Content */}
        {activeTab === 'neet' && currentData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ResultCard 
              {...currentData.main}
              stats={currentData.main.stats}
              rankers={currentData.main.rankers}
              delay={100}
            />
            <ResultCard 
              {...currentData.state}
              stats={currentData.state.stats}
              rankers={currentData.state.rankers}
              delay={200}
            />
          </div>
        )}

        {/* MHT-CET Content */}
        {activeTab === 'mht-cet' && currentData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ResultCard 
              {...currentData.main}
              stats={currentData.main.stats}
              rankers={currentData.main.rankers}
              delay={100}
            />
            <ResultCard 
              {...currentData.state}
              stats={currentData.state.stats}
              rankers={currentData.state.rankers}
              delay={200}
            />
          </div>
        )}



        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 font-bold mb-4">Want to see complete result details?</p>
          <button 
            onClick={() => navigateTo('live-results')}
            className="px-8 py-4 bg-brand-dark text-white font-black uppercase tracking-wider rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            View All Results
          </button>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Results;
