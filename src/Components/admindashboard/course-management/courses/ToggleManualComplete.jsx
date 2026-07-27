import React, { useState, useEffect } from "react";
import { useMarkEnrollmentCompleted } from "@/hooks/certificate/use-mark-enrollment-completed";

const ToggleManualComplete = ({ enrollmentId, initialIsCompleted }) => {
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const { mutate: markCompleted, isPending } = useMarkEnrollmentCompleted();

  useEffect(() => {
    setIsCompleted(initialIsCompleted);
  }, [initialIsCompleted]);

  const handleToggle = (e) => {
    const newValue = e.target.checked;
    if (newValue) {
      if (window.confirm("Are you sure you want to mark this student as completed? This will unlock their certificate request option.")) {
        setIsCompleted(true);
        markCompleted(enrollmentId, {
          onError: () => {
            setIsCompleted(false);
          }
        });
      }
    } else {
      alert("Manual completion override cannot be unchecked once set. If you need to revert enrollment progress, please contact the system administrator.");
    }
  };

  return (
    <label className={`relative inline-flex items-center ${isPending || isCompleted ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}>
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={isCompleted} 
        onChange={handleToggle}
        disabled={isPending || isCompleted}
      />
      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
    </label>
  );
};

export default ToggleManualComplete;
