import React from "react";
import { AlertTriangle } from "lucide-react";

export const EnterpriseResultsSection = ({ onOpenModal }) => {
  const caseStudies = [
    {
      sector: "TRANSPORT · UNITED KINGDOM",
      title: "East Midlands Railway — employee development programme",
      details: [
        { label: "Delivery type", value: "Workforce Development" },
        { label: "Outcome metrics", value: "To confirm", isAmber: true },
      ],
    },
    {
      sector: "GOVERNMENT · NIGERIA & DIASPORA",
      title: "NidCOM — staff development, domestic and diaspora",
      details: [
        { label: "Client", value: "Federal Govt. of Nigeria" },
        { label: "Outcome metrics", value: "To confirm", isAmber: true },
      ],
    },
    {
      sector: "CENTRAL BANKING · NIGERIA",
      title: "CBN — Operational Excellence, nationwide",
      details: [
        { label: "Scope", value: "Nationwide staff" },
        { label: "Delivery type", value: "Operational Excellence Development" },
      ],
    },
  ];

  return (
    <section
      id="case-studies"
      className="w-full bg-white py-12 sm:py-16 lg:py-20 lg:px-32 font-inter text-[#0A1430] border-b border-slate-200"
    >
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Heading */}
        <div className="mb-10 max-w-3xl">
          <div className="text-[#CC1747] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-2">
            PORTFOLIO
          </div>
          <h2 className="font-space font-extrabold text-[28px] sm:text-[38px] lg:text-[42px] leading-tight text-[#0A1430]">
            Results, not promises
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
            Our track record in capability development and workforce transformation — the foundation the Transformation Delivery Team offer is built on.
          </p>
        </div>

        {/* Case Studies 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm flex flex-col justify-between bg-white">
              {/* Dark Navy Card Header */}
              <div className="bg-[#0E1736] text-white p-5 sm:p-6 min-h-[140px] flex flex-col justify-between">
                <span className="font-space text-[10px] font-bold tracking-[0.16em] uppercase text-[#CC1747] block mb-2">
                  {study.sector}
                </span>

                <h3 className="font-space font-bold text-base sm:text-lg text-white leading-snug">
                  {study.title}
                </h3>
              </div>

              {/* White Card Body */}
              <div className="p-5 sm:p-6 bg-[#F8F9FC] flex-1 flex flex-col justify-between space-y-4 text-xs font-inter">
                <div className="space-y-3">
                  {study.details.map((d, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-slate-200/60 pb-2.5 last:border-0 last:pb-0">
                      <span className="text-slate-400 font-medium">{d.label}</span>
                      <span className={`font-bold ${d.isAmber ? "text-amber-600" : "text-[#0A1430]"}`}>
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Photo Placeholder Box */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 text-center text-slate-400 text-[11px] font-medium">
                  Add a photo from this engagement, with permission
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Amber Warning/Disclaimer Banner */}
        <div className="mt-8 rounded-2xl bg-[#FFFBEB] border border-[#FCD34D]/80 p-5 sm:p-6 text-[#92400E] flex items-start gap-3 shadow-2xs">
          <AlertTriangle size={20} className="text-[#D97706] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-normal leading-relaxed text-[#78350F]">
            <strong className="font-bold">▲ These three engagements are real and cleared to name publicly</strong> — they demonstrate capability development and workforce transformation delivery at government and enterprise scale. They are not, however, examples of the managed "Transformation Delivery Team" offer above. Case studies specific to that offer should be captured from the first Phase 1 engagements and added here before a broad B2B marketing push.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseResultsSection;
