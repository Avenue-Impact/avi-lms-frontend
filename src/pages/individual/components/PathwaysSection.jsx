import React from "react";
import { Link } from "react-router-dom";
import { Clock, Loader2 } from "lucide-react";
import { useFetchAllCourses } from "@/hooks/students/use-fetch-all-courses";

const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
};

const formatDate = (dateStr) => {
  if (!dateStr) return "Starts anytime";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const fallbackPathways = [
  {
    id: "fb-1",
    slug: "business-analysis",
    title: "Business Analysis Pathway",
    overview:
      "Requirements gathering, stakeholder mapping, process modelling and SQL fundamentals.",
    available_course_types: { live_session: true, on_demand: false },
    cohorts: [{ cohort: "1 Sep 2026" }],
  },
  {
    id: "fb-2",
    slug: "project-management",
    title: "Project Management Pathway",
    overview:
      "Agile delivery, stakeholder communication, planning and risk management.",
    available_course_types: { live_session: true, on_demand: false },
    cohorts: [{ cohort: "8 Sep 2026" }],
  },
  {
    id: "fb-3",
    slug: "data-analytics",
    title: "Data Analytics Pathway",
    overview:
      "SQL, Power BI, and data storytelling — self-paced, start anytime.",
    available_course_types: { live_session: false, on_demand: true },
    cohorts: [],
  },
];

export const PathwaysSection = () => {
  const { data: coursesData, isLoading } = useFetchAllCourses({
    page: 1,
    perPage: 6,
  });

  const apiCourses = coursesData?.data?.data?.courses;
  const displayedCourses =
    Array.isArray(apiCourses) && apiCourses.length > 0
      ? apiCourses
      : fallbackPathways;

  return (
    <section id="pathways" className="w-full bg-[#EFF1F8] py-12 sm:py-16 lg:py-20 font-inter text-[#0A1430]">
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

        {/* Loading State */}
        {isLoading && !coursesData ? (
          <div className="flex items-center justify-center py-16 text-slate-400">
            <Loader2 className="animate-spin mr-2" size={24} />
            <span className="text-sm font-medium">Loading pathways...</span>
          </div>
        ) : (
          /* Pathway Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-14 mx-auto">
            {displayedCourses.map((course) => {
              const isLive = Boolean(course.available_course_types?.live_session);
              const isOnlyOnDemand = !isLive && Boolean(course.available_course_types?.on_demand);

              const latestCohort =
                course.cohorts && course.cohorts.length > 0
                  ? course.cohorts[0]?.cohort || course.cohorts[0]?.created_at
                  : null;

              const cleanOverview = stripHtml(course.overview || course.description || "");

              return (
                <Link
                  key={course.id || course._id || course.slug}
                  to={`/courses/${course.slug || course.id || course._id}`}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/70 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-200 group"
                >
                  <div>
                    {/* Pathway Tag Badge */}
                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-space font-bold uppercase tracking-wider bg-[#FFEBF0] text-[#D7195A]">
                        <span className="w-2 h-2 rounded-full bg-[#D7195A]" />
                        LIVE COHORT
                      </span>
                    ) : isOnlyOnDemand ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-space font-bold uppercase tracking-wider bg-[#E8EDF5] text-slate-600">
                        <Clock size={12} className="stroke-[2.5]" />
                        ON-DEMAND
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-space font-bold uppercase tracking-wider bg-[#FFEBF0] text-[#D7195A]">
                        <span className="w-2 h-2 rounded-full bg-[#D7195A]" />
                        PATHWAY
                      </span>
                    )}

                    {/* Pathway Title */}
                    <h3 className="font-space font-bold text-[18px] sm:text-[19px] text-[#0A1430] group-hover:text-[#D7195A] transition-colors mt-4 leading-snug">
                      {course.title}
                    </h3>

                    {/* Pathway Overview (Truncated to avoid layout deformation) */}
                    <p className="font-inter text-[13.5px] sm:text-[14px] text-slate-500 leading-relaxed mt-2.5 line-clamp-3">
                      {cleanOverview || "Gain hands-on skills, practical experience and real-world project mentorship."}
                    </p>
                  </div>

                  {/* Card Bottom Meta Line (Seats removed as requested) */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-inter">
                    <div>
                      {isLive ? (
                        <span className="text-slate-500">
                          Next cohort:{" "}
                          <strong className="text-[#0A1430] font-semibold">
                            {latestCohort ? formatDate(latestCohort) : "Upcoming"}
                          </strong>
                        </span>
                      ) : (
                        <span className="text-slate-500">
                          Access:{" "}
                          <strong className="text-[#0A1430] font-semibold">Starts anytime</strong>
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Bottom CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          <Link
            to="/discover-courses"
            className="bg-white hover:bg-slate-50 border border-slate-200/90 text-[#0A1430] font-inter font-semibold text-[14px] sm:text-[15px] px-7 py-3.5 rounded-xl shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            View all pathways & dates
          </Link>
          <Link
            to="/contact"
            className="bg-[#D7195A] hover:bg-[#c0154e] text-white font-inter font-semibold text-[14px] sm:text-[15px] px-7 py-3.5 rounded-xl shadow-lg shadow-[#D7195A]/25 transition-all duration-200 active:scale-[0.98]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PathwaysSection;
