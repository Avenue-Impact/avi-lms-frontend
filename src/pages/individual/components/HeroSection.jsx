import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Flag,
  TrendingUp,
  Shield,
  Cloud,
  Cpu,
  Users,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { DarkLogo } from "../../../Components/Logo";
import { useProfile } from "@/hooks/students/use-fetch-student-profile";
import { useCareerAssessment } from "@/utils/careerAssessment";
import PopUp from "@/Components/dashboard/PopUp";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import TakeAssessmentButton from "@/Components/assessment/TakeAssessmentButton";
import Cookies from "js-cookie";

export const HeroSection = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = Cookies.get("token");
  const adminToken = Cookies.get("adminToken");
  const { data: profileData } = useProfile();
  const user = profileData?.data?.data;
  const isLoggedIn = Boolean(token && (user || profileData));

  // Dynamic Dashboard Routing based on User Role (Admin, Instructor, Student)
  const userRole = (user?.role || "").toLowerCase();
  const isAdmin = Boolean(adminToken || userRole === "admin" || user?.is_admin);
  const isInstructor = Boolean(userRole === "instructor" || user?.is_instructor);

  const dashboardPath = isAdmin
    ? "/admin/data-management"
    : isInstructor
    ? "/admin/course-management"
    : "/dashboard";

  const dashboardLabel = isAdmin
    ? "Go to Admin Dashboard"
    : isInstructor
    ? "Go to Instructor Dashboard"
    : "Go to Dashboard";

  // Career Assessment Status for Profile Matching
  const { hasCompleted, pathway: userPathway, count } = useCareerAssessment();

  const pathways = [
    { name: "Business Analysis", icon: Smartphone, slug: "business-analysis" },
    { name: "Project Management", icon: Flag, slug: "project-management" },
    { name: "Data Analytics", icon: TrendingUp, slug: "data-analytics" },
    { name: "Cyber Security", icon: Shield, slug: "cybersecurity-fundamentals" },
    { name: "Cloud Computing", icon: Cloud, slug: "cloud-computing" },
    { name: "Machine Learning", icon: Cpu, slug: "machine-learning" },
  ];

  const trustedCompanies = [
    "Meridian",
    "Northwind",
    "Lumen Co",
    "Vantage",
    "Cobalt",
  ];

  const alumniCountries = [
    "UK",
    "US",
    "Canada",
    "Europe",
    "UAE",
    "Africa",
  ];

  return (
    <div className="w-full bg-[#EFF1F8] font-inter text-[#0A1430] selection:bg-[#D7195A] selection:text-white">
      {/* Top Banner */}
      <div className="w-full bg-[#0A1430] text-white py-2 px-4">
        <div className="mx-6 md:mx-12 flex items-center justify-center text-[12px] sm:text-[13px] font-inter">
          <span className="text-slate-300 mr-2">Avenue Impact for:</span>
          <span className="bg-[#D7195A] text-white px-3 py-0.5 rounded-full font-medium text-[11px] sm:text-xs">
            Individuals
          </span>
          <Link
            to="/enterprise"
            className="text-slate-300 hover:text-white ml-3 font-medium transition-colors inline-flex items-center gap-1"
          >
            Corporate & Government <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="w-full bg-white border-b border-slate-200/70 sticky top-0 z-40">
        <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2">
            <DarkLogo className="h-[38px] sm:h-[44px] w-auto object-contain" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-[#0A1430]">
            <Link to="/courses" className="hover:text-[#D7195A] transition-colors">
              Pathways & Start Dates
            </Link>
            <Link to="/enterprise" className="hover:text-[#D7195A] transition-colors">
              Enterprise & Gov
            </Link>
            <a
              href="https://prepnhire.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D7195A] transition-colors"
            >
              PrepnHire
            </a>
            <a
              href="https://mentiiv.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D7195A] transition-colors"
            >
              Mentiiv
            </a>
            <Link to="/success-stories" className="hover:text-[#D7195A] transition-colors">
              ExpertsMerge
            </Link>
          </nav>

          {/* Auth Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link
                  to={dashboardPath}
                  className="text-[13px] font-semibold text-slate-700 hover:text-[#D7195A] px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  {dashboardLabel}
                </Link>
                <PopUp className="relative cursor-pointer">
                  <Avatar className="h-10 w-10 cursor-pointer border-2 border-[#D7195A]/30 hover:border-[#D7195A] transition-colors">
                    <AvatarImage src={user?.avatar} alt="User Avatar" />
                    <AvatarFallback className="bg-primary-color-100 text-sm font-bold text-primary-color-600">
                      {`${user?.firstname?.charAt(0)?.toUpperCase() ?? "A"}${user?.lastname?.charAt(0)?.toUpperCase() ?? "I"}`}
                    </AvatarFallback>
                  </Avatar>
                </PopUp>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-[#0A1430] font-semibold text-[14px] px-5 py-2.5 rounded-lg shadow-sm transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#D7195A] hover:bg-[#be144e] text-white font-semibold text-[14px] px-5 py-2.5 rounded-lg shadow-md shadow-[#D7195A]/25 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#0A1430] hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <Link
              to="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[15px] font-medium text-[#0A1430] hover:text-[#D7195A]"
            >
              Pathways & Start Dates
            </Link>
            <a
              href="https://prepnhire.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[15px] font-medium text-[#0A1430] hover:text-[#D7195A]"
            >
              PrepnHire
            </a>
            <a
              href="https://mentiiv.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[15px] font-medium text-[#0A1430] hover:text-[#D7195A]"
            >
              Mentiiv
            </a>
            <Link
              to="/success-stories"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[15px] font-medium text-[#0A1430] hover:text-[#D7195A]"
            >
              ExpertsMerge
            </Link>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.avatar} alt="User Avatar" />
                      <AvatarFallback className="bg-primary-color-100 text-xs font-bold text-primary-color-600">
                        {`${user?.firstname?.charAt(0)?.toUpperCase() ?? "A"}${user?.lastname?.charAt(0)?.toUpperCase() ?? "I"}`}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#0A1430] truncate">
                        {user?.firstname} {user?.lastname}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    to={dashboardPath}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center bg-[#D7195A] text-white font-semibold text-[14px] py-2.5 rounded-lg shadow-sm"
                  >
                    {dashboardLabel}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full text-center bg-white border border-slate-200 text-[#0A1430] font-semibold text-[14px] py-2.5 rounded-lg shadow-sm"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full text-center bg-[#D7195A] text-white font-semibold text-[14px] py-2.5 rounded-lg shadow-md"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section Container */}
      <section className="w-full bg-[#EFF1F8] pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7">
              <h1 className="font-space font-extrabold text-[38px] sm:text-[48px] lg:text-[54px] text-[#0A1430] leading-[1.08] tracking-tight">
                One complete journey. From zero experience to working in tech.
              </h1>

              <p className="font-inter text-[16px] sm:text-[18px] text-slate-600 leading-relaxed mt-6 max-w-2xl font-normal">
                Avenue Impact unites CPD-accredited training, real work experience,
                personalised mentoring, career preparation, and international hiring
                opportunities into one journey — from choosing a career to getting hired, and
                beyond.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  to="/signup"
                  className="bg-[#D7195A] hover:bg-[#c0154e] text-white font-inter font-semibold text-[15px] px-7 py-3.5 rounded-xl shadow-lg shadow-[#D7195A]/25 transition-all duration-200 active:scale-[0.98]"
                >
                  Start your journey
                </Link>
                <TakeAssessmentButton
                  to="/assessment"
                  label="Take career assessment"
                  layout="inline"
                  variant="outline"
                />
              </div>

              {/* Alumni Placement Locations */}
              <div className="mt-9 flex flex-wrap items-center gap-2">
                <span className="font-inter text-[12px] sm:text-[13px] text-slate-500 font-normal mr-1">
                  Alumni now working in multinational corporations across:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {alumniCountries.map((country) => (
                    <span
                      key={country}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-inter font-semibold bg-[#DDE3F0] text-[#0A1430]"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Card Column */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-[#0A1430] text-white rounded-[26px] p-6 sm:p-7 shadow-2xl border border-slate-800/80">
                {/* Header */}
                <div className="text-[#D7195A] font-space text-[11px] font-bold tracking-[0.16em] uppercase mb-4">
                  EXPLORE ANY OF THESE PATHWAYS
                </div>

                {/* Pathways Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  {pathways.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={`/courses/${item.slug}`}
                        className="bg-[#151F3D]/90 hover:bg-[#1D2B52] border border-white/10 rounded-xl p-3.5 flex items-center gap-3 transition-all duration-200 cursor-pointer group"
                      >
                        <IconComponent
                          size={18}
                          className="text-slate-300 group-hover:text-white shrink-0 transition-colors"
                        />
                        <span className="font-inter text-[11px] sm:text-[13px] font-medium text-slate-100 group-hover:text-white leading-tight">
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Agile Delivery & Scrum (Full width) */}
                <div className="mt-2.5">
                  <Link
                    to="/courses/project-management"
                    className="bg-[#151F3D]/90 hover:bg-[#1D2B52] border border-white/10 rounded-xl p-3.5 flex items-center gap-3 transition-all duration-200 cursor-pointer group"
                  >
                    <Users
                      size={18}
                      className="text-slate-300 group-hover:text-white shrink-0 transition-colors"
                    />
                    <span className="font-inter text-[13px] font-medium text-slate-100 group-hover:text-white leading-tight">
                      Agile Delivery & Scrum
                    </span>
                  </Link>
                </div>

                {/* Profile Match Information Card */}
                <div className="bg-[#121B35] border border-white/10 rounded-xl p-4 mt-3.5">
                  {!isLoggedIn ? (
                    <>
                      <div className="font-space font-bold text-[13.5px] text-white">
                        0 roles matched to your profile
                      </div>
                      <div className="font-inter text-[12px] text-slate-400 mt-1">
                        Log in or take our assessment to discover your pathway matches
                      </div>
                    </>
                  ) : hasCompleted ? (
                    <>
                      <div className="font-space font-bold text-[13.5px] text-white">
                        {count || 1} {count === 1 ? "role" : "roles"} matched to your profile
                      </div>
                      <div className="font-inter text-[12px] text-[#22C55E] font-medium mt-1">
                        Top Match · {userPathway || "Business Analyst role"}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-space font-bold text-[13.5px] text-white">
                        3 roles matched to your profile
                      </div>
                      <div className="font-inter text-[12px] text-slate-400 mt-1">
                        92% match · Business Analyst role, London
                      </div>
                    </>
                  )}
                </div>

                {/* Footer Link */}
                <div className="mt-4 pt-1">
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-inter text-[12px] font-medium transition-colors"
                  >
                    See all pathways & start dates <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Strip */}
      <section className="w-full bg-[#EFF1F8] border-t border-slate-200/80 py-8">
        <div className="mx-6 md:mx-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-slate-400 font-space font-bold text-[11px] tracking-[0.16em] uppercase text-center md:text-left">
            TRUSTED BY PROFESSIONALS FROM
          </span>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-14">
            {trustedCompanies.map((company) => (
              <span
                key={company}
                className="font-space text-slate-400/90 hover:text-slate-600 font-bold text-[17px] sm:text-[19px] tracking-tight transition-colors"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
