import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkLogo } from "../../../Components/Logo";

export default function AssessmentHeader({ onExit }) {
  const navigate = useNavigate();

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      navigate("/");
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center">
          <DarkLogo className="h-9 w-auto" />
        </Link>
        <button
          onClick={handleExit}
          className="text-sm font-medium text-slate-500 hover:text-[#0A1430] transition-colors py-1 px-3 rounded-lg hover:bg-slate-50"
        >
          Exit assessment
        </button>
      </div>
    </header>
  );
}
