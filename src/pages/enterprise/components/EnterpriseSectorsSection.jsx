import React from "react";

export const EnterpriseSectorsSection = () => {
  const bulletPoints = [
    "Gaps in transformation delivery capability",
    "Difficulty recruiting specific professional skills",
    "Pressure to improve productivity and cost efficiency",
    "Significant customer operations or back-office functions under review",
  ];

  const contactPills = [
    "COOs",
    "Transformation Directors",
    "CIOs",
    "Heads of Change",
    "Customer Operations Directors",
    "HR / People Directors",
    "L&D and Capability Leaders",
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 lg:px-32 font-inter text-[#0A1430] border-b border-slate-200">
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Heading */}
        <div className="mb-8 max-w-3xl">
          <div className="text-[#CC1747] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-2">
            WHO WE WORK WITH
          </div>
          <h2 className="font-space font-extrabold text-[28px] sm:text-[38px] lg:text-[42px] leading-tight text-[#0A1430]">
            Built for organisations navigating change
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column Narrative */}
          <div className="lg:col-span-6">
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-4">
              We work with UK small and mid-market organisations going through digital or operational transformation — particularly those facing:
            </p>

            <ul className="space-y-2.5 text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
              {bulletPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-slate-400 select-none">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column Pills Box */}
          <div className="lg:col-span-6">
            <h3 className="font-space font-bold text-[11px] tracking-wider uppercase text-slate-400 mb-4">
              TYPICAL CONTACTS WE WORK WITH
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {contactPills.map((contact, idx) => (
                <span
                  key={idx}
                  className="bg-[#EEF2F9] text-[#0A1430] font-inter font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-2xs"
                >
                  {contact}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSectorsSection;
