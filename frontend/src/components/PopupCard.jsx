import React, { useState } from 'react';
import { X, Sparkles, ExternalLink } from 'lucide-react';
import { getMediaUrl } from '../api';

const PopupCard = ({
  popup,
  onClose,
  onClick,
  isInteractive = true,
  className = ''
}) => {
  if (!popup) return null;

  const [imgSrc, setImgSrc] = useState(() => getMediaUrl(popup.image));
  const [imgError, setImgError] = useState(false);

  // Sync if popup.image changes
  React.useEffect(() => {
    setImgSrc(getMediaUrl(popup.image));
    setImgError(false);
  }, [popup.image]);

  const orientation = popup.orientation || 'vertical';
  const scale = (typeof popup.scale === 'number' && popup.scale >= 50 && popup.scale <= 160) 
    ? popup.scale 
    : 100;
  const scaleFactor = scale / 100;
  const showOverlay = Boolean(popup.showOverlay);
  const isHorizontal = orientation === 'horizontal';

  // Base widths
  const baseWidth = isHorizontal ? 800 : 430;
  const computedMaxWidth = Math.round(baseWidth * scaleFactor);

  const handleClick = (e) => {
    if (!isInteractive) return;
    if (onClick) {
      onClick(popup);
    } else if (popup.link) {
      window.open(popup.link, '_blank');
    }
  };

  return (
    <div
      style={{
        maxWidth: `${computedMaxWidth}px`,
        width: '100%'
      }}
      className={`relative bg-slate-900 rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col mx-auto select-none transition-all duration-300 ${className}`}
    >
      {/* Floating Close Button */}
      {onClose && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-3.5 right-3.5 z-40 w-8 h-8 md:w-9 md:h-9 bg-black/70 hover:bg-brand-red text-white backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/15 transition-all duration-200 active:scale-90"
          title="Close Popup"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      )}

      {/* Main Image Container */}
      <div
        onClick={handleClick}
        className={`relative w-full ${isInteractive ? 'cursor-pointer' : 'cursor-default'} bg-slate-950 flex items-center justify-center overflow-hidden ${
          isHorizontal 
            ? 'aspect-[16/9] md:aspect-[16/10] max-h-[78vh]' 
            : 'max-h-[82vh]'
        }`}
      >
        <img
          src={imgSrc}
          alt={popup.title || 'BK Science Academy Announcement'}
          className={`w-full object-contain ${
            isHorizontal ? 'h-full max-h-[75vh]' : 'h-auto max-h-[80vh]'
          } transition-transform duration-500 hover:scale-[1.015]`}
          loading="eager"
          onError={() => {
            if (!imgError) {
              setImgError(true);
              // If failed with /api/uploads/, try /uploads/ or clean URL as fallback
              if (imgSrc.includes('/api/uploads/')) {
                setImgSrc(imgSrc.replace('/api/uploads/', '/uploads/'));
              } else if (imgSrc.includes('/uploads/')) {
                setImgSrc(imgSrc.replace('/uploads/', '/api/uploads/'));
              }
            }
          }}
        />

        {/* Ambient Overlay (only if showOverlay is enabled) */}
        {showOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-5 md:p-6 pointer-events-none">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-brand-yellow animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-yellow bg-brand-yellow/15 px-2.5 py-0.5 rounded-full border border-brand-yellow/25">
                {popup.link ? 'Special Offer' : 'Academy Update'}
              </span>
            </div>

            {popup.title && (
              <h2 className="text-white text-base md:text-lg font-black uppercase tracking-tight mb-3 drop-shadow-md">
                {popup.title}
              </h2>
            )}

            <div className="flex items-center gap-2 pointer-events-auto">
              <div className="bg-brand-red text-white py-2 px-4 md:py-2.5 md:px-5 rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest inline-flex items-center gap-2 shadow-lg shadow-brand-red/35 hover:bg-brand-dark transition-all duration-300">
                {popup.link ? 'Learn More' : 'Register Now'}
                <span>→</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sleek Bottom Status Bar */}
      <div 
        onClick={handleClick}
        className={`py-2.5 px-4 bg-[#11111c] text-center border-t border-white/10 flex items-center justify-between text-white/70 ${isInteractive ? 'cursor-pointer hover:bg-[#181829]' : ''} transition-colors`}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
          <span className="text-white/80 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
            BK Science Academy
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-white/50 text-[8px] md:text-[9px] font-bold uppercase tracking-wider">
          {popup.link ? (
            <>
              <span>Click to view details</span>
              <ExternalLink size={10} />
            </>
          ) : (
            <span>Tap to register</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
