import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { API_BASE } from '../api';
import PopupCard from './PopupCard';

const AdPopup = ({ onOpenCounseling, onVisibilityChange }) => {
  const [popups, setPopups] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    onVisibilityChange?.(isVisible);
  }, [isVisible, onVisibilityChange]);

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/popups`);
        const data = await res.json();

        let activeBanners = [];
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          activeBanners = data.data;
        } else {
          // Fallback default counseling banner if none uploaded
          activeBanners = [{
            _id: 'default-counseling',
            title: 'Free Career Guidance & Counseling',
            image: '/assets/123.jpeg',
            orientation: 'vertical',
            scale: 100,
            showOverlay: true,
            isDefaultCounseling: true,
            isActive: true
          }];
        }

        setPopups(activeBanners);

        // Show popup after 3.5s delay
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 3500);

        return () => clearTimeout(timer);
      } catch (err) {
        console.error('Failed to load active popups:', err);
        setPopups([{
          _id: 'default-counseling',
          title: 'Free Career Guidance & Counseling',
          image: '/assets/123.jpeg',
          orientation: 'vertical',
          scale: 100,
          showOverlay: true,
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

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? popups.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === popups.length - 1 ? 0 : prev + 1));
  };

  if (!isVisible || popups.length === 0) return null;

  const currentPopup = popups[currentIndex] || popups[0];

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Backdrop Close Handler */}
      <div 
        className="absolute inset-0 cursor-default"
        onClick={handleClose}
      />

      {/* Main Container */}
      <div className="relative z-[10001] w-full flex flex-col items-center justify-center my-auto animate-pop-in">
        <div className="relative flex items-center justify-center w-full">
          {/* Previous Arrow for Carousel */}
          {popups.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:-left-6 md:-left-12 z-50 p-2.5 sm:p-3 bg-black/70 hover:bg-brand-red text-white backdrop-blur-md rounded-full border border-white/20 transition-all duration-200 active:scale-90 shadow-xl"
              title="Previous Announcement"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Popup Card */}
          <PopupCard
            popup={currentPopup}
            onClose={handleClose}
            onClick={handlePopupClick}
            isInteractive={true}
          />

          {/* Next Arrow for Carousel */}
          {popups.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 sm:-right-6 md:-right-12 z-50 p-2.5 sm:p-3 bg-black/70 hover:bg-brand-red text-white backdrop-blur-md rounded-full border border-white/20 transition-all duration-200 active:scale-90 shadow-xl"
              title="Next Announcement"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Dots Indicator when multiple popups */}
        {popups.length > 1 && (
          <div className="flex items-center gap-2 mt-4 z-50">
            {popups.map((p, idx) => (
              <button
                key={p._id || idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'w-6 bg-brand-red shadow-lg shadow-brand-red/50' 
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                title={`View announcement ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdPopup;
