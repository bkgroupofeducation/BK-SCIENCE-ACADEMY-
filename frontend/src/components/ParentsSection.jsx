import React from 'react';
import { 
  MessageSquare, 
  Calendar, 
  ClipboardList, 
  ShieldCheck, 
  MessageCircle, 
  CreditCard,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const ParentsSection = ({ navigateTo }) => {
  const features = [
    {
      icon: MessageSquare,
      title: "Daily SMS on Attendance",
      target: "counseling",
      description: "Request daily attendance SMS updates for your ward"
    },
    {
      icon: Calendar,
      title: "Regular & On-demand Parent Teacher Meetings",
      target: "counseling",
      description: "Book 1-on-1 counseling & PTM sessions"
    },
    {
      icon: ClipboardList,
      title: "Performance & Class Engagement report",
      target: "live-results",
      description: "View live test performance, marks & student reports"
    },
    {
      icon: ShieldCheck,
      title: "Unmatched Commitment to Child Safety",
      target: "guidelines",
      description: "Read our comprehensive safety standards & coaching guidelines"
    },
    {
      icon: MessageCircle,
      title: "Test Results on WhatsApp",
      target: "https://wa.me/918888301363?text=Hi%20BK%20Science%20Academy%2C%20I%20would%20like%20to%20receive%20Test%20Results%20on%20WhatsApp",
      external: true,
      description: "Get real-time test scores directly delivered to WhatsApp"
    },
    {
      icon: CreditCard,
      title: "Flexible payment options",
      target: "pay-fee",
      description: "Pay fees conveniently via online & flexible installment options"
    }
  ];

  const handleFeatureClick = (item) => {
    if (item.external) {
      window.open(item.target, '_blank');
    } else if (navigateTo) {
      navigateTo(item.target);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="bg-gradient-to-br from-white via-red-50/20 to-amber-50/20 border-2 border-brand-red/15 rounded-3xl md:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          
          {/* Top accent gradient line matching website brand */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-red via-brand-yellow to-brand-red"></div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-dark leading-tight tracking-tight">
                  <span className="text-brand-red">Parents,</span> we know exactly <br className="hidden sm:inline" />
                  what you need
                </h2>
              </div>

              {/* Features 2-column Grid */}
              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                {features.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      onClick={() => handleFeatureClick(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleFeatureClick(item);
                        }
                      }}
                      className="flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border border-transparent hover:border-brand-red/25 bg-white/60 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer group"
                      title={`Click to view: ${item.title}`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0 border border-brand-red/20 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-sm">
                          <Icon size={20} />
                        </div>
                        <span className="text-slate-800 font-bold text-sm md:text-base leading-snug group-hover:text-brand-red transition-colors">
                          {item.title}
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-brand-red/10 text-slate-400 group-hover:text-brand-red flex items-center justify-center shrink-0 transition-all duration-300">
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button 
                  onClick={() => navigateTo ? navigateTo('counseling') : null}
                  className="px-8 py-4 bg-brand-red hover:bg-[#a00000] text-white font-bold text-base rounded-2xl shadow-lg shadow-brand-red/20 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Doubts? Ask Now</span>
                  <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                
                {/* Yellow Background Blob/Circle matching Brand Yellow */}
                <div className="absolute inset-4 rounded-full bg-brand-yellow scale-95 shadow-inner"></div>

                {/* Decorative Doodle Elements */}
                <svg className="absolute top-2 left-2 w-16 h-16 text-brand-yellow stroke-current stroke-2 fill-none animate-bounce" viewBox="0 0 100 100">
                  <path d="M20,50 Q40,10 80,50 T20,90" />
                </svg>
                
                <div className="absolute top-6 right-4 text-brand-yellow font-black text-2xl animate-pulse">✦</div>
                <div className="absolute bottom-8 left-6 text-brand-yellow font-black text-xl animate-spin" style={{ animationDuration: '8s' }}>★</div>

                {/* Parent Image */}
                <img 
                  src="/assets/happy_parent.png" 
                  alt="Parents - BK Science Academy" 
                  className="relative z-10 w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/ranker1.png";
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentsSection;
