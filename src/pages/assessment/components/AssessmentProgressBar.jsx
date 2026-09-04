import React from "react";

export default function AssessmentProgressBar({ currentStep, totalSteps }) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-[900px] mx-auto pt-6 px-4 sm:px-6">
      <div className="flex items-center justify-between text-xs font-mono tracking-wider text-slate-400 mb-2">
        <span>Question {currentStep} of {totalSteps}</span>
        <span>Career Assessment</span>
      </div>
      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#D7195A] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
