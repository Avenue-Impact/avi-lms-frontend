import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReferralToast = ({ onTimeout }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set timer for 8 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (onTimeout) onTimeout();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed left-4 top-24 z-[100] w-[90%] max-w-[740px] duration-500 animate-in fade-in slide-in-from-left-4 sm:w-full">
      <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute left-2 top-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        <div className="pl-6">
          <h4 className="text-lg font-bold text-[#D81B4B]">
            Refer & Earn Rewards
          </h4>

          <div className="mt-2 flex flex-col items-start gap-4 md:flex-row md:items-center">
            <p className="text-sm leading-relaxed text-gray-700">
              Invite your friends to join Avenue Impact and earn cash rewards
              for every successful referral.
              <span className="font-bold"> Learning is better together!</span>
            </p>

            <button
              onClick={() => navigate("/signup") && handleClose}
              className="whitespace-nowrap rounded-lg bg-[#D81B4B] px-4 py-4 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95 sm:py-2"
            >
              Start Referring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralToast;
