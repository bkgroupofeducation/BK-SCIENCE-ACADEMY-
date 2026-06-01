import React, { useState, useEffect, useRef } from 'react';
import {
  Trophy,
  GraduationCap,
  ArrowRight,
  Zap,
  Award,
  Users,
  BookOpen,
  TrendingUp,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CounselingForm from './CounselingForm';
import { API_BASE } from '../api';

const Hero = ({ navigateTo }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    targetExam: '',
    location: ''
  });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [toppers, setToppers] = useState([
    { name: 'Vaishnavi Patil', college: 'Success Story', quote: 'BK Science Academy transformed my learning experience completely.', image: '/assets/ranker1.png', video: 'https://www.youtube.com/shorts/3Qz9HNcdNRk' },
    { name: 'Rohan Dusane', college: 'Success Story', quote: 'The mentorship here is unmatched. I highly recommend it!', image: '/assets/sanskar.png', video: 'https://www.youtube.com/shorts/luutp7wZfrI' },
    { name: 'Sneha More', college: 'Success Story', quote: 'Achieving my goals was possible only with BK Academy guidance.', image: '/assets/ranker3.png', video: 'https://www.youtube.com/shorts/N5-mw7NLlVI' }
  ]);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const iframeRef = useRef(null);

  const toggleMute = () => {
    const player = iframeRef.current;
    if (!player) return;
    const command = isMuted ? 'unMute' : 'mute';
    player.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command, args: [] }), '*');
    setIsMuted(!isMuted);
  };

  const togglePlay = () => {
    const player = iframeRef.current;
    if (!player) return;
    const command = isPlaying ? 'pauseVideo' : 'playVideo';
    player.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command, args: [] }), '*');
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
      const match = url.match(regex);
      const videoId = match ? match[1] : null;
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1&loop=1&playlist=${videoId}`;
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/toppers`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          const raw = data.data;
          const formatted = raw.map(t => ({
            name: t.name,
            college: t.exam || 'Success Story',
            quote: t.quote || 'Watch my journey with BK Science Academy.',
            image: t.image ? (t.image.startsWith('/uploads') ? `${API_BASE}${t.image}` : t.image) : '/assets/ranker1.png',
            video: t.videoUrl
          }));
          setToppers(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch toppers:', err);
      }
    };
    fetchToppers();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const handleYoutubeMessage = (event) => {
      if (!event.origin.includes('youtube.com')) return;
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'infoDelivery' && data.info) {
          const state = data.info.playerState;
          if (state === 0) { // ENDED
            setIsPlaying(false);
            setIsUserPaused(false);
            setActiveTestimonial((prev) => (prev + 1) % toppers.length);
          } else if (state === 1) { // PLAYING
            setIsPlaying(true);
            setIsUserPaused(false);
          } else if (state === 2) { // PAUSED
            setIsPlaying(false);
            setIsUserPaused(true);
          } else if (state === -1) { // UNSTARTED
             const player = iframeRef.current;
             if (player) {
               const command = isMuted ? 'mute' : 'unMute';
               player.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command, args: [] }), '*');
             }
          }
        }
      } catch (e) {}
    };
    window.addEventListener('message', handleYoutubeMessage);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('message', handleYoutubeMessage);
    };
  }, [toppers.length, isMuted]);

  useEffect(() => {
    if (toppers.length === 0 || isPlaying || isUserPaused) return;
    const slideInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % toppers.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [toppers.length, isPlaying, isUserPaused]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/api/counseling/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setFormData({ fullName: '', email: '', mobile: '', targetExam: '', location: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Server connection issue.');
    }
  };

  return (
    <section className="relative min-h-screen mesh-gradient overflow-hidden flex items-center pt-24 lg:pt-32 pb-8 lg:pb-12">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-red/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[150px] animate-float-slow"></div>
        <div className="absolute top-[20%] right-[15%] w-[30%] h-[30%] bg-brand-yellow/5 rounded-full blur-[100px] animate-float-delayed"></div>
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="space-y-8 max-w-2xl">
            <div 
              onClick={() => navigateTo('admission')}
              className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full animate-fade-up cursor-pointer hover:bg-white/20 hover:border-brand-red/30 transition-all duration-300 group/banner shadow-lg shadow-black/10"
            >
              <Zap size={14} className="text-brand-yellow group-hover:scale-125 transition-transform" />
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em] font-sans">Admissions Open 2026-27</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[7.5rem] font-black leading-[1] sm:leading-[0.85] tracking-tighter uppercase text-white">
                Crack 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-yellow py-2">JEE & NEET</span>
                <span className="text-white/40 tracking-[0.2em] text-2xl md:text-4xl lg:text-6xl block mt-2">2026-27</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                Experience the science of high-performance coaching with <span className="text-white border-b-2 border-brand-red">India's Lead Academic Mentors</span>.
              </p>
            </div>

            <div className="flex flex-row items-center gap-2 md:gap-4 [perspective:1000px]">
              {[
                { icon: Award, label: 'ISO Certified' },
                { icon: GraduationCap, label: '15+ Years Exp' },
                { icon: Users, label: '50,000+ Students' }
              ].map((badge, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ rotateY: 10, translateZ: 20, scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 whitespace-nowrap shadow-2xl"
                >
                  <badge.icon size={14} className="text-brand-yellow md:w-5 md:h-5" />
                  <span className="text-white text-[9px] md:text-xs font-black uppercase tracking-widest">{badge.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-row gap-2 md:gap-5">
              <button onClick={() => navigateTo('registration')} className="group flex-1 px-4 md:px-10 py-4 md:py-5 bg-brand-red text-white font-black uppercase tracking-[0.1em] md:tracking-[0.2em] rounded-2xl shadow-[0_20px_40px_rgba(192,0,0,0.4)] hover:shadow-[0_25px_50px_rgba(192,0,0,0.6)] hover:scale-105 transition-all duration-500 flex items-center justify-center gap-2 md:gap-3 text-[10px] md:text-sm relative overflow-hidden">
                <span className="relative z-10">Inquiry Now</span>
                <ArrowRight size={14} className="relative z-10 group-hover:translate-x-2 transition-transform hidden sm:block" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
              <button onClick={() => navigateTo('jee')} className="flex-1 px-4 md:px-12 py-4 md:py-5 bg-white/10 border-2 border-white/30 text-white font-black uppercase tracking-[0.1em] md:tracking-[0.2em] rounded-2xl hover:bg-white/20 hover:border-brand-yellow transition-all duration-500 backdrop-blur-xl text-[10px] md:text-sm shadow-2xl group flex items-center justify-center gap-2 md:gap-3">
                <span>View Course</span>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-yellow animate-ping"></div>
              </button>
            </div>

            {status !== 'idle' && (
              <div className={`mt-6 p-5 rounded-2xl border ${status === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                {message}
              </div>
            )}

            {/* Stats removed as requested */}
          </div>

          <div className="relative w-[300px] sm:w-[360px] mx-auto lg:mr-0 mt-8 lg:mt-0 lg:ml-auto">
            {/* Mobile Frame Mockup */}
            <div className="relative w-full aspect-[9/16] rounded-[2.5rem] sm:rounded-[3.5rem] border-[10px] sm:border-[14px] border-slate-900 bg-black shadow-2xl shadow-brand-red/20 ring-1 ring-white/10 overflow-hidden group/featured">
              
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
                <div className="w-12 h-1.5 bg-slate-800 rounded-full"></div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTestimonial}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 transition-transform duration-1000 group-hover/featured:scale-105">
                    {(() => {
                      const embedUrl = getYoutubeEmbedUrl(toppers[activeTestimonial].video);
                      return embedUrl ? (
                        <div className="w-full h-full relative">
                          <iframe
                            ref={iframeRef}
                            src={`${embedUrl}&controls=0&showinfo=0`}
                            title="Success Story"
                            className="w-full h-full scale-[1.3] origin-center pointer-events-none"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                          {/* Interaction Mask to hide YouTube controls */}
                          <div className="absolute inset-0 z-10 bg-transparent" />
                        </div>
                      ) : (
                        <div className="w-full h-full relative">
                          <img src={toppers[activeTestimonial].image} alt="Topper" className="w-full h-full object-cover object-top brightness-[0.8] transition-all" />
                        </div>
                      );
                    })()}
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    <motion.div 
                      animate={{ 
                        x: ['-100%', '200%'],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "linear",
                        repeatDelay: 2
                      }}
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>


      </div>
      <form onSubmit={handleSubmit} className="hidden"></form>
    </section>
  );
};

export default Hero;
