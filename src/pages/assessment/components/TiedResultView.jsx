import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Headphones,
  Calendar,
  PlayCircle,
  BookOpen,
  Users,
} from "lucide-react";
import Cookies from "js-cookie";
import defaultCourseImg from "@/assets/images/hero-collab.jpg";

export default function TiedResultView({
  topMatch,
  runnerUp,
  otherMatches,
  onRestart,
}) {
  const token = Cookies.get("token");
  const isAuthenticated = Boolean(token);

  // Match 1
  const topTitle = topMatch.title || "Career Pathway";
  const topCourses = topMatch.courses || [];
  const primaryTopCourse = topCourses[0] || topMatch.course;
  const topCourseId = primaryTopCourse?.id || primaryTopCourse?._id;

  // Match 2
  const runnerUpTitle = runnerUp.title || "Career Pathway";
  const runnerUpCourses = runnerUp.courses || [];
  const primaryRunnerUpCourse = runnerUpCourses[0] || runnerUp.course;
  const runnerUpCourseId = primaryRunnerUpCourse?.id || primaryRunnerUpCourse?._id;

  const topEnrollUrl = topCourseId
    ? `/preview-video-course/${topCourseId}/enroll?title=${encodeURIComponent(primaryTopCourse.title)}`
    : `/discover-courses`;

  const runnerUpEnrollUrl = runnerUpCourseId
    ? `/preview-video-course/${runnerUpCourseId}/enroll?title=${encodeURIComponent(primaryRunnerUpCourse.title)}`
    : `/discover-courses`;

  const topActionTarget = isAuthenticated
    ? topEnrollUrl
    : topCourseId
    ? `/signup?id=${topCourseId}&title=${encodeURIComponent(primaryTopCourse.title)}&_r=${encodeURIComponent(topEnrollUrl)}`
    : `/signup?pathway=${topMatch.slug || "career"}`;

  const runnerUpActionTarget = isAuthenticated
    ? runnerUpEnrollUrl
    : runnerUpCourseId
    ? `/signup?id=${runnerUpCourseId}&title=${encodeURIComponent(primaryRunnerUpCourse.title)}&_r=${encodeURIComponent(runnerUpEnrollUrl)}`
    : `/signup?pathway=${runnerUp.slug || "career"}`;

  const saveAccountTarget = isAuthenticated
    ? "/dashboard"
    : `/signup?pathway=${topMatch.slug || "career"}`;

  const renderCourseItem = (course) => {
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
        className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:border-[#CC1747]/40 hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-start"
      >
        <div className="flex-1 flex flex-col justify-between min-w-0 h-full">
          <div>
            <h4 className="font-space font-bold text-sm sm:text-base text-[#0A1430] hover:text-[#CC1747] transition">
              <Link to={previewTarget}>{cTitle}</Link>
            </h4>
            <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {cOverview}
            </p>

            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px]">
              {livePrice && (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-700 font-semibold border border-emerald-100">
                  <Calendar className="w-3 h-3" />
                  Live: {livePrice}
                </span>
              )}
              {recordedPrice && (
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-blue-700 font-semibold border border-blue-100">
                  <PlayCircle className="w-3 h-3" />
                  Self-Paced: {recordedPrice}
                </span>
              )}
            </div>
          </div>

          <div className="mt-3.5 flex items-center gap-2 pt-2.5 border-t border-slate-100">
            <Link
              to={enrollTarget}
              className="inline-flex items-center gap-1 rounded-lg bg-[#CC1747] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#B0133D] transition"
            >
              <span>Enroll</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              to={previewTarget}
              className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[880px] mx-auto px-4 sm:px-6 py-10">
      {/* 1. Hero Dual Card */}
      <div className="w-full rounded-3xl bg-[#0E1736] text-white p-6 sm:p-10 text-center shadow-xl shadow-slate-900/15 mb-6 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#D7195A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <p className="text-[#FF7597] font-space font-bold uppercase tracking-widest text-xs mb-2">
          IT'S A CLOSE CALL
        </p>

        <p className="text-slate-300 font-inter text-xs sm:text-sm mb-8">
          Two pathways scored equally — we're showing you courses for both rather than picking for you.
        </p>

        {/* Dual Recommendation Cards Side by Side (Pathways) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm flex flex-col justify-between items-center">
            <h2 className="font-space font-bold text-xl text-white mb-3">
              {topTitle}
            </h2>
            <div className="inline-flex items-center justify-center gap-1.5 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs sm:text-sm text-white">
              <span>Match score:</span>
              <span className="text-[#22c55e] font-bold">{topMatch.percentageMatch || 40}%</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm flex flex-col justify-between items-center">
            <h2 className="font-space font-bold text-xl text-white mb-3">
              {runnerUpTitle}
            </h2>
            <div className="inline-flex items-center justify-center gap-1.5 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs sm:text-sm text-white">
              <span>Match score:</span>
              <span className="text-[#22c55e] font-bold">{runnerUp.percentageMatch || 38}%</span>
            </div>
          </div>
        </div>

        {/* Tied Match Pill Badge */}
        <div className="inline-block mb-4">
          <span className="px-3.5 py-1 rounded-full bg-white/10 text-[11px] font-mono tracking-wider uppercase text-slate-300 border border-white/15">
            TIED MATCH
          </span>
        </div>

        <p className="max-w-xl mx-auto text-slate-300 font-inter text-xs sm:text-sm leading-relaxed mb-6">
          You're drawn to structured problem-solving and coordinating people toward a clear outcome — both instincts sit right at the center of these two pathways.
        </p>
      </div>

      {/* 2. Soft Pink Notice Banner */}
      <div className="w-full rounded-2xl bg-[#FFF1F4] border border-[#FDA4AF] p-5 text-center mb-8 text-xs sm:text-sm text-[#9F1239] leading-relaxed">
        Your top two matches came out within a hair of each other. Explore the specific available courses below for each pathway to make your choice.
      </div>

      {/* 3. Available Courses for Both Pathways */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Pathway 1 Courses */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="font-space font-bold text-lg text-[#0A1430]">
              {topTitle} Courses
            </h3>
            <span className="text-xs font-semibold text-[#CC1747] bg-red-50 px-2 py-0.5 rounded-full">
              {topCourses.length} available
            </span>
          </div>

          {topCourses.length > 0 ? (
            topCourses.map(renderCourseItem)
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-6 text-center text-xs text-slate-500">
              New cohorts for {topTitle} opening soon.
            </div>
          )}
        </div>

        {/* Pathway 2 Courses */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="font-space font-bold text-lg text-[#0A1430]">
              {runnerUpTitle} Courses
            </h3>
            <span className="text-xs font-semibold text-[#CC1747] bg-red-50 px-2 py-0.5 rounded-full">
              {runnerUpCourses.length} available
            </span>
          </div>

          {runnerUpCourses.length > 0 ? (
            runnerUpCourses.map(renderCourseItem)
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-6 text-center text-xs text-slate-500">
              New cohorts for {runnerUpTitle} opening soon.
            </div>
          )}
        </div>
      </div>

      {/* 4. Comparison Table */}
      <div className="mb-10">
        <h2 className="font-space font-bold text-xl text-[#0A1430] mb-4">
          How they compare
        </h2>

        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
          <div className="grid grid-cols-3 bg-[#F8FAFC] border-b border-slate-200/80 p-4 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
            <div>Metric</div>
            <div className="text-center font-bold text-[#0A1430]">{topTitle}</div>
            <div className="text-center font-bold text-[#0A1430]">{runnerUpTitle}</div>
          </div>

          <div className="grid grid-cols-3 p-4 border-b border-slate-100 text-xs sm:text-sm font-inter items-center">
            <span className="text-slate-600 font-medium">Open roles tracked</span>
            <span className="text-center font-space font-bold text-[#0A1430]">{topMatch.openRoles || 312}</span>
            <span className="text-center font-space font-bold text-[#0A1430]">{runnerUp.openRoles || 256}</span>
          </div>

          <div className="grid grid-cols-3 p-4 border-b border-slate-100 text-xs sm:text-sm font-inter items-center">
            <span className="text-slate-600 font-medium">Median UK salary</span>
            <span className="text-center font-space font-bold text-[#0A1430]">{topMatch.medianSalary || "£48k"}</span>
            <span className="text-center font-space font-bold text-[#0A1430]">{runnerUp.medianSalary || "£52k"}</span>
          </div>

          <div className="grid grid-cols-3 p-4 text-xs sm:text-sm font-inter items-center">
            <span className="text-slate-600 font-medium">Demand growth</span>
            <span className="text-center font-space font-bold text-[#16A34A]">↑ {topMatch.demandGrowth || "14%"}</span>
            <span className="text-center font-space font-bold text-[#16A34A]">↑ {runnerUp.demandGrowth || "11%"}</span>
          </div>
        </div>
      </div>

      {/* 5. Career Specialist Help Card */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5 shadow-sm mb-10">
        <div className="p-3 bg-[#0E1736] text-white rounded-2xl shrink-0">
          <Headphones className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-space font-bold text-lg text-[#0A1430] mb-1.5">
            Still not sure which one fits?
          </h3>
          <p className="text-slate-500 font-inter text-xs sm:text-sm leading-relaxed mb-4">
            If you need further support, please speak to our career specialist. They'll walk through your assessment with you and help you choose a direction with confidence.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-[#D7195A] hover:bg-[#be144e] text-white font-inter font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition-all"
          >
            Speak to a career specialist
          </Link>
        </div>
      </div>

      {/* 6. Save Account CTA */}
      <div className="text-center pt-2">
        <Link
          to={saveAccountTarget}
          className="inline-flex items-center justify-center bg-[#0E1736] hover:bg-[#16214a] text-white font-inter font-semibold text-sm sm:text-base px-8 py-4 rounded-xl shadow-md transition-all"
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
