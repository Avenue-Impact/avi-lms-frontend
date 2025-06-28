import React, { useEffect, useRef, useState } from 'react';
import './AnniversarySpotlightBadge.css';
import confetti from 'canvas-confetti';
import tenYearsImg from '../../assets/images/ten_yearsAN.jpg';
import Draggable from 'react-draggable';

const BADGE_SIZE = 150; // Increased size
const PADDING = 24; // Clean margin from all sides

const getInitialPosition = () => ({
  x: window.innerWidth - BADGE_SIZE - PADDING,
  y: Math.max(PADDING, Math.floor(window.innerHeight * 0.2)),
});

const AnniversarySpotlightBadge = () => {
  const badgeRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState(getInitialPosition());
  const [isDragging, setIsDragging] = useState(false);
  const [bounds, setBounds] = useState({
    left: PADDING,
    top: PADDING,
    right: window.innerWidth - BADGE_SIZE - PADDING,
    bottom: window.innerHeight - BADGE_SIZE - PADDING,
  });

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

  useEffect(() => {
    const handleResize = () => {
      const maxX = window.innerWidth - BADGE_SIZE - PADDING;
      const maxY = window.innerHeight - BADGE_SIZE - PADDING;

      setBounds({
        left: PADDING,
        top: PADDING,
        right: maxX,
        bottom: maxY,
      });

      setPosition(pos => ({
        x: Math.min(Math.max(pos.x, PADDING), maxX),
        y: Math.min(Math.max(pos.y, PADDING), maxY),
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const preventDrag = (e) => {
    e.preventDefault();
    return false;
  };

  const handleStop = (e, data) => {
    setIsDragging(false);
    const width = window.innerWidth;
    const maxX = width - BADGE_SIZE - PADDING;
    const maxY = window.innerHeight - BADGE_SIZE - PADDING;

    const x = data.x < width / 2 ? PADDING : maxX;
    const y = Math.min(Math.max(data.y, PADDING), maxY);
    setPosition({ x, y });
  };

  // Determine if badge is on left or right
  const maxX = window.innerWidth - BADGE_SIZE - PADDING;
  const isLeft = position.x <= PADDING + 5; // 5px tolerance
  const isRight = position.x >= maxX - 5;

  return (
    <Draggable
      position={position}
      bounds={bounds}
      onDrag={(e, data) => { setPosition({ x: data.x, y: data.y }); setIsDragging(true); }}
      onStop={handleStop}
      onStart={() => setIsDragging(true)}
    >
      <div
        className="spotlight-badge-container"
        style={{
          width: BADGE_SIZE,
          height: BADGE_SIZE,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <div className="spotlight-badge-glow" />
        <div
          className="spotlight-badge"
          ref={badgeRef}
          tabIndex={0}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <img
            src={tenYearsImg}
            alt="10 Year Anniversary"
            className="badge-img"
            draggable={false}
            onDragStart={preventDrag}
          />
          <div className="badge-reflection" />
          {showTooltip && (
            <div
              className={`badge-tooltip ${isLeft ? 'right' : 'left'}`}
              style={isLeft ? { left: '110%', right: 'auto', transform: 'translateY(-50%)' } : { right: '110%', left: 'auto', transform: 'translateY(-50%)' }}
            >
              🎉 Celebrating 10 Years of Excellence!
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default AnniversarySpotlightBadge;
