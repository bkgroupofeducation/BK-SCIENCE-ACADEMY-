import React, { useState } from 'react';

const SafeImage = ({ src, alt, className, fallbackText = 'Image unavailable', ...props }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`bg-gray-100 flex flex-col items-center justify-center text-gray-400 ${className || ''}`}>
        <svg className="w-8 h-8 mb-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-xs font-bold">{fallbackText}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default SafeImage;