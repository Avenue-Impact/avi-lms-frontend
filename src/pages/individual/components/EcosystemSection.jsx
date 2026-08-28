import React from "react";
import { Sparkles, Layers, Award, Briefcase } from "lucide-react";
import AVILogo from "../../../assets/ecobrands/avi.png";
import MentiivLogo from "../../../assets/ecobrands/mentiiv.png";
import PrepnHireLogo from "../../../assets/ecobrands/prepNhire.png";
import ExpertsMergeLogo from "../../../assets/ecobrands/expertsMerge.png";

export const EcosystemSection = () => {
  const products = [
    {
      tag: "LEARNING HUB",
      title: "Learn live & on-demand",
      description: "Industry-led pathways built around real roles.",
      bg: "bg-[#1C2C64]",
      brand: `@/assets/ecobrands/avi.png`,
      tagline: "Dream. Act. Emerge",
      customLogo: (
        <img src={AVILogo} className="w-20 h-auto" />
      ),
    },
    {
      tag: "PREPNHIRE",
      title: "Prepare for interviews",
      description: "Mock interviews and readiness scoring.",
      bg: "bg-[#D7195A]",
      brand: "PrepnHire",
      customLogo: (
        <img src={PrepnHireLogo} className="w-20 h-auto" />
      ),
    },
    {
      tag: "MENTIIV",
      title: "Get mentored",
      description: "1:1 sessions with working professionals.",
      bg: "bg-[#0B8579]",
      brand: "Mentiiv",
      customLogo: (
        <img src={MentiivLogo} className="w-20 h-auto" />
      ),
    },
    {
      tag: "EXPERTSMERGE",
      title: "Find opportunities",
      description: "Consulting and project work marketplace.",
      bg: "bg-[#4D2554]",
      brand: "ExpertsMerge",
      customLogo: (
        <img src={ExpertsMergeLogo} className="w-20 h-auto" />
      ),
    },
  ];

  return (
    <section className="w-full bg-[#EFF1F8] py-12 sm:py-16 lg:py-20 font-inter text-[#0A1430]">
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mx-auto">
          <span className="text-[#D7195A] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase block">
            THE ECOSYSTEM
          </span>
          <h2 className="font-space font-bold text-[32px] sm:text-[40px] lg:text-[45px] leading-[38px] sm:leading-[45px] lg:leading-[50px] tracking-[-2px] text-[#0A1430] mt-3">
            Four Products. One Journey.
          </h2>
          <p className="font-inter text-[15px] sm:text-[16px] leading-[26px] text-slate-500 mt-3 sm:mt-4">
            Everything works together — your learning informs your mentoring, your mentoring informs your interview prep, your prep unlocks real roles.
          </p>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-12 sm:mt-14 mx-auto">
          {products.map((product) => (
            <div
              key={product.tag}
              className={`${product.bg} text-white rounded-[22px] p-6 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[210px] relative overflow-hidden`}
            >
              {/* Top Header of Card */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-space font-bold tracking-[0.14em] uppercase text-white/80">
                  {product.tag}
                </span>
                <div>{product.customLogo}</div>
              </div>

              {/* Body */}
              <div className="mt-6">
                <h3 className="font-space font-bold text-[19px] sm:text-[20px] text-white leading-snug">
                  {product.title}
                </h3>
                <p className="font-inter text-[13px] sm:text-[13.5px] leading-[20px] text-white/80 mt-2">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
