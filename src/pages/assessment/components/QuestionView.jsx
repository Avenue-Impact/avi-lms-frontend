import React from "react";
import { Check } from "lucide-react";

export default function QuestionView({
  question,
  selectedOption,
  onSelectOption,
  onContinue,
}) {
  return (
    <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 py-10">
      {/* Eyebrow and Question Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-[#D7195A] font-space font-bold uppercase tracking-wider text-xs mb-3">
          {question.eyebrow}
        </p>
        <h1 className="font-space font-bold text-[#0A1430] text-[26px] sm:text-[34px] md:text-[38px] leading-tight tracking-[-1px] mb-3">
          {question.title}
        </h1>
        <p className="text-slate-500 font-inter text-sm sm:text-base leading-relaxed">
          {question.subtitle}
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((opt) => {
          const isSelected = selectedOption?.id === opt.id;
          const IconComponent = opt.icon;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectOption(opt)}
              className={`group flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-200 ${
                isSelected
                  ? "bg-white border-[#D7195A] shadow-md ring-2 ring-[#D7195A]/20"
                  : "bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              {/* Icon Container */}
              <div
                className={`p-3 rounded-xl shrink-0 transition-colors ${
                  isSelected
                    ? "bg-[#D7195A]/10 text-[#D7195A]"
                    : "bg-[#F0F4FA] text-slate-700 group-hover:bg-[#E7EEF8]"
                }`}
              >
                {IconComponent && <IconComponent className="w-5 h-5 stroke-[1.8]" />}
              </div>

              {/* Text details */}
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="font-inter font-semibold text-[#0A1430] text-base mb-1 group-hover:text-black">
                  {opt.title}
                </h3>
                <p className="text-slate-500 font-inter text-xs sm:text-sm leading-relaxed">
                  {opt.description}
                </p>
              </div>

              {/* Selection Check indicator */}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  isSelected
                    ? "bg-[#D7195A] border-[#D7195A] text-white"
                    : "border-slate-200 opacity-0 group-hover:opacity-100"
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Floating/Bottom aligned Continue Button */}
      <div className="flex justify-end mt-10">
        <button
          type="button"
          disabled={!selectedOption}
          onClick={onContinue}
          className={`px-8 py-3.5 rounded-xl font-inter font-semibold text-sm transition-all shadow-md ${
            selectedOption
              ? "bg-[#D7195A] hover:bg-[#be144e] text-white shadow-[#D7195A]/25 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
