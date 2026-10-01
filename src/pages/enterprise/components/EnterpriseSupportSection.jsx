import React from "react";
import { ArrowRight, Users, GraduationCap, Globe } from "lucide-react";

export const EnterpriseSupportSection = ({ onOpenModal }) => {
  return (
    <section
      id="how-we-help"
      className="w-full bg-white py-12 sm:py-16 lg:py-20 font-inter text-[#0A1430] border-b border-slate-200"
    >
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Heading */}
        <div className="mb-10">
          <div className="text-[#CC1747] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-2">
            WHAT WE DO
          </div>
          <h2 className="font-space font-extrabold text-[28px] sm:text-[38px] lg:text-[42px] leading-tight text-[#0A1430]">
            How we can support your organisation
          </h2>
        </div>

        {/* Support Offerings Grid */}
        <div className="space-y-6">
          {/* Card 1: Main Transformation Delivery Teams (Featured) */}
          <div className="rounded-2xl border-2 border-[#CC1747] bg-white p-6 sm:p-8 lg:p-10 shadow-lg shadow-[#CC1747]/5 relative">
            <span className="inline-block bg-[#CC1747] text-white font-space text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
              MOST POPULAR
            </span>

            <h3 className="font-space font-extrabold text-2xl sm:text-3xl text-[#0A1430]">
              Transformation Delivery Teams
            </h3>

            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
              Dedicated, outcome-driven teams deployed into your organization to execute critical projects. We handle sourcing, onboarding, governance, and delivery — allowing your leadership team to focus on strategic priorities.
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs sm:text-sm font-medium text-[#CC1747] bg-[#FFF1F3] px-3 py-1 rounded-md">
                Ideal for organizations with immediate project delivery pressure.
              </span>

              <button
                type="button"
                onClick={onOpenModal}
                className="text-[#CC1747] hover:text-[#b0133d] font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors group cursor-pointer"
              >
                <span>Discuss your delivery needs</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Cards 2 & 3 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 2: Workforce Upskilling */}
            <div className="rounded-2xl border border-slate-200 bg-[#F8F9FC] p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
              <span className="inline-block bg-slate-200 text-slate-700 font-space text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                CAPACITY
              </span>

              <h3 className="font-space font-extrabold text-xl sm:text-2xl text-[#0A1430]">
                Workforce Upskilling & Scale
              </h3>

              <p className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
                Custom training programs tailored to your tech stack and methodologies — transforming existing employees into high-performing digital practitioners.
              </p>

              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="text-[#CC1747] hover:text-[#b0133d] font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors group cursor-pointer"
                >
                  <span>Explore workforce training</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Card 3: Global Delivery Pipeline */}
            <div className="rounded-2xl border border-slate-200 bg-[#F8F9FC] p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
              <span className="inline-block bg-[#FEF3C7] text-[#92400E] font-space text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                GLOBAL TALENT
              </span>

              <h3 className="font-space font-extrabold text-xl sm:text-2xl text-[#0A1430]">
                Global Delivery Pipeline
              </h3>

              <p className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
                Direct access to pre-vetted, CPD-accredited talent pipelines across global tech hubs — giving you high-quality talent at scalable cost structures.
              </p>

              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="text-[#CC1747] hover:text-[#b0133d] font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors group cursor-pointer"
                >
                  <span>Discuss global talent</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSupportSection;
