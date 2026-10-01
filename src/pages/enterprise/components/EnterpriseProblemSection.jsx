import React from "react";
import { ArrowRight } from "lucide-react";

export const EnterpriseProblemSection = ({ onOpenModal }) => {
  return (
    <section
      id="delivery-problem"
      className="w-full bg-[#F8F9FC] py-12 sm:py-16 lg:py-20 font-inter text-[#0A1430] border-b border-slate-200"
    >
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        <div>
          {/* Eyebrow */}
          <div className="text-[#CC1747] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-3">
            THE DELIVERY CHALLENGE
          </div>

          {/* Heading */}
          <h2 className="font-space font-extrabold text-[28px] sm:text-[38px] lg:text-[44px] leading-tight text-[#0A1430]">
            Transformation programmes stall without the right delivery capacity
          </h2>

          {/* Body Paragraphs */}
          <div className="mt-6 space-y-4 text-slate-600 text-[15px] sm:text-[17px] leading-relaxed">
            <p>
              Supply constraints, slow hiring, and a scarcity of specialized skills place tremendous pressure on transformation agendas. Traditional consultancy billing models add cost without solving core capability gaps.
            </p>
            <p>
              Avenue Impact provides end-to-end talent solutions and dedicated delivery teams — helping organizations accelerate project delivery and access global delivery capability when internal team capacity is full.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <button
              type="button"
              onClick={onOpenModal}
              className="bg-[#0A1430] hover:bg-[#151F3D] text-white font-semibold text-[14px] sm:text-[15px] px-7 py-3.5 rounded-xl shadow-md transition-all duration-200 inline-flex items-center gap-2 group"
            >
              <span>Talk to us about your delivery needs</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseProblemSection;
