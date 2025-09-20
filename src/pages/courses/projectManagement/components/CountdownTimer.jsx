import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

// Default target date: July 21, 2025 00:00:00
const DEFAULT_TARGET_DATE = new Date('2025-07-21T00:00:00');

export const CountdownTimer = ({ targetDate = DEFAULT_TARGET_DATE }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-white rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5" />
        <span className="font-semibold">Next Batch Starts In:</span>
      </div>
      <div className="flex gap-4 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="bg-[#CC1747] backdrop-blur-sm rounded-lg p-3 w-16">
              <span className="text-2xl font-bold block">{value.toString().padStart(2, '0')}</span>
            </div>
            <span className="text-xs mt-1 uppercase">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
