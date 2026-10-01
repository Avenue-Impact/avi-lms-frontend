import React from "react";
import { ArrowRight, ShieldCheck, Globe, Zap, Users } from "lucide-react";

export const EnterpriseHero = ({ onOpenModal }) => {
  return (
    <section className="relative w-full bg-[#0A1430] text-white pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 overflow-hidden font-inter border-b border-slate-800">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#CC1747]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        <div>
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="font-space text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#F43F5E] bg-[#CC1747]/10 border border-[#CC1747]/25 px-3 py-1 rounded-full">
              BUSINESS · HIGHER EDUCATION · GOVERNMENT · HEALTHCARE
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-space font-extrabold text-[38px] sm:text-[52px] lg:text-[62px] leading-[1.08] tracking-tight text-white">
            Transform your workforce. Deliver change. Access global capability.
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-[16px] sm:text-[19px] leading-relaxed text-slate-300 mt-6 font-normal">
            Avenue Impact builds talent pipelines and deploys delivery teams to help organizations scale capacity, execute critical initiatives, and access global talent — without compromising on quality or governance.
          </p>

          {/* Primary CTA Button */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenModal}
              className="bg-[#CC1747] hover:bg-[#b0133d] text-white font-semibold text-[15px] sm:text-[16px] px-8 py-4 rounded-xl shadow-xl shadow-[#CC1747]/25 transition-all duration-200 active:scale-[0.98] inline-flex items-center gap-2 group"
            >
              <span>Talk to us about your delivery needs</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Key Trust Metrics Strip */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p className="font-space font-extrabold text-2xl sm:text-3xl text-white tracking-tight">100%</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Outcome-Driven Delivery</p>
            </div>
            <div>
              <p className="font-space font-extrabold text-2xl sm:text-3xl text-white tracking-tight">14 Days</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Average Team Deployment</p>
            </div>
            <div>
              <p className="font-space font-extrabold text-2xl sm:text-3xl text-white tracking-tight">CPD</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Accredited Practitioner Talent</p>
            </div>
            <div>
              <p className="font-space font-extrabold text-2xl sm:text-3xl text-white tracking-tight">Global</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">UK & International Hubs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseHero;
