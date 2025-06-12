import React, { useEffect, useState } from 'react';
import './AnniversaryModal.css';
import tenYearsImg from '../../assets/images/ten_yearsAN.jpg';

const AnniversaryModal = () => {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);
  const [speed] = useState(0.5); // Reduced speed for subtle movement

  useEffect(() => {
    const moveModal = () => {
      setPosition(prev => {
        let newY = prev + speed * direction;
        
        // Limit the vertical movement range (adjust these values as needed)
        if (newY >= 10) {
          setDirection(-1);
          newY = 10;
        } else if (newY <= -10) {
          setDirection(1);
          newY = -10;
        }
        
        return newY;
      });
    };

    const interval = setInterval(moveModal, 50);
    return () => clearInterval(interval);
  }, [direction, speed]);

  return (
    <div 
      className="anniversary-modal"
      style={{
        transform: `translateY(${position}px)`,
      }}
    >
      <div className="modal-content">
        <img 
          src={tenYearsImg}
          alt="Anniversary Celebration" 
          className="anniversary-image object-cover"
          
        />
      </div>
    </div>
  );
};

export default AnniversaryModal;