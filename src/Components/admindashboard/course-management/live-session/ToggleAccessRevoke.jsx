import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useToggleAccessRevoke } from "@/hooks/course-management/live-session/useToggleAccessRevoke";

const ToggleAccessRevoke = ({ studentId, initialIsRevoked }) => {
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const cohortId = queryString.get("cohortId");
  
  const [isRevoked, setIsRevoked] = useState(initialIsRevoked);
  const { mutate: toggleAccess, isPending } = useToggleAccessRevoke();

  useEffect(() => {
    setIsRevoked(initialIsRevoked);
  }, [initialIsRevoked]);

  const handleToggle = (e) => {
    const newValue = e.target.checked;
    // Optimistic update
    setIsRevoked(newValue);
    
    toggleAccess(
      {
        courseId,
        cohortId,
        studentId,
        is_access_revoked: newValue,
      },
      {
        onError: () => {
          // Revert on error
          setIsRevoked(!newValue);
        }
      }
    );
  };

  // Only render if cohortId is present (currently only supported for Live Sessions)
  if (!cohortId) return <span className="text-gray-400">N/A</span>;

  return (
    <label className={`relative inline-flex items-center ${isPending ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={isRevoked} 
        onChange={handleToggle}
        disabled={isPending}
      />
      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#CC1747]"></div>
    </label>
  );
};

export default ToggleAccessRevoke;
