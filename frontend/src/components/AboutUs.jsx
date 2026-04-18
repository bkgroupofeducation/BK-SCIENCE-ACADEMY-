import React from 'react';
import SafeImage from './SafeImage';

const AboutUs = ({ navigateTo }) => {
  const values = [
    {
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, from teaching methodologies to student support.",
      icon: "✨"
    },
    {
      title: "Integrity",
      description: "We maintain absolute transparency and honesty in our approach to education and student guidance.",
      icon: "🤝"
    },
    {
      title: "Innovation",
      description: "Constantly evolving our pedagogy to stay ahead of the changing patterns of competitive exams.",
      icon: "🚀"
    },
    {
      title: "Student-First",
      description: "Every decision we make is centered around the growth and success of our students.",
      icon: "❤️"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 md:pt-20 md:pb-16 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full animate-grid-move bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tight animate-fade-up">
            About <span className="text-brand-red underline decoration-brand-red/30 underline-offset-8">Us</span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-400 font-medium max-w-3xl mx-auto animate-fade-up stagger-1 leading-relaxed">
            The epicenter of academic brilliance and transformative learning since 2010.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative animate-fade-up">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-3xl border-8 border-white">
                <SafeImage 
                  src="/assets/Campus.jpg" 
                  className="w-full h-auto" 
                  fallbackText="BK Science Academy Campus" 
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-red/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-yellow/10 rounded-full blur-3xl -z-10"></div>
              
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl z-20 border border-white/20">
                <div className="text-brand-red font-black text-4xl mb-1">15+</div>
                <div className="text-brand-dark font-bold uppercase tracking-widest text-sm">Years of Educational Leadership</div>
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-fade-up stagger-1">
              <div className="text-brand-red font-black uppercase tracking-[0.3em] mb-6 inline-block border-b-4 border-brand-red pb-2">Our Journey</div>
              <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-8 leading-tight uppercase">
                Building the <br />
                <span className="text-brand-red">Future Leaders.</span>
              </h2>
              <div className="space-y-6 text-gray-600 font-medium text-lg leading-relaxed">
                <p>
                  BK Science Academy started with a simple yet powerful vision: to provide high-quality, accessible coaching for medical and engineering entrance examinations. What began as a small classroom has today evolved into a premier educational institution.
                </p>
                <p>
                  Our journey is defined by the success of our students. From the first batch of selected candidates to the thousands of doctors and engineers we've helped shape, our commitment remains unshakable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-brand-gray relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-4 uppercase">Our Core Values</h2>
            <div className="w-20 h-2 bg-brand-red mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="text-5xl mb-6">{v.icon}</div>
                <h3 className="text-xl font-black text-brand-dark mb-4 uppercase">{v.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Message */}
      <section className="pt-24 pb-0 overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-brand-dark rounded-[4rem] p-10 md:p-20 relative overflow-hidden animate-fade-up">
            <div className="absolute top-0 right-0 p-20">
              <div className="w-96 h-96 bg-brand-red opacity-10 blur-[100px] rounded-full"></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-brand-red p-2 bg-white/5">
                <SafeImage 
                  src="/assets/Founder.jpeg" 
                  className="w-full h-full object-cover rounded-full" 
                  fallbackText="Dr. Bhagwan Nivrutti Elmame" 
                />
              </div>
              <div className="text-center md:text-left">
                <div className="text-brand-yellow font-black uppercase tracking-[0.2em] mb-4">Founder's Message</div>
                <p className="text-2xl md:text-3xl font-bold text-white italic mb-8 leading-relaxed">
                  "At BK Science, we don't just teach subjects; we ignite curiosity and instill the discipline needed to conquer the toughest challenges in life."
                </p>
                <div className="text-white">
                  <div className="text-brand-yellow font-black uppercase tracking-[0.2em] text-xs mb-2">Honorable Secretary</div>
                  <div className="text-2xl md:text-3xl font-black uppercase tracking-tight text-brand-red mb-2 leading-none">
                    Dr. Adv. Er. Bhagwan Nivrutti Elmame
                  </div>
                  <div className="text-gray-400 font-black uppercase tracking-widest text-[10px] md:text-xs">
                    Secretary of the BK Educational and Welfare Society
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-8 pb-24 bg-white text-center">
        <div className="container mx-auto px-6">
          <div className="animate-fade-up">
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-8 uppercase tracking-tighter">
              Join Our <span className="text-brand-red">Legacy</span> Of Success.
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center max-w-xl mx-auto">
              <button 
                onClick={() => navigateTo('registration')}
                className="flex-1 bg-brand-red text-white font-black py-5 px-10 rounded-2xl hover:bg-brand-dark transition-all duration-500 shadow-2xl shadow-brand-red/20 uppercase tracking-widest active:scale-95 cursor-pointer"
              >
                Enroll Now
              </button>
              <button 
                onClick={() => navigateTo('centers')}
                className="flex-1 bg-white text-brand-dark border-2 border-brand-dark font-black py-5 px-10 rounded-2xl hover:bg-brand-gray transition-all shadow-lg uppercase tracking-widest active:scale-95 cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
