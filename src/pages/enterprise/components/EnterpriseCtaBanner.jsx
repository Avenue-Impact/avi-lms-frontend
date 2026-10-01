import React from "react";
import { ArrowRight } from "lucide-react";

export const EnterpriseCtaBanner = ({ onOpenModal }) => {
  return (
    <section className="w-full bg-[#F8F9FC] py-16 sm:py-20 lg:py-24 font-inter text-white">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="rounded-3xl bg-[#0A1430] p-8 sm:p-12 lg:p-16 text-center border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#CC1747]/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="font-space font-extrabold text-[28px] sm:text-[40px] lg:text-[46px] leading-tight text-white max-w-4xl mx-auto">
            Ready to talk about your delivery needs?
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Whether you need a dedicated delivery team, customized workforce upskilling, or global talent pipelines, our executive team is ready to talk.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={onOpenModal}
              className="bg-[#CC1747] hover:bg-[#b0133d] text-white font-semibold text-[15px] sm:text-[16px] px-8 py-4 rounded-xl shadow-xl shadow-[#CC1747]/25 transition-all duration-200 active:scale-[0.98] inline-flex items-center gap-2 group"
            >
              <span>Talk to us about your delivery needs</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseCtaBanner;
