import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import guideAvatar from "@/assets/images/partner/partner_portrait_1_1776809370508.png";

/**
 * TakeAssessmentButton
 * Scenario 14 Compliant:
 * "GIVEN any page containing a "Take Assessment" action button (e.g., the public Landing Page, Marketing pages, or Dashboard sections),
 * WHEN a user views the button,
 * THEN the system must always display the guided avatar graphic : "Discover your path"."
 */
export default function TakeAssessmentButton({
  to = "/assessment",
  className = "",
  buttonClassName = "",
  label = "Take career assessment",
  layout = "stacked", // 'stacked' | 'inline'
  variant = "primary", // 'primary' | 'outline' | 'dark'
  onClick,
}) {
  const baseButtonStyles =
    "inline-flex items-center justify-center gap-2 font-inter font-semibold rounded-xl transition-all duration-200 active:scale-[0.98]";

  let variantStyles =
    "bg-[#D7195A] hover:bg-[#be144e] text-white shadow-lg shadow-[#D7195A]/25";
  if (variant === "outline") {
    variantStyles =
      "bg-white hover:bg-slate-50 border border-slate-200 text-[#0A1430] shadow-sm";
  } else if (variant === "dark") {
    variantStyles =
      "bg-[#0A1430] hover:bg-[#151F3D] text-white shadow-lg shadow-black/20";
  }

  return (
    <div
      className={`inline-flex ${
        layout === "stacked"
          ? "flex-col items-center sm:items-start"
          : "flex-row items-center gap-3"
      } ${className}`}
    >
      {/* Guided Avatar Graphic with "Discover your path" badge */}
      <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-sm px-2.5 py-1 rounded-full text-slate-800 text-[11px] sm:text-[12px] font-medium tracking-wide mb-1.5 animate-fade-in group">
        <div className="relative flex items-center justify-center">
          <img
            src={guideAvatar}
            alt="Advisor Guide"
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-[#D7195A]/40 shadow-xs"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
        </div>
        <span className="flex items-center gap-1 font-semibold text-[#0A1430]">
          <Sparkles size={12} className="text-[#D7195A]" />
          Discover your path
        </span>
      </div>

      {/* Action Button */}
      <Link
        to={to}
        onClick={onClick}
        className={`${baseButtonStyles} ${variantStyles} text-[14px] sm:text-[15px] px-6 sm:px-7 py-3 sm:py-3.5 ${buttonClassName}`}
      >
        <span>{label}</span>
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
