import React from "react";

export const EnterpriseProblemSection = ({ onOpenModal }) => {
  return (
    <section
      id="delivery-problem"
      className="w-full bg-[#F8F9FC] py-12 sm:py-16 lg:py-20 font-inter text-[#0A1430] border-b border-slate-200"
    >
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="text-[#CC1747] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-3">
            THE PROBLEM WE SOLVE
          </div>

          {/* Heading */}
          <h2 className="font-space font-extrabold text-[28px] sm:text-[36px] lg:text-[40px] leading-tight text-[#0A1430]">
            Transformation programmes stall without the right delivery capacity
          </h2>

          {/* Body Paragraphs */}
          <div className="mt-5 space-y-4 text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
            <p>
              Struggling to find transformation delivery capacity? Need skilled project professionals, Operation support, Developers, Software Testers, AI Engineers, Prompt Engineers, Business Analysts, Project Managers or Data professionals, Data Engineers, Data Scientists — fast, and without the risk of a bad contractor hire?
            </p>
            <p>
              Avenue Impact provides vetted, managed delivery talent to support your transformation and operational change programmes — with a proven, low-risk route to cost-effective global delivery capability when you're ready to scale further.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <button
              type="button"
              onClick={onOpenModal}
              className="bg-[#0E1736] hover:bg-[#1C2C64] text-white font-semibold text-[14px] sm:text-[15px] px-7 py-3.5 rounded-xl shadow-md transition-all duration-200 inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Talk to us about your delivery needs</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseProblemSection;
