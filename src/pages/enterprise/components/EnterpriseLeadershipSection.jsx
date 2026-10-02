import React from "react";
import { ArrowRight, Trophy } from "lucide-react";
import funsoPortrait from "@/assets/images/partner/founder_funso.png";

export const EnterpriseLeadershipSection = ({ onOpenModal }) => {
  return (
    <section
      id="leadership"
      className="w-full bg-white py-12 sm:py-16 lg:py-20 lg:px-32 font-inter text-[#0A1430] border-b border-slate-200"
    >
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Heading */}
        <div className="mb-8">
          <div className="text-[#CC1747] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-2">
            ABOUT AVENUE IMPACT
          </div>
          <h2 className="font-space font-extrabold text-[28px] sm:text-[36px] lg:text-[40px] leading-tight text-[#0A1430]">
            Led by experience, built for impact
          </h2>
        </div>

        {/* Government Recognition Gold Callout */}
        <div className="mb-8 rounded-2xl bg-[#FFFBEB] border border-[#FCD34D]/70 p-4 sm:p-5 flex items-center gap-3 text-[#92400E] shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
            <Trophy size={20} />
          </div>
          <div>
            <span className="text-[10px] font-space font-bold tracking-widest uppercase text-[#B45309] block">
              GOVERNMENT-RECOGNISED
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#78350F]">
              ICT & Education Diaspora Award — NIDCOM, Federal Government of Nigeria
            </span>
          </div>
        </div>

        {/* Executive Profile Card */}
        <div className="rounded-3xl bg-[#F8F9FC] border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8">
          {/* Photo */}
          <div className="shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
            <img
              src={funsoPortrait}
              alt="Funso Akinwunmi"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-space font-extrabold text-2xl sm:text-3xl text-[#0A1430]">
              Funso Akinwunmi
            </h3>
            <p className="text-xs sm:text-sm font-bold text-[#CC1747] uppercase tracking-wider mt-1">
              Founder & CEO
            </p>

            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
              We began with a belief: talent thrives when opportunity meets technology. In 2015, we empowered one student. Today, we empower thousands—by connecting training, innovation, mentorship, and success.
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={onOpenModal}
                className="bg-white hover:bg-slate-50 border border-slate-200/90 text-[#0A1430] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>Learn more about our story</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseLeadershipSection;
