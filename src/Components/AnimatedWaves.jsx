import React from 'react';
import wave1 from '../assets/imgs/wave-1.png';
import wave2 from '../assets/imgs/wave-2.png';
import wave3 from '../assets/imgs/wave-3.png';

export default function AnimatedWaves() {
  return (
    <>
      {/* Inline keyframes for smooth infinite animation */}
      <style>
        {`
          @keyframes waveMove {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <div className="absolute sm:bottom-[-20px] bottom-[-2px]  left-0 w-full h-[200px] overflow-hidden">
        {/* Wave Layer 1 (Slowest) */}
        <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
          <div
            className="absolute bottom-0 left-0 flex w-[200%] animate-[waveMove_30s_linear_infinite]"
          >
            <img src={wave1} alt="wave 1" className="w-1/2 opacity-40" />
            <img src={wave1} alt="wave 1 duplicate" className="w-1/2 opacity-40" />
          </div>
        </div>

        {/* Wave Layer 2 (Medium speed) */}
        <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
          <div
            className="absolute bottom-0 left-0 flex w-[200%] animate-[waveMove_22s_linear_infinite]"
          >
            <img src={wave2} alt="wave 2" className="w-1/2 opacity-60" />
            <img src={wave2} alt="wave 2 duplicate" className="w-1/2 opacity-60" />
          </div>
        </div>

        {/* Wave Layer 3 (Fastest) */}
        <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
          <div
            className="absolute bottom-0 left-0 flex w-[200%] animate-[waveMove_16s_linear_infinite]"
          >
            <img src={wave3} alt="wave 3" className="w-1/2 opacity-80" />
            <img src={wave3} alt="wave 3 duplicate" className="w-1/2 opacity-80" />
          </div>
        </div>
      </div>
    </>
  );
}
