import React, { useEffect, useRef, useState } from 'react';
import './AnniversarySpotlightBadge.css';
import confetti from 'canvas-confetti';
import tenYearsImg from '../../assets/images/ten_yearsAN.jpg'; // adjust path if needed
import Draggable from 'react-draggable';

const BADGE_HEIGHT = 80; // px, adjust if needed for your badge size
const MARGIN = 20; // px

const AnniversarySpotlightBadge = () => {
  const badgeRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  // Use defaultPosition for uncontrolled drag
  const [defaultY, setDefaultY] = useState(MARGIN);
  const [bounds, setBounds] = useState({
    top: 0,
    bottom: window.innerHeight - BADGE_HEIGHT - MARGIN,
  });

  // Confetti burst on mount
  useEffect(() => {
    setTimeout(() => {
      if (badgeRef.current) {
        const rect = badgeRef.current.getBoundingClientRect();
        confetti({
          particleCount: 120,
          spread: 90,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          },
          colors: ['#FFD700', '#FFF8DC', '#1a237e', '#fff'],
        });
      }
    }, 600);
  }, []);

  // Occasional sparkles in right position
  useEffect(() => {
    const sparkle = () => {
      if (badgeRef.current) {
        const rect = badgeRef.current.getBoundingClientRect();
        confetti({
          particleCount: 10,
          spread: 30,
          startVelocity: 20,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          },
          colors: ['#FFD700', '#FFF8DC', '#fff'],
        });
      }
    };
    const interval = setInterval(sparkle, 4000);
    return () => clearInterval(interval);
  }, []);

  // Update bounds on resize
  React.useEffect(() => {
    const handleResize = () => {
      setBounds({
        top: 0,
        bottom: window.innerHeight - BADGE_HEIGHT - MARGIN,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent drag ghost image and selection
  const preventDrag = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <Draggable
      axis="y"
      bounds={bounds}
      defaultPosition={{ x: 0, y: defaultY }}
    >
      <div
        className="spotlight-badge-viewport"
        style={{ position: 'fixed', right: 0, top: 0, zIndex: 50, userSelect: 'none' }}
        onMouseDown={e => e.preventDefault()} // Prevent text/image selection
      >
        <div className="spotlight-badge-glow right" />
        <div className="spotlight-badge-mover to-right">
          <div
            className="spotlight-badge right"
            ref={badgeRef}
            tabIndex={0}
            aria-label="10 Year Anniversary"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <img
              src={tenYearsImg}
              alt="10 Year Anniversary"
              className="badge-img"
              draggable={false}
              onDragStart={preventDrag}
              style={{ userSelect: 'none', pointerEvents: 'auto' }}
            />
            <div className="badge-reflection" />
            {showTooltip && (
              <div className="badge-tooltip">
                🎉 Celebrating 10 Years of Excellence!
              </div>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default AnniversarySpotlightBadge;