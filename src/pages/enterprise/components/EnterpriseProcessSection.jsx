import React from "react";

export const EnterpriseProcessSection = () => {
  const steps = [
    {
      step: 1,
      title: "DISCOVERY",
      description: "We analyze your delivery needs, capability gaps, skill requirements, and project timeline.",
    },
    {
      step: 2,
      title: "DESIGN",
      description: "We assemble custom delivery teams or design tailored training programs for your specific needs.",
    },
    {
      step: 3,
      title: "DEPLOY",
      description: "We deploy vetted practitioners into your organization with full governance and ongoing support.",
    },
    {
      step: 4,
      title: "DELIVER",
      description: "We deliver on clear milestones and project outcomes, ensuring seamless handoff or ongoing scale.",
    },
  ];

  return (
    <section
      id="our-process"
      className="w-full bg-white py-12 sm:py-16 lg:py-20 lg:px-32 font-inter text-[#0A1430] border-b border-slate-200"
    >
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Heading */}
        <div className="mb-12 max-w-3xl">
          <div className="text-[#CC1747] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-2">
            HOW WE WORK
          </div>
          <h2 className="font-space font-extrabold text-[28px] sm:text-[36px] lg:text-[40px] leading-tight text-[#0A1430]">
            A clear, accountable process
          </h2>
        </div>

        {/* Horizontal Steps Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-slate-200 -z-0" />

          {steps.map((item) => (
            <div key={item.step} className="relative z-10 flex flex-col items-center text-center">
              {/* Step Number Circle */}
              <div className="w-14 h-14 rounded-full bg-[#0A1430] text-white flex items-center justify-center font-space font-extrabold text-lg shadow-md border-4 border-white mb-4">
                {item.step}
              </div>

              {/* Step Title */}
              <h3 className="font-space font-bold text-sm tracking-widest text-[#0A1430] uppercase">
                {item.title}
              </h3>

              {/* Step Description */}
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs">
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
