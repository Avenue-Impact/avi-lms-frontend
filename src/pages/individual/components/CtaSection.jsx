import React from "react";
import { Link } from "react-router-dom";

export const CtaSection = () => {
  return (
    <section className="w-full bg-[#EFF1F8] py-12 sm:py-16 lg:py-20 font-inter text-[#0A1430]">
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        {/* Dark Navy CTA Card */}
        <div className="w-full bg-[#0E1736] text-white rounded-[26px] sm:rounded-[36px] py-14 sm:py-18 lg:py-20 px-6 sm:px-12 text-center shadow-xl border border-slate-800/60 relative overflow-hidden">
          {/* Main Headline */}
          <h2 className="font-space font-bold text-[30px] sm:text-[38px] lg:text-[45px] leading-[36px] sm:leading-[44px] lg:leading-[50px] tracking-[-2px] text-white max-w-3xl mx-auto">
            Your career transformation starts today.
          </h2>

          {/* Subtitle */}
          <p className="font-inter text-[14px] sm:text-[15px] lg:text-[16px] leading-[24px] text-slate-300/90 max-w-xl mx-auto mt-3 sm:mt-4">
            Take a free career assessment and get a personalised journey map in under five minutes.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <Link
              to="/assessment"
              className="inline-flex items-center justify-center bg-[#D7195A] hover:bg-[#be144e] text-white font-inter font-semibold text-[15px] px-8 py-3.5 rounded-xl shadow-lg shadow-[#D7195A]/30 active:scale-95 transition-all duration-200"
            >
              Take career assessment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
