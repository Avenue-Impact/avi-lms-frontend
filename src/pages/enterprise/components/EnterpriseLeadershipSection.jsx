import React from "react";
import { ArrowRight, Award, ShieldCheck, Quote } from "lucide-react";
import femiPortrait from "@/assets/images/partner/partner_portrait_3_1776809410609.png";

export const EnterpriseLeadershipSection = ({ onOpenModal }) => {
  return (
    <section
      id="leadership"
      className="w-full bg-[#F8F9FC] py-16 sm:py-20 lg:py-24 font-inter text-[#0A1430] border-b border-slate-200"
    >
      <div className="w-full px-6 md:px-12 lg:px-16">
        {/* Eyebrow & Heading */}
        <div className="mb-10">
          <div className="text-[#CC1747] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-2">
            LEADERSHIP & GOVERNANCE
          </div>
          <h2 className="font-space font-extrabold text-[28px] sm:text-[38px] lg:text-[42px] leading-tight text-[#0A1430]">
            Led by experience, built for impact
          </h2>
        </div>

        {/* Executive Commitment Callout */}
        <div className="mb-8 rounded-2xl bg-[#FEF3C7] border border-[#F59E0B]/50 p-4 sm:p-5 flex items-center gap-3 text-[#78350F] shadow-2xs">
          <Award size={22} className="text-[#D97706] shrink-0" />
          <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">
            EXECUTIVE COMMITMENT: Every enterprise engagement is overseen by a partner-level executive.
          </span>
        </div>

        {/* Executive Profile Card */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8">
          {/* Photo */}
          <div className="shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 shadow-md">
            <img
              src={femiPortrait}
              alt="Femi Arowosola"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-space font-extrabold text-2xl sm:text-3xl text-[#0A1430]">
              Femi Arowosola
            </h3>
            <p className="text-xs sm:text-sm font-bold text-[#CC1747] uppercase tracking-wider mt-1">
              Managing Director / CEO
            </p>

            <blockquote className="mt-4 text-xs sm:text-sm text-slate-600 italic leading-relaxed">
              "We built Avenue Impact to bridge the talent and delivery gap for ambitious organisations. Our teams embed as true delivery partners, bringing deep practical capability, global perspective, and an unrelenting focus on execution."
            </blockquote>

            <div className="mt-6">
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
        </div>
      </div>
    </section>
  );
};

export default EnterpriseLeadershipSection;
