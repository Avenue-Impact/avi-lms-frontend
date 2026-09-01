import React from "react";
import { User, Monitor, BarChart3 } from "lucide-react";

export const WhyAvenueImpactSection = () => {
  const cards = [
    {
      icon: User,
      title: "Real Mentors",
      description: "Every mentor works in the field you're entering, right now.",
    },
    {
      icon: Monitor,
      title: "Interview Prep",
      description: "Practice with real questions employers actually ask.",
    },
    {
      icon: BarChart3,
      title: "Industry Aware path",
      description: "Salary bands, demand and skills stay current, not static.",
    },
  ];

  return (
    <section className="w-full bg-[#EFF1F8] py-12 sm:py-16 lg:py-20 font-inter text-[#0A1430]">
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[#D7195A] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase block">
            WHY AVENUE IMPACT
          </span>
          <h2 className="font-space font-bold text-[32px] sm:text-[40px] lg:text-[45px] leading-[38px] sm:leading-[45px] lg:leading-[50px] tracking-[-2px] text-[#0A1430] mt-3">
            Career Experts that Connect at Your Level
          </h2>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 sm:mt-14 mx-6 md:mx-12">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-7 border border-slate-200/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Icon Container */}
                  <div className="w-11 h-11 rounded-xl bg-[#E8EDF5] text-[#0A1430] flex items-center justify-center">
                    <IconComponent size={20} className="stroke-[2.2]" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-space font-bold text-[18px] sm:text-[19px] text-[#0A1430] mt-5 leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-inter text-[13.5px] sm:text-[14px] text-slate-500 leading-relaxed mt-2">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyAvenueImpactSection;
