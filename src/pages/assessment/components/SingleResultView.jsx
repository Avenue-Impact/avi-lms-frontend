import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Calendar,
  PlayCircle,
  Users,
  CheckCircle2,
  TrendingUp,
  Award,
} from "lucide-react";
import Cookies from "js-cookie";
import defaultCourseImg from "@/assets/images/hero-collab.jpg";

export default function SingleResultView({
  topMatch,
  otherMatches,
  onRestart,
}) {
  const token = Cookies.get("token");
  const isAuthenticated = Boolean(token);

  const pathwayTitle = topMatch.title || "Career Pathway";
  const pathwaySummary = topMatch.summary || "";
  const pathwayCourses = topMatch.courses || [];

  const primaryCourse = topMatch.course || pathwayCourses[0] || null;
  const primaryCourseId = primaryCourse?.id || primaryCourse?._id;
  const primaryCourseTitle = primaryCourse?.title || pathwayTitle;

  const defaultEnrollUrl = primaryCourseId
    ? `/preview-video-course/${primaryCourseId}/enroll?title=${encodeURIComponent(primaryCourseTitle)}`
    : `/discover-courses`;

  const heroActionTarget = isAuthenticated
    ? defaultEnrollUrl
    : primaryCourseId
    ? `/signup?id=${primaryCourseId}&title=${encodeURIComponent(primaryCourseTitle)}&_r=${encodeURIComponent(defaultEnrollUrl)}`
    : `/signup?pathway=${topMatch.slug || "career"}`;

  const saveAccountTarget = isAuthenticated
    ? "/dashboard"
    : primaryCourseId
    ? `/signup?id=${primaryCourseId}&title=${encodeURIComponent(primaryCourseTitle)}&_r=${encodeURIComponent(defaultEnrollUrl)}`
    : `/signup?pathway=${topMatch.slug || "career"}`;

  return (
    <div className="w-full max-w-[880px] mx-auto px-4 sm:px-6 py-10">
      {/* 1. Hero Recommendation Card - Pathway Level */}
      <div className="w-full rounded-3xl bg-[#0E1736] text-white p-6 sm:p-10 shadow-xl shadow-slate-900/15 mb-8 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D7195A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-start text-left max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#FF7597] tracking-wider uppercase mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>YOUR RECOMMENDED PATHWAY</span>
          </div>

          <h1 className="font-space font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mb-3">
            {pathwayTitle}
          </h1>

          {/* Match Score Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium text-white mb-4">
            <span>Match score:</span>
            <span className="text-[#22c55e] font-bold text-sm sm:text-base">
              {topMatch.percentageMatch || 95}%
            </span>
          </div>

          <p className="text-slate-300 font-inter text-sm sm:text-base leading-relaxed mb-6">
            {pathwaySummary}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#available-courses"
              className="inline-flex items-center justify-center gap-2 bg-[#D7195A] hover:bg-[#c0144d] text-white font-inter font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-[#D7195A]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>View Pathway Courses</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {primaryCourseId && (
              <Link
                to={heroActionTarget}
                className="inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-inter font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition"
              >
                <span>Enroll in Course</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. Three Metric Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs text-center">
          <h3 className="font-space font-bold text-2xl sm:text-3xl text-[#0A1430] mb-1">
            {topMatch.openRoles || 312}
          </h3>
          <p className="text-slate-500 font-inter text-xs">
            Open roles tracked in UK & global
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs text-center">
          <h3 className="font-space font-bold text-2xl sm:text-3xl text-[#0A1430] mb-1">
            {topMatch.medianSalary || "£48K"}
          </h3>
          <p className="text-slate-500 font-inter text-xs">
            Median UK Salary
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs text-center">
          <h3 className="font-space font-bold text-2xl sm:text-3xl text-[#0A1430] mb-1 flex items-center justify-center gap-1 text-[#16A34A]">
            <TrendingUp className="w-5 h-5 inline" />
            <span>{topMatch.demandGrowth || "14%"}</span>
          </h3>
          <p className="text-slate-500 font-inter text-xs">
            {topMatch.demandQuarter || "Demand growth this quarter"}
          </p>
        </div>
      </div>

      {/* 3. Available Courses Section with Full Images & Enrollment Details */}
      <div id="available-courses" className="mb-12 scroll-mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="font-space font-bold text-2xl text-[#0A1430]">
              Courses in this Pathway
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Select a course below to enroll directly or preview the curriculum.
            </p>
          </div>
          {pathwayCourses.length > 0 && (
            <span className="mt-2 sm:mt-0 inline-flex items-center self-start sm:self-auto rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-[#CC1747]">
              {pathwayCourses.length} Course{pathwayCourses.length === 1 ? "" : "s"} Available
            </span>
          )}
        </div>

        {pathwayCourses.length > 0 ? (
          <div className="space-y-5">
            {pathwayCourses.map((course) => {
              const cId = course.id || course._id;
              const cTitle = course.title || "Course";
              const cOverview = course.overview || "";
              const coverImg = course.cover_image || defaultCourseImg;
              const cEnrollUrl = `/preview-video-course/${cId}/enroll?title=${encodeURIComponent(cTitle)}`;
              const enrollTarget = isAuthenticated
                ? cEnrollUrl
                : `/signup?id=${cId}&title=${encodeURIComponent(cTitle)}&_r=${encodeURIComponent(cEnrollUrl)}`;
              const previewTarget = `/preview-video-course/${cId}`;

              const livePrice =
                course.live_class_price?.amount
                  ? `${course.live_class_price.currency_symbol || "£"}${course.live_class_price.amount}`
                  : null;

              const recordedPrice =
                course.pre_recorded_price?.[0]?.amount
                  ? `${course.pre_recorded_price[0].currency_symbol || "£"}${course.pre_recorded_price[0].amount}`
                  : null;

              return (
                <div
                  key={cId}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:border-[#CC1747]/40 hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start"
                >
                  {/* Course Cover Image */}
                  <div className="w-full md:w-60 h-44 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative border border-slate-200 group">
                    <img
                      src={coverImg}
                      alt={cTitle}
                      onError={(e) => {
                        e.currentTarget.src = defaultCourseImg;
                      }}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-medium backdrop-blur-xs">
                      {course.pathway || course.category || pathwayTitle}
                    </span>
                  </div>

                  {/* Course Details */}
                  <div className="flex-1 flex flex-col justify-between h-full min-w-0">
                    <div>
                      <h3 className="font-space font-bold text-lg sm:text-xl text-[#0A1430] hover:text-[#CC1747] transition">
                        <Link to={previewTarget}>{cTitle}</Link>
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {cOverview}
                      </p>

                      {/* Badges / Pricing Formats */}
                      <div className="mt-3.5 flex flex-wrap items-center gap-2.5 text-xs">
                        {livePrice && (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-emerald-700 font-semibold border border-emerald-100">
                            <Calendar className="w-3.5 h-3.5" />
                            Live Cohort: {livePrice}
                          </span>
                        )}
                        {recordedPrice && (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-blue-700 font-semibold border border-blue-100">
                            <PlayCircle className="w-3.5 h-3.5" />
                            Self-Paced: {recordedPrice}
                          </span>
                        )}
                        {course.cohorts && course.cohorts.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-slate-500 text-xs">
                            <Users className="w-3.5 h-3.5" />
                            {course.cohorts.length} Cohort{course.cohorts.length === 1 ? "" : "s"} Available
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
                      <Link
                        to={enrollTarget}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#CC1747] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#B0133D] transition"
                      >
                        <span>Enroll in Course</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        to={previewTarget}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                      >
                        Preview Syllabus
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
            <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-red-50 text-[#CC1747] mb-3">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-space font-bold text-base text-gray-900">
              New Cohort Starting Soon for {pathwayTitle}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              We are finalizing the upcoming live training dates for this pathway. You can browse all currently open courses or reach out to our admission specialists.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <Link
                to="/discover-courses"
                className="rounded-xl bg-[#0E1736] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#1A254B] transition"
              >
                Browse All Courses
              </Link>
              <Link
                to="/contact"
                className="rounded-xl border border-gray-300 px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Speak with an Advisor
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 4. Other Strong Matches (Pathways) */}
      {otherMatches && otherMatches.length > 0 && (
        <div className="mb-10">
          <h2 className="font-space font-bold text-xl text-[#0A1430] mb-4">
            Other strong matches for you
          </h2>
          <div className="space-y-3">
            {otherMatches.slice(0, 3).map((match) => {
              return (
                <div
                  key={match.id || match.slug}
                  className="flex items-center justify-between bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#D7195A] shrink-0 border border-slate-200">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-inter font-semibold text-[#0A1430] group-hover:text-[#D7195A] text-sm sm:text-base transition-colors">
                        {match.title}
                      </span>
                      {match.summary && (
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {match.summary}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-inter text-slate-500 text-xs sm:text-sm font-medium shrink-0 ml-3">
                    {match.percentageMatch}% match
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Bottom Save CTA */}
      <div className="text-center pt-4 border-t border-slate-200">
        <Link
          to={saveAccountTarget}
          className="inline-flex items-center justify-center bg-[#0E1736] hover:bg-[#16214a] text-white font-inter font-semibold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-md transition-all"
        >
          {isAuthenticated ? "Save to my dashboard" : "Create your free account to save this"}
        </Link>
        <div className="mt-3">
          <button
            onClick={onRestart}
            className="text-xs text-slate-500 hover:text-slate-800 underline transition"
          >
            Retake assessment
          </button>
        </div>
      </div>
    </div>
  );
}
