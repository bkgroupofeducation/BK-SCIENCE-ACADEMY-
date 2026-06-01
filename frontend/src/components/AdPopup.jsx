import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { API_BASE } from '../api';

const AdPopup = ({ onOpenCounseling }) => {
  const [popups, setPopups] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/popups`);
        const data = await res.json();
        
        const defaultCounseling = {
          _id: 'default-counseling',
          title: 'Free Career Guidance & Counseling',
          image: '/assets/123.jpeg',
          isDefaultCounseling: true,
          isActive: true
        };

        let activeBanners = [];
        if (data.success && data.data) {
          activeBanners = data.data;
        }

        // Merge active banners and default counseling slide so they show side-by-side
        setPopups([...activeBanners, defaultCounseling]);

        // Show popup after a 3.5s delay (balancing UX and engagement)
        setTimeout(() => {
          setIsVisible(true);
        }, 3500);
      } catch (err) {
        console.error('Failed to load active popups:', err);
        setPopups([{
          _id: 'default-counseling',
          title: 'Free Career Guidance & Counseling',
          image: '/assets/123.jpeg',
          isDefaultCounseling: true,
          isActive: true
        }]);
        setTimeout(() => {
          setIsVisible(true);
        }, 3500);
      }
    };
    fetchPopups();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handlePopupClick = (popup) => {
    if (popup.link) {
      window.open(popup.link, '_blank');
    } else {
      onOpenCounseling();
    }
    handleClose();
  };

  if (!isVisible || popups.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 overflow-y-auto bg-black/70 backdrop-blur-md animate-fade-in">
      {/* Backdrop Close Handler */}
      <div 
        className="absolute inset-0 cursor-default"
        onClick={handleClose}
      />
      
      {/* Cards Container */}
      <div className="relative z-[10001] flex flex-col md:flex-row gap-6 max-w-5xl w-full justify-center items-center my-auto animate-pop-in">
        {popups.map((popup) => {
          const isDefault = popup.isDefaultCounseling;
          const imageUrl = popup.image && popup.image.startsWith('/uploads') 
            ? `${API_BASE}${popup.image}` 
            : popup.image || '';

          return (
            <div
              key={popup._id}
              className="relative w-full max-w-[340px] bg-white rounded-[2rem] overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.35)] border border-gray-100 flex flex-col transform hover:scale-[1.02] transition-all duration-300"
            >
              {/* Close Button on each card */}
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 z-[10005] w-8 h-8 bg-white/90 backdrop-blur-md text-brand-dark rounded-full flex items-center justify-center shadow-md border border-gray-200 hover:bg-brand-red hover:text-white transition-all duration-300 active:scale-95"
              >
                <X size={15} strokeWidth={2.5} />
              </button>

              {/* Card Body - Displays full photo for all slides including Free Counseling */}
              <div 
                className="relative aspect-[4/5] bg-gray-900 flex flex-col justify-end overflow-hidden cursor-pointer"
                onClick={() => handlePopupClick(popup)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={imageUrl} 
                    alt={popup.title || "Special Promotion"} 
                    className="w-full h-full object-contain hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                </div>
                
                {/* Ambient Shadow Overlay - ALWAYS VISIBLE for premium accessibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-6 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-brand-yellow animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-yellow bg-brand-yellow/10 px-2 py-0.5 rounded-full border border-brand-yellow/20">
                      {popup.link ? "Special Offer" : "Free Guidance"}
                    </span>
                  </div>
                  <h2 className="text-white text-base md:text-lg font-black uppercase tracking-tight mb-3 drop-shadow-md">
                    {popup.title || (popup.link ? "Explore Program" : "Free Career Counseling")}
                  </h2>
                  
                  {/* Premium Call to Action Button */}
                  <div className="flex items-center gap-2">
                    <div className="bg-brand-red text-white py-2.5 px-5 rounded-2xl font-black text-[9px] uppercase tracking-widest inline-flex items-center gap-2 shadow-lg shadow-brand-red/35 hover:bg-brand-dark hover:shadow-brand-red/10 transition-all duration-300 transform active:scale-95">
                      {popup.link ? "Learn More" : "Register for Counseling"}
                      <span className="text-[10px] font-bold">→</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Banner */}
              <div className="p-3.5 bg-[#1a1a2e] text-center border-t border-white/5 flex items-center justify-center gap-2 select-none">
                <span className="w-1 h-1 rounded-full bg-brand-yellow animate-pulse" />
                <p className="text-white/50 text-[8px] font-black uppercase tracking-[0.25em]">
                  BK Science Academy Elite Portal
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdPopup;
