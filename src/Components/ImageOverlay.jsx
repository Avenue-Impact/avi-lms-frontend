import React from 'react';
import overlay from '../assets/images/overlay-img.png';

const ImageOverlay = ({ children }) => {
  return (
    <div className="relative bg-[#23314a]">
      <img
        src={overlay}
        alt="Overlay"
        className="w-full h-full object-cover absolute top-0 left-0 mix-blend-overlay"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ImageOverlay;
