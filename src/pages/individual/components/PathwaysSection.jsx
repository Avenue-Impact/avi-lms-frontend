import React from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

export const PathwaysSection = () => {
  const pathways = [
    {
      type: "LIVE COHORT",
      badgeType: "live",
      title: "Business Analysis Pathway",
      description: "Requirements gathering, stakeholder mapping, process modelling and SQL fundamentals.",
      cohortDate: "1 Sep 2026",
      seats: "14 seats left",
    },
    {
      type: "LIVE COHORT",
      badgeType: "live",
      title: "Project Management Pathway",
      description: "Agile delivery, stakeholder communication, planning and risk management.",
      cohortDate: "8 Sep 2026",
      seats: "9 seats left",
    },
    {
      type: "ON-DEMAND",
      badgeType: "ondemand",
      title: "Data Analytics Pathway",
      description: "SQL, Power BI, and data storytelling — self-paced, start anytime.",
      cohortDate: "Starts anytime",
      seats: "Self-paced",
    },
  ];

  return (
    <section className="w-full bg-[#EFF1F8] py-12 sm:py-16 lg:py-20 font-inter text-[#0A1430]">
      <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mx-auto">
          <span className="text-[#D7195A] font-space text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase block">
            PATHWAYS & START DATES
          </span>
          <h2 className="font-space font-bold text-[32px] sm:text-[40px] lg:text-[45px] leading-[38px] sm:leading-[45px] lg:leading-[50px] tracking-[-2px] text-[#0A1430] mt-3">
            Already know where you’re headed?
            <br />
            Start here.
          </h2>
          <p className="font-inter text-[15px] sm:text-[16px] leading-[26px] text-slate-500 mt-3 sm:mt-4">
            Browse pathways directly and see real cohort dates — or take the 5-minute assessment first if you're still deciding.
          </p>
        </div>

        {/* 3 Pathway Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 sm:mt-14 mx-auto">
          {pathways.map((pathway) => (
            <div
              key={pathway.title}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Pathway Tag Badge */}
                {pathway.badgeType === "live" ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-space font-bold uppercase tracking-wider bg-[#FFEBF0] text-[#D7195A]">
                    <span className="w-2 h-2 rounded-full bg-[#D7195A]" />
                    {pathway.type}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-space font-bold uppercase tracking-wider bg-[#E8EDF5] text-slate-600">
                    <Clock size={12} className="stroke-[2.5]" />
                    {pathway.type}
                  </span>
                )}

                {/* Pathway Title & Description */}
                <h3 className="font-space font-bold text-[18px] sm:text-[19px] text-[#0A1430] mt-4 leading-snug">
                  {pathway.title}
                </h3>
                <p className="font-inter text-[13.5px] sm:text-[14px] text-slate-500 leading-relaxed mt-2.5">
                  {pathway.description}
                </p>
              </div>

              {/* Card Bottom Meta Line */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-inter">
                <div>
                  {pathway.badgeType === "live" ? (
                    <span className="text-slate-500">
                      Next cohort: <strong className="text-[#0A1430] font-semibold">{pathway.cohortDate}</strong>
                    </span>
                  ) : (
                    <strong className="text-[#0A1430] font-semibold">{pathway.cohortDate}</strong>
                  )}
                </div>
                <span className="text-slate-400 font-medium">{pathway.seats}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          <Link
            to="/courses"
            className="bg-white hover:bg-slate-50 border border-slate-200/90 text-[#0A1430] font-inter font-semibold text-[14px] sm:text-[15px] px-7 py-3.5 rounded-xl shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            View all pathways & dates
          </Link>
          <Link
            to="/assessment"
            className="bg-[#D7195A] hover:bg-[#c0154e] text-white font-inter font-semibold text-[14px] sm:text-[15px] px-7 py-3.5 rounded-xl shadow-lg shadow-[#D7195A]/25 transition-all duration-200 active:scale-[0.98]"
          >
            Not sure yet? Take the assessment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PathwaysSection;
