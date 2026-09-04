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

export const HeroSection = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathways = [
    { name: "Business Analysis", icon: Smartphone },
    { name: "Project Management", icon: Flag },
    { name: "Data Analytics", icon: TrendingUp },
    { name: "Cyber Security", icon: Shield },
    { name: "Cloud Computing", icon: Cloud },
    { name: "Machine Learning", icon: Cpu },
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
            to="/partner"
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
            <a href="#pathways" className="hover:text-[#D7195A] transition-colors">
              Pathways & Start Dates
            </a>
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
            <a
              href="#pathways"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[15px] font-medium text-[#0A1430] hover:text-[#D7195A]"
            >
              Pathways & Start Dates
            </a>
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
            </div>
          </div>
        )}
      </header>

      {/* Hero Section Container */}
      <section className="w-full bg-[#EFF1F8] pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Category Eyebrow Badge */}
              <div className="flex items-center gap-2 text-[#D7195A] font-space text-[12px] font-bold tracking-[0.14em] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#D7195A] inline-block" />
                CAREER TRANSFORMATION ECOSYSTEM
              </div>

              {/* Main Headline */}
              <h1 className="font-space font-bold text-[32px] sm:text-[40px] lg:text-[45px] leading-[38px] sm:leading-[45px] lg:leading-[50px] tracking-[-2px] text-[#0A1430] mt-4">
                <span className="text-[#D7195A]">Acquire More than Skills</span>
                <br />
                Pathway to your Dream Career with Avenue Impact
              </h1>

              {/* Subtitle / Paragraph */}
              <p className="font-inter text-[15px] sm:text-[16px] leading-[26px] text-[#0A1430]/80 max-w-xl mt-6">
                Avenue Impact combines learning, mentoring, interview preparation and real
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
                <Link
                  to="/assessment"
                  className="bg-white hover:bg-slate-50 border border-slate-200/90 text-[#0A1430] font-inter font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-sm transition-all duration-200 active:scale-[0.98]"
                >
                  Take career assessment
                </Link>
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
                      <div
                        key={item.name}
                        className="bg-[#151F3D]/90 hover:bg-[#1D2B52] border border-white/10 rounded-xl p-3.5 flex items-center gap-3 transition-all duration-200 cursor-pointer group"
                      >
                        <IconComponent
                          size={18}
                          className="text-slate-300 group-hover:text-white shrink-0 transition-colors"
                        />
                        <span className="font-inter text-[11px] sm:text-[13px] font-medium text-slate-100 group-hover:text-white leading-tight">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Agile Delivery & Scrum (Full width) */}
                <div className="mt-2.5">
                  <div className="bg-[#151F3D]/90 hover:bg-[#1D2B52] border border-white/10 rounded-xl p-3.5 flex items-center gap-3 transition-all duration-200 cursor-pointer group">
                    <Users
                      size={18}
                      className="text-slate-300 group-hover:text-white shrink-0 transition-colors"
                    />
                    <span className="font-inter text-[13px] font-medium text-slate-100 group-hover:text-white leading-tight">
                      Agile Delivery & Scrum
                    </span>
                  </div>
                </div>

                {/* Profile Match Information Card */}
                <div className="bg-[#121B35] border border-white/10 rounded-xl p-4 mt-3.5">
                  <div className="font-space font-bold text-[13.5px] text-white">
                    3 roles matched to your profile
                  </div>
                  <div className="font-inter text-[12px] text-slate-400 mt-1">
                    92% match · Business Analyst role, London
                  </div>
                </div>

                {/* Footer Link */}
                <div className="mt-4 pt-1">
                  <a
                    href="#pathways"
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-inter text-[12px] font-medium transition-colors"
                  >
                    See all pathways & start dates <ArrowRight size={14} />
                  </a>
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
