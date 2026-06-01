import React from 'react';

const WhyBKCareer = () => {
  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark leading-[0.95] tracking-tighter mb-12 uppercase">
            Why Build Your <span className="text-brand-red">Career At BK?</span>
          </h2>
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-10 gap-y-10 lg:gap-y-12">
            {[
              { title: "Academic Excellence", desc: "Work alongside some of the finest minds in the coaching industry.", color: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600" },
              { title: "Innovation Led", desc: "We leverage cutting-edge technology to enhance the learning experience.", color: "bg-blue-50 text-blue-600 group-hover:bg-blue-600" },
              { title: "Growth & Impact", desc: "Directly influence the success of thousands of aspiring students.", color: "bg-purple-50 text-purple-600 group-hover:bg-purple-600" },
              { title: "Cinematic Workspace", desc: "A professional, high-energy environment built for excellence.", color: "bg-orange-50 text-orange-600 group-hover:bg-orange-600" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 sm:gap-6 group text-center">
                <div className={`w-12 h-12 sm:w-20 sm:h-20 ${item.color} rounded-2xl sm:rounded-[2rem] flex items-center justify-center font-black text-lg sm:text-3xl group-hover:text-white transition-all duration-500 shrink-0 border border-gray-100 shadow-sm`}>
                  0{i + 1}
                </div>
                <div>
                  <h4 className="text-sm sm:text-2xl font-black text-brand-dark mb-1 sm:mb-3 uppercase tracking-tight">{item.title}</h4>
                  <p className="text-[10px] sm:text-lg text-gray-500 leading-relaxed font-medium max-w-xs mx-auto">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBKCareer;
