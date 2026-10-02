import React from "react";

export const EnterpriseProcessSection = () => {
  const steps = [
    {
      step: 1,
      title: "Understand",
      description: "We take time to understand your delivery gap, workforce challenge or transformation goal.",
    },
    {
      step: 2,
      title: "Deploy",
      description: "We provide vetted professionals or a managed team, matched to your specific need.",
    },
    {
      step: 3,
      title: "Manage",
      description: "We own quality, performance and reporting — you get accountability, not just headcount.",
    },
    {
      step: 4,
      title: "Measure",
      description: "We track outcomes against clear KPIs, so you always know the value being delivered.",
    },
  ];

  return (
    <section
      id="our-process"
      className="w-full bg-[#F8F9FC] py-12 sm:py-16 lg:py-20 font-inter text-[#0A1430] border-b border-slate-200"
    >
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Heading */}
        <div className="mb-12 max-w-3xl">
          <div className="text-[#CC1747] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-2">
            HOW WE WORK
          </div>
          <h2 className="font-space font-extrabold text-[28px] sm:text-[38px] lg:text-[42px] leading-tight text-[#0A1430]">
            A clear, accountable process
          </h2>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[26px] left-[12%] right-[12%] h-[2px] bg-slate-200 -z-0" />

          {steps.map((item) => (
            <div key={item.step} className="relative z-10 flex flex-col items-center text-center">
              {/* Step Number Circle */}
              <div className="w-13 h-13 rounded-full bg-[#0E1736] text-white flex items-center justify-center font-space font-extrabold text-base shadow-sm border-4 border-white mb-4">
                {item.step}
              </div>

              {/* Step Title */}
              <h3 className="font-space font-bold text-base text-[#0A1430]">
                {item.title}
              </h3>

              {/* Step Description */}
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnterpriseProcessSection;
