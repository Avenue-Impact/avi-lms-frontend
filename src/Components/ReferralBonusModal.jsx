import { Link } from "react-router-dom";
import StripeLogo2 from "@/assets/images/stripeLogo2.webp";
import Draggable from "react-draggable";
import React from "react";

const MODAL_SIZE = 64; // px (w-16 h-16)
const MARGIN = 20; // px

const getInitialY = () => window.innerHeight - MODAL_SIZE - MARGIN;

const ReferralBonusModal = () => {
  // Always start at left bottom
  const [position, setPosition] = React.useState({ x: MARGIN, y: getInitialY() });

  // Update bounds on resize
  const [bounds, setBounds] = React.useState({
    left: 0,
    top: 0,
    right: window.innerWidth - MODAL_SIZE - MARGIN,
    bottom: window.innerHeight - MODAL_SIZE - MARGIN,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setBounds({
        left: 0,
        top: 0,
        right: window.innerWidth - MODAL_SIZE - MARGIN,
        bottom: window.innerHeight - MODAL_SIZE - MARGIN,
      });
      // If modal is out of bounds after resize, bring it back
      setPosition(pos => ({
        x: Math.min(Math.max(pos.x, 0), window.innerWidth - MODAL_SIZE - MARGIN),
        y: Math.min(Math.max(pos.y, 0), window.innerHeight - MODAL_SIZE - MARGIN),
      }));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStop = (e, data) => {
    const width = window.innerWidth;
    // Snap to left or right edge
    let x = data.x < width / 2 ? MARGIN : width - MODAL_SIZE - MARGIN;
    let y = Math.min(Math.max(data.y, 0), window.innerHeight - MODAL_SIZE - MARGIN);
    setPosition({ x, y });
  };

  return (
    <Draggable
      position={position}
      onStop={handleStop}
      bounds={bounds}
      onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
    >
      <Link
        to="/dashboard/referral"
        className="fixed z-50 block w-16 h-16 group cursor-pointer"
        style={{
          left: 0,
          top: 0,
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "box-shadow 0.05s", // Remove or minimize lag
        }}
        title="Check your referral bonus"
        draggable={false}
      >
        <div className="relative w-full h-full flex items-center justify-center bg-white rounded-full shadow-lg transition-transform group-hover:scale-110">
          <img
            src={StripeLogo2}
            alt="Referral Bonus"
            className="w-full h-full object-cover rounded-full"
            draggable={false}
          />
        </div>
      </Link>
    </Draggable>
  );
};

export default ReferralBonusModal;