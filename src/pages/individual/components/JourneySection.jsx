import React from "react";
import { Trophy } from "lucide-react";

export const JourneySection = () => {
  const steps = [
    { number: 1, label: "Enroll", active: false },
    { number: 2, label: "Get Skill", active: false },
    { number: 3, label: "Projects", active: false },
    { number: 4, label: "Mentiiv", active: true },
    { number: 5, label: "PrepnHire", active: false },
    { number: 6, label: "Job Offer", active: false },
    { number: 7, label: "ExpertsMerge", active: false },
  ];

  return (
    <section className="w-full bg-[#EFF1F8] py-10 sm:py-14 lg:py-16 font-inter text-[#0A1430]">
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Government Recognition Award Banner */}
        <div className="w-full mx-auto bg-[#FEF9EE] border border-[#FDE68A]/80 rounded-2xl p-4 sm:p-5 flex items-start sm:items-center gap-4 shadow-sm">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FEF08A]/60 border border-[#FDE047]/60 flex items-center justify-center text-[#B45309] shrink-0">
            <Trophy size={20} className="stroke-[2.2]" />
          </div>
          <div className="flex-1">
            <span className="text-[#B45309] font-space text-[11px] font-bold tracking-[0.14em] uppercase block">
              GOVERNMENT-RECOGNISED
            </span>
            <h2 className="font-space font-bold text-[15px] sm:text-[16px] text-[#0A1430] mt-0.5">
              ICT & Education Diaspora Award
            </h2>
            <p className="font-inter text-[12px] sm:text-[13px] text-slate-500 mt-0.5">
              Awarded by NIDCOM (Nigerians in Diaspora Commission), Federal Government of Nigeria · Year to confirm
            </p>
          </div>
        </div>

        {/* How It Works / One Journey Map Container */}
        <div className="w-full mx-auto bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-14 border border-slate-200/60 shadow-sm">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[#D7195A] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase block">
              HOW IT WORKS
            </span>
            <h2 className="font-space font-bold text-[28px] sm:text-[38px] lg:text-[45px] leading-[34px] sm:leading-[44px] lg:leading-[50px] tracking-[-2px] text-[#0A1430] mt-3">
              One Journey Map, any Career
            </h2>
            <p className="font-inter text-[14px] sm:text-[15px] leading-[22px] text-slate-500 mt-3 sm:mt-4">
              Choose Business Analysis, UX Design, or Project Management — the path is the same shape, tailored to you.
            </p>
          </div>

          {/* Stepper Timeline */}
          <div className="mt-10 sm:mt-14 lg:mt-16 relative">
            {/* Horizontal Connecting Line (visible on desktop/tablet) */}
            <div
              className="hidden sm:block absolute top-[20px] left-[6%] right-[6%] h-[2px] bg-slate-200 -z-0"
              aria-hidden="true"
            />

            {/* Steps Container */}
            <div className="grid grid-cols-2 sm:grid-cols-7 gap-6 sm:gap-2 relative z-10">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center text-center">
                  {/* Step Circle */}
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-space font-bold text-[14px] sm:text-[15px] transition-all duration-200 ${
                      step.active
                        ? "bg-[#D7195A] text-white shadow-lg shadow-[#D7195A]/30 scale-105"
                        : "bg-white text-[#0A1430] border-2 border-[#0A1430]"
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Step Label */}
                  <span className="font-space font-bold text-[13px] sm:text-[13.5px] text-[#0A1430] mt-2.5 sm:mt-3 leading-tight">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
