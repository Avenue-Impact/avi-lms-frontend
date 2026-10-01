import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight, Phone, Building2 } from "lucide-react";
import { DarkLogo } from "@/Components/Logo";

export const EnterpriseNavbar = ({ onOpenModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "The Delivery Problem", href: "#delivery-problem" },
    { label: "How We Help", href: "#how-we-help" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Our Process", href: "#our-process" },
    { label: "Global Capability", href: "#global-capability" },
    { label: "Leadership", href: "#leadership" },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 font-inter">
      {/* Top Banner */}
      <div className="w-full bg-[#070D20] border-b border-slate-800/60 py-2 px-4 text-white text-[12px] sm:text-[13px]">
        <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Avenue Impact for:</span>
            <span className="bg-[#CC1747] text-white px-3 py-0.5 rounded-full font-semibold text-[11px] sm:text-xs tracking-wide">
              Enterprise & Public Sector
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-slate-300 hover:text-white font-medium transition-colors inline-flex items-center gap-1"
            >
              For Individuals <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <nav className="w-full bg-[#0A1430]/95 backdrop-blur-md border-b border-slate-800/80 text-white">
        <div className="w-full px-6 md:px-12 lg:px-16 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/enterprise" className="flex items-center gap-2">
            <DarkLogo className="h-[36px] sm:h-[42px] w-auto object-contain brightness-0 invert" />
            <span className="ml-2 pl-2 border-l border-slate-700 text-xs font-semibold tracking-wider text-slate-300 uppercase hidden sm:inline-block">
              Enterprise
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] xl:text-[14px] font-medium text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="hover:text-[#F43F5E] transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenModal}
              className="bg-[#CC1747] hover:bg-[#b0133d] text-white font-semibold text-[13px] xl:text-[14px] px-5 py-2.5 rounded-xl shadow-lg shadow-[#CC1747]/20 transition-all duration-200 active:scale-[0.98] inline-flex items-center gap-1.5"
            >
              <span>Talk to us about your delivery needs</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-200 hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A1430] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="block py-2.5 text-[15px] font-medium text-slate-200 hover:text-[#F43F5E] border-b border-slate-800/50"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal();
                }}
                className="w-full bg-[#CC1747] hover:bg-[#b0133d] text-white font-semibold text-[14px] py-3 rounded-xl shadow-md text-center"
              >
                Talk to us about your delivery needs
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default EnterpriseNavbar;
