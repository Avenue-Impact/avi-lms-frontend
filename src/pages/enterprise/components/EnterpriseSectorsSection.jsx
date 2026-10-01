import React from "react";
import { CheckCircle2, Building, HeartPulse, Shield, Landmark, GraduationCap, Briefcase } from "lucide-react";

export const EnterpriseSectorsSection = () => {
  const bulletPoints = [
    "Rapid team deployment across UK & globally",
    "CPD-accredited talent pipelines & continuous upskilling",
    "Flexible engagement models — team, hybrid, or direct talent",
    "Enterprise governance, security, and quality standards built into every engagement.",
  ];

  const sectorPills = [
    { label: "Health / NHS", icon: HeartPulse },
    { label: "Financial Services", icon: Landmark },
    { label: "Gov", icon: Shield },
    { label: "Higher Education", icon: GraduationCap },
    { label: "Corporate Tech Transformation", icon: Briefcase },
    { label: "Non-Profit & Third Sector", icon: Building },
    { label: "Defence & Security Sector", icon: Shield },
  ];

  return (
    <section className="w-full bg-[#F8F9FC] py-12 sm:py-16 lg:py-20 font-inter text-[#0A1430] border-b border-slate-200">
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6">
            <div className="text-[#CC1747] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-2">
              SECTOR CAPABILITY
            </div>

            <h2 className="font-space font-extrabold text-[28px] sm:text-[38px] lg:text-[42px] leading-tight text-[#0A1430]">
              Built for organisations navigating change
            </h2>

            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              We partner with enterprise and public sector organizations across sectors undergoing digital transformation, cloud adoption, and workforce evolution.
            </p>

            <div className="mt-6 space-y-3">
              {bulletPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#CC1747] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sector Pills Grid */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-space font-bold text-xs tracking-widest uppercase text-slate-500 mb-4">
              TYPICAL SECTOR ENGAGEMENTS
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {sectorPills.map((sector, idx) => {
                const IconComponent = sector.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 bg-[#F1F4FA] hover:bg-[#E2E8F5] text-[#0A1430] border border-slate-200 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <IconComponent size={15} className="text-[#CC1747]" />
                    <span>{sector.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSectorsSection;
