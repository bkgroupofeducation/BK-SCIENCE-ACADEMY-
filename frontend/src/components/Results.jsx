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

const StarPerformer = ({ name, rank, exam, score, delay }) => {
  const [ref, isVisible] = useInView();
  
  return (
    <div 
      ref={ref}
      className={`relative group cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-brand-red to-orange-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
      <div className="relative bg-white rounded-3xl p-6 border border-gray-100 shadow-xl group-hover:-translate-y-2 transition-all duration-500">
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-xl">⭐</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-black text-brand-dark">{name.charAt(0)}</span>
          </div>
          <div>
            <p className="font-black text-brand-dark text-lg">{name}</p>
            <p className="text-xs text-gray-400 font-bold uppercase">{exam}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="px-3 py-1 bg-brand-red/10 rounded-full">
            <span className="text-brand-red font-black text-sm">AIR {rank}</span>
          </div>
          <span className="text-gray-400 text-xs font-bold">{score}</span>
        </div>
      </div>
    </div>
  );
};

const ResultCard = ({ title, year, color, stats, rankers, delay }) => {
  const [ref, isVisible] = useInView();
  const [expanded, setExpanded] = useState(false);

  const colorClasses = {
    red: { bg: 'bg-brand-red', gradient: 'from-red-500 to-red-700', text: 'text-brand-red', light: 'bg-red-50', border: 'border-red-100' },
    blue: { bg: 'bg-[#3F51B5]', gradient: 'from-indigo-500 to-indigo-700', text: 'text-[#3F51B5]', light: 'bg-indigo-50', border: 'border-indigo-100' },
    green: { bg: 'bg-green-600', gradient: 'from-green-500 to-emerald-600', text: 'text-green-600', light: 'bg-green-50', border: 'border-green-100' },
    purple: { bg: 'bg-purple-600', gradient: 'from-purple-500 to-pink-600', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-100' },
  };

  const colors = colorClasses[color] || colorClasses.red;

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-3xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.1)] border ${colors.border} overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: '0.6s' }}
    >
      <div className={`h-2 bg-gradient-to-r ${colors.gradient}`}></div>
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className={`${colors.text} text-xl md:text-2xl font-black uppercase tracking-wide`}>{title}</h3>
            <p className="text-gray-400 text-sm font-bold mt-1">Year {year}</p>
          </div>
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className={`${colors.light} rounded-2xl p-4 text-center`}>
              <div className={`text-2xl md:text-3xl font-black ${colors.text}`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} />
              </div>
              <div className="text-xs font-bold text-gray-500 uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {rankers && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-xs font-black uppercase tracking-wider">Top Rankers</p>
              <button 
                onClick={() => setExpanded(!expanded)}
                className={`text-xs font-bold ${colors.text} hover:underline`}
              >
                {expanded ? 'Show Less' : 'View All'}
              </button>
            </div>
            <div className={`grid gap-3 ${expanded ? 'grid-cols-2' : 'grid-cols-4'}`}>
              {rankers.slice(0, expanded ? rankers.length : 4).map((r, i) => (
                <div key={i} className="flex flex-col items-center p-3 bg-gray-50 rounded-2xl group hover:bg-gray-100 transition-colors">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <span className="font-black text-gray-700">{r.name.charAt(0)}</span>
                  </div>
                  <span className={`text-xs font-black ${colors.text}`}>{r.rank}</span>
                  <span className="text-[10px] text-gray-400">{r.name}</span>
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
    { id: 'olympiads', label: 'Olympiads', color: 'purple' },
  ];

  const starPerformers = [
    { name: 'Devansh Sharma', rank: 11, exam: 'JEE Advanced', score: '99.99%ile' },
    { name: 'Aisha Khan', rank: 1, exam: 'NEET 2026', score: '720/720' },
    { name: 'Aditya Verma', rank: 22, exam: 'JEE Advanced', score: '99.97%ile' },
    { name: 'Krishna Patel', rank: 3, exam: 'NEET 2026', score: '718/720' },
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
          { name: 'Devansh', rank: 'AIR 11', color: 'from-red-100 to-red-200' },
          { name: 'Aditya', rank: 'AIR 22', color: 'from-orange-100 to-orange-200' },
          { name: 'Raj', rank: 'AIR 33', color: 'from-yellow-100 to-yellow-200' },
          { name: 'Aryan', rank: 'AIR 44', color: 'from-amber-100 to-amber-200' },
          { name: 'Priya', rank: 'AIR 56', color: 'from-red-100 to-red-200' },
          { name: 'Rahul', rank: 'AIR 78', color: 'from-orange-100 to-orange-200' },
          { name: 'Sohan', rank: 'AIR 89', color: 'from-yellow-100 to-yellow-200' },
          { name: 'Ankit', rank: 'AIR 95', color: 'from-amber-100 to-amber-200' },
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

  const olympiadData = [
    { title: 'PRMO / RMO', color: 'purple', stats: [
      { value: '2,500', suffix: '+', label: 'Qualified' },
      { value: '85', suffix: '', label: 'State Toppers' },
      { value: '42', suffix: '', label: 'National Camp' },
    ]},
    { title: 'NSEP / INPhO', color: 'blue', stats: [
      { value: '1,800', suffix: '+', label: 'Qualified' },
      { value: '62', suffix: '', label: 'State Toppers' },
      { value: '28', suffix: '', label: 'International' },
    ]},
    { title: 'NSEC / INChO', color: 'purple', stats: [
      { value: '1,200', suffix: '+', label: 'Qualified' },
      { value: '45', suffix: '', label: 'State Toppers' },
      { value: '18', suffix: '', label: 'International' },
    ]},
  ];

  const currentData = activeTab === 'jee' ? jeeData[activeYear] : activeTab === 'neet' ? neetData[activeYear] : activeTab === 'mht-cet' ? mhtcetData[activeYear] : null;

  return (
    <section className="pt-16 md:pt-20 pb-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-brand-red/10"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
        <div className="absolute top-10 left-20 w-72 h-72 bg-brand-red/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-[100px]"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.8; }
        }
      `}} />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-6 py-3 mb-8 shadow-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-brand-dark text-xs font-black uppercase tracking-widest">Live Results 2025-26</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase mb-4 tracking-tight">
            Our <span className="text-brand-red">Champions</span>
          </h2>
          <p className="text-lg text-gray-400 font-bold uppercase tracking-[0.3em]">
            19 Years of Excellence in JEE & NEET
          </p>

          {/* Year Selector */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-lg border border-gray-100">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeYear === year 
                      ? 'bg-brand-red text-white shadow-md' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Star Performers */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-brand-red rounded-full"></div>
            <h3 className="text-xl md:text-2xl font-black text-brand-dark uppercase">Star Performers</h3>
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-2xl">⭐</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {starPerformers.map((s, i) => (
              <StarPerformer key={i} {...s} delay={i * 100} />
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-lg border border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-brand-dark text-white shadow-md' 
                    : 'text-gray-400 hover:text-gray-600'
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

        {/* Olympiads Content */}
        {activeTab === 'olympiads' && (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {olympiadData.map((item, i) => (
                <div 
                  key={i}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:-translate-y-2 transition-all duration-500"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg mb-4">
                      <span className="text-3xl">{i === 0 ? '📐' : i === 1 ? '⚡' : '🧪'}</span>
                    </div>
                    <h3 className="text-lg font-black text-brand-dark uppercase">{item.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {item.stats.map((stat, j) => (
                      <div key={j} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
                        <span className="font-black text-brand-dark">{stat.value}{stat.suffix}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
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