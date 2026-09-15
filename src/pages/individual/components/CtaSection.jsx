import React from "react";
import TakeAssessmentButton from "@/Components/assessment/TakeAssessmentButton";

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
          <div className="mt-8 flex justify-center">
            <TakeAssessmentButton
              to="/assessment"
              label="Take career assessment"
              layout="stacked"
              variant="primary"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
