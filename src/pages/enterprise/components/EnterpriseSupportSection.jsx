import React from "react";
import { ArrowRight } from "lucide-react";

export const EnterpriseSupportSection = ({ onOpenModal }) => {
  return (
    <section
      id="how-we-help"
      className="w-full bg-[#F8F9FC] py-12 sm:py-16 lg:py-20 lg:px-32 font-inter text-[#0A1430] border-b border-slate-200"
    >
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Heading */}
        <div className="mb-10 max-w-3xl">
          <div className="text-[#CC1747] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-2">
            WHAT WE OFFER
          </div>
          <h2 className="font-space font-extrabold text-[28px] sm:text-[38px] lg:text-[42px] leading-tight text-[#0A1430]">
            How we can support your organisation
          </h2>
        </div>

        {/* Support Offerings Grid */}
        <div className="space-y-6">
          {/* Card 1: Lead Offer - Transformation Delivery Team */}
          <div className="rounded-2xl border-2 border-[#CC1747] bg-white p-6 sm:p-8 shadow-sm relative">
            <span className="inline-block bg-[#CC1747] text-white font-space text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-md mb-4">
              LEAD OFFER
            </span>

            <h3 className="font-space font-extrabold text-2xl sm:text-3xl text-[#0A1430]">
              Transformation Delivery Team
            </h3>

            <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed max-w-3xl font-normal">
              Managed Business Analyst, Project Manager, Data and Change capability, deployed to support your transformation programme. We recruit, vet, manage and hold quality accountable — so you get delivery capacity without the risk and overhead of individual contractor hiring.
            </p>

            <div className="mt-5 space-y-3">
              <p className="text-xs sm:text-sm font-bold text-[#0A1430]">
                Ideal for organisations that need transformation delivery resource now.
              </p>

              <div>
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="text-[#CC1747] hover:text-[#b0133d] font-semibold text-xs sm:text-sm inline-flex items-center gap-1 transition-colors group cursor-pointer"
                >
                  <span>Discuss your delivery needs</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Cards 2 & 3 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 2: Diagnostic */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <span className="inline-block bg-[#E8EDF5] text-slate-700 font-space text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-md mb-4">
                  DIAGNOSTIC
                </span>

                <h3 className="font-space font-bold text-xl sm:text-2xl text-[#0A1430]">
                  Workforce Transformation Diagnostic
                </h3>

                <p className="mt-3 text-slate-500 text-xs sm:text-sm leading-relaxed">
                  A structured assessment of your organisation's workforce capability and skills gaps — resulting in a clear, practical transformation roadmap.
                </p>

                <p className="mt-4 text-xs font-bold text-[#0A1430]">
                  Ideal if you're planning a change programme and want clarity before committing budget.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="text-[#CC1747] hover:text-[#b0133d] font-semibold text-xs sm:text-sm inline-flex items-center gap-1 transition-colors group cursor-pointer"
                >
                  <span>Ask about a diagnostic</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Card 3: Global Delivery Pilot */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <span className="inline-block bg-[#FEF3C7] text-[#92400E] font-space text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-md mb-4">
                  BY INVITATION · EMERGING
                </span>

                <h3 className="font-space font-bold text-xl sm:text-2xl text-[#0A1430]">
                  Global Delivery Pilot
                </h3>

                <p className="mt-3 text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Start with a small, Africa-based managed team delivering one defined business process — a controlled, low-risk way to explore global delivery capability.
                </p>

                <p className="mt-4 text-xs font-bold text-[#0A1430]">
                  Available to organisations we're already working with, once trust and delivery quality are established.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="text-[#CC1747] hover:text-[#b0133d] font-semibold text-xs sm:text-sm inline-flex items-center gap-1 transition-colors group cursor-pointer"
                >
                  <span>Discuss a pilot</span>
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
