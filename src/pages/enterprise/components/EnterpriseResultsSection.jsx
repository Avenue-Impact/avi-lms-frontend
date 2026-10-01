import React from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export const EnterpriseResultsSection = ({ onOpenModal }) => {
  const caseStudies = [
    {
      sector: "HEALTHCARE · PUBLIC SECTOR",
      title: "E-commerce delivery — enterprise digital transformation",
      metrics: [
        { label: "TEAM DEPLOYED", value: "12-person delivery team" },
        { label: "TIME TO DEPLOY", value: "14 business days" },
      ],
      outcome: "On schedule",
    },
    {
      sector: "EDUCATION · FINANCIAL SERVICES",
      title: "Cloud & Data Platform architecture and migration",
      metrics: [
        { label: "SCOPE", value: "Full cloud migration" },
        { label: "IMPACT", value: "40% cost reduction" },
      ],
      outcome: "Completed",
    },
    {
      sector: "HIGHER EDUCATION · GOV",
      title: "Agile PMO setup & governance framework",
      metrics: [
        { label: "SCOPE", value: "Agile transformation" },
        { label: "KEY METRIC", value: "Governance & standards deployed" },
      ],
      outcome: "Delivered",
    },
  ];

  return (
    <section
      id="case-studies"
      className="w-full bg-[#F8F9FC] py-12 sm:py-16 lg:py-20 font-inter text-[#0A1430] border-b border-slate-200"
    >
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Heading */}
        <div className="mb-10 max-w-3xl">
          <div className="text-[#CC1747] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-2">
            PROVEN RESULTS
          </div>
          <h2 className="font-space font-extrabold text-[28px] sm:text-[36px] lg:text-[40px] leading-tight text-[#0A1430]">
            Results, not promises
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
            Real outcomes delivered for enterprise clients across healthcare, financial services, and higher education.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#0A1430] text-white p-6 sm:p-7 flex flex-col justify-between shadow-xl border border-slate-800"
            >
              <div>
                <span className="font-space text-[10px] font-bold tracking-[0.16em] uppercase text-[#CC1747] block mb-3">
                  {study.sector}
                </span>

                <h3 className="font-space font-bold text-lg sm:text-xl text-white leading-snug">
                  {study.title}
                </h3>

                <div className="mt-6 space-y-3 pt-4 border-t border-slate-800 text-xs">
                  {study.metrics.map((m, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">{m.label}</span>
                      <span className="font-bold text-slate-100">{m.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-400 font-medium">OUTCOME</span>
                    <span className="font-bold text-emerald-400 inline-flex items-center gap-1">
                      <CheckCircle2 size={13} /> {study.outcome}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="w-full bg-[#151F3D] hover:bg-[#1D2B52] border border-white/10 text-slate-200 hover:text-white font-medium text-xs py-2.5 px-3 rounded-lg transition-colors text-center cursor-pointer"
                >
                  Talk to us about a similar delivery need
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Highlighted Yellow/Amber Note */}
        <div className="mt-8 rounded-2xl bg-[#FEF3C7] border border-[#F59E0B]/40 p-5 sm:p-6 text-[#78350F] flex items-start gap-3 shadow-xs">
          <ShieldCheck size={22} className="text-[#D97706] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            <strong className="font-bold">Avenue Impact teams are built to deliver, not consult.</strong> We don't produce slides and walk away. We embed practitioners into your organization to execute on your priorities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseResultsSection;
