import React, { useState } from 'react';

const CourseTabs = () => {
  const [activeTab, setActiveTab] = useState('fees');

  const tabs = [
    { id: 'desc', label: 'Course Description' },
    { id: 'planner', label: 'Academic Planner' },
    { id: 'fees', label: 'Fees Structure' },
    { id: 'batches', label: 'Upcoming Batches' }
  ];

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap border-b border-gray-200 mb-10 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-6 text-lg font-bold transition-all border-b-4 uppercase tracking-wider ${
                activeTab === tab.id ? 'border-brand-red text-brand-red' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white p-12 rounded-3xl shadow-xl transition-all duration-500 min-h-[400px]">
          {activeTab === 'desc' && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
              <h3 className="text-3xl font-bold mb-8 text-brand-dark italic">Target: JEE 12th Advanced 2027</h3>
              <div className="grid md:grid-cols-2 gap-12 text-lg text-gray-600 leading-relaxed italic">
                <div>
                  <p className="mb-6 italic">Specially designed for students currently in Class 11 moving to Class 12. This program focuses on strengthening core concepts and advanced problem-solving techniques.</p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <span className="w-6 h-6 bg-brand-red text-white flex-shrink-0 rounded-full flex items-center justify-center text-xs">✓</span>
                      <span>Comprehensive Printed Study Material</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="w-6 h-6 bg-brand-red text-white flex-shrink-0 rounded-full flex items-center justify-center text-xs">✓</span>
                      <span>Dedicated Doubt Solving Support</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-brand-gray p-8 rounded-2xl border border-gray-100">
                  <h4 className="font-bold text-xl mb-4 italic">Program Highlights</h4>
                  <p className="italic">Expert faculty led lectures, regular assessment tests, and personalized performance analysis to ensure student success.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'planner' && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { count: '320+', label: 'Classes (90 min Each)', icon: '📖' },
                  { count: '5000+', label: 'Practice Questions', icon: '📝' },
                  { count: '35+', label: 'Test Papers', icon: '🏆' },
                  { count: 'FREE', label: 'BK Science Academy App', icon: '📱' }
                ].map((stat, i) => (
                  <div key={i} className="bg-brand-red p-8 rounded-2xl text-white transform transition hover:scale-105 shadow-xl shadow-brand-red/20">
                    <span className="text-4xl mb-4 block">{stat.icon}</span>
                    <h4 className="text-4xl font-black mb-2">{stat.count}</h4>
                    <p className="text-sm font-medium uppercase tracking-widest opacity-80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
              <div className="max-w-4xl mx-auto">
                <div className="bg-brand-red p-10 rounded-t-3xl text-white text-center">
                  <h3 className="text-3xl font-black uppercase tracking-widest mb-2 italic">Standard Fees Structure</h3>
                  <p className="opacity-80 italic">Course: Enthuse Batch (12th Advanced)</p>
                </div>
                <div className="border-x border-b border-gray-100 rounded-b-3xl overflow-hidden divide-y divide-gray-100">
                  <div className="flex justify-between p-8 text-xl">
                    <span className="font-medium text-gray-600">Admission + Kit Fee</span>
                    <span className="font-black text-brand-dark italic">Included</span>
                  </div>
                  <div className="flex justify-between p-8 text-xl">
                    <span className="font-medium text-gray-600">Tuition Fee</span>
                    <span className="font-black text-brand-dark italic">₹1,50,000 (2-Year Total)</span>
                  </div>
                  <div className="flex justify-between p-8 text-3xl bg-brand-gray">
                    <span className="font-black text-brand-dark uppercase tracking-tighter italic">Total Course Fee</span>
                    <span className="font-black text-brand-red italic">₹1,50,000 (2-Year Total)*</span>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-brand-yellow/10 p-8 rounded-2xl border-2 border-brand-yellow/30 flex items-center gap-6">
                    <span className="text-5xl font-black text-brand-yellow">100%</span>
                    <div>
                      <h4 className="font-bold text-xl italic">BK Champions Test Scholarship</h4>
                      <p className="text-gray-600 text-sm italic">Unlock up to 100% scholarship based on your performance.</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-8 rounded-2xl border-2 border-blue-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-md italic">📞</div>
                    <div>
                      <h4 className="font-bold text-xl italic">Special Discount?</h4>
                      <p className="text-gray-600 text-sm italic">Call: +91 88883 01363 for merit-based exceptions.</p>
                    </div>
                  </div>
                </div>
                <p className="mt-8 text-xs text-center text-gray-400 font-medium italic">* GST (18%) additional as per Govt. norms. Study material kit fee is non-refundable.</p>
              </div>
            </div>
          )}

          {activeTab === 'batches' && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { date: '1st April 2026', title: 'Phase 1 - Enthuse', status: 'Active' },
                  { date: '15th April 2026', title: 'Phase 2 - Enthuse', status: 'Coming Soon' },
                  { date: '1st May 2026', title: 'Phase 3 - Enthuse', status: 'Coming Soon' }
                ].map((batch, i) => (
                  <div key={i} className="p-8 border border-gray-100 rounded-3xl hover:border-brand-red transition-all group group-hover:bg-brand-gray shadow-md">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${i === 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      {batch.status}
                    </span>
                    <h4 className="text-2xl font-bold mt-4 italic">{batch.title}</h4>
                    <p className="text-gray-500 mt-2 font-medium italic">Commencement Date: {batch.date}</p>
                    <button className="mt-8 w-full py-3 rounded-full border-2 border-brand-red text-brand-red font-bold transition group-hover:bg-brand-red group-hover:text-white italic">
                      View Schedule
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseTabs;
