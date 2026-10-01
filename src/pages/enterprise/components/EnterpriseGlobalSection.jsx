import React from "react";

export const EnterpriseGlobalSection = () => {
  const steps = [
    { num: "01", label: "Identify" },
    { num: "02", label: "Assess" },
    { num: "03", label: "Develop" },
    { num: "04", label: "Certify" },
    { num: "05", label: "Deploy" },
    { num: "06", label: "Manage" },
    { num: "07", label: "Measure" },
  ];

  return (
    <section
      id="global-capability"
      className="w-full bg-[#F8F9FC] py-12 sm:py-16 lg:py-20 lg:px-32 font-inter text-[#0A1430] border-b border-slate-200"
    >
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="text-[#CC1747] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-2">
            ABOUT AVENUE IMPACT
          </div>

          {/* Heading */}
          <h2 className="font-space font-extrabold text-[28px] sm:text-[36px] lg:text-[40px] leading-tight text-[#0A1430]">
            Global capability, built on quality — not cost
          </h2>

          {/* Paragraphs */}
          <div className="mt-4 space-y-4 text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
            <p>
              Avenue Impact combines deep UK market understanding with a high-quality professional delivery capability across Africa. This isn't about low-cost labour — it's about accessing skilled, well-developed professional talent through a structured, accountable delivery model.
            </p>
            <p>
              Our talent goes through a clear pathway, supported by our own learning and development infrastructure — including structured mentoring and professional readiness programmes — which means the people we deploy arrive prepared, and stay supported throughout an engagement.
            </p>
          </div>
        </div>

        {/* 7 Step Process Pills */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white border border-slate-200/80 rounded-xl p-3.5 sm:p-4 text-center shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="text-[#CC1747] font-space font-extrabold text-xs sm:text-sm">
                {step.num}
              </div>
              <div className="text-[#0A1430] font-space font-bold text-xs sm:text-sm mt-1">
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnterpriseGlobalSection;
