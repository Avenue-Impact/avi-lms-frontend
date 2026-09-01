import React from "react";
import { WhiteLogo, DarkLogo } from "./Logo";
import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import { socialLinks } from "../utils/socialLinks";

const XIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TiktokIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.18 1.15 1.25 2.75 2.05 4.44 2.24v3.9c-1.52-.06-3.01-.58-4.28-1.44-.75-.52-1.39-1.2-1.89-1.97v6.62c-.06 2.37-.9 4.74-2.58 6.43-1.86 1.83-4.54 2.69-7.1 2.28-2.91-.45-5.46-2.61-6.28-5.43C-.19 12.8 1.48 8.87 4.9 7.64c.96-.34 1.99-.48 3.01-.4v3.91c-.84-.13-1.72.03-2.45.48-1.07.67-1.63 1.98-1.41 3.22.25 1.4 1.51 2.5 2.92 2.47 1.53.03 2.87-1.12 2.97-2.65V.02h2.585z" />
  </svg>
);

const AVIFooter = ({ theme = "dark", variant, light = false }) => {
  const isLight = theme === "light" || variant === "light" || light === true;

  const ecosystemLinks = [
    { label: "Learning Hub", to: "/digital-learning-hub" },
    { label: "PrepnHire", href: "https://prepnhire.com/", external: true },
    { label: "Mentiiv", href: "https://mentiiv.com/", external: true },
    { label: "ExpertsMerge", to: "/success-stories" },
  ];

  const companyLinks = [
    { label: "About", to: "/about" },
    { label: "Careers", to: "/contact" },
    { label: "Success Stories", to: "/success-stories" },
  ];

  const supportLinks = [
    { label: "Help Centre", to: "/contact" },
    { label: "Contact", to: "/contact" },
    { label: "Community", to: "/partner" },
  ];

  return (
    <footer
      className={`relative font-inter transition-colors duration-200 ${
        isLight
          ? "bg-[#EFF1F8] text-[#0A1430] border-t border-slate-200/80"
          : "bg-[#030d22] text-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Logo & Description */}
          <div className="md:col-span-4 lg:col-span-5 space-y-4">
            <Link to="/" className="inline-block">
              {isLight ? (
                <DarkLogo className="h-10 sm:h-11 w-auto object-contain" />
              ) : (
                <WhiteLogo className="h-10 sm:h-11 w-auto object-contain" />
              )}
            </Link>

            <p
              className={`text-sm leading-relaxed max-w-sm font-inter ${
                isLight ? "text-slate-500" : "text-gray-300"
              }`}
            >
              The career transformation ecosystem — learning, mentoring, interview
              prep and opportunities in one place.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isLight ? "text-slate-400 hover:text-[#D7195A]" : "text-gray-400 hover:text-white"
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isLight ? "text-slate-400 hover:text-[#D7195A]" : "text-gray-400 hover:text-white"
                }`}
                aria-label="Twitter"
              >
                <XIcon className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isLight ? "text-slate-400 hover:text-[#D7195A]" : "text-gray-400 hover:text-white"
                }`}
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isLight ? "text-slate-400 hover:text-[#D7195A]" : "text-gray-400 hover:text-white"
                }`}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isLight ? "text-slate-400 hover:text-[#D7195A]" : "text-gray-400 hover:text-white"
                }`}
                aria-label="TikTok"
              >
                <TiktokIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Ecosystem Links */}
            <div className="space-y-3.5">
              <h4
                className={`font-space font-bold text-[14px] sm:text-[15px] tracking-tight ${
                  isLight ? "text-[#0A1430]" : "text-white"
                }`}
              >
                Ecosystem
              </h4>
              <ul className="space-y-2.5 text-sm font-inter">
                {ecosystemLinks.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors ${
                          isLight
                            ? "text-slate-500 hover:text-[#D7195A]"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </a>
                    ) : item.to?.startsWith("#") ? (
                      <a
                        href={item.to}
                        className={`transition-colors ${
                          isLight
                            ? "text-slate-500 hover:text-[#D7195A]"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        className={`transition-colors ${
                          isLight
                            ? "text-slate-500 hover:text-[#D7195A]"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-3.5">
              <h4
                className={`font-space font-bold text-[14px] sm:text-[15px] tracking-tight ${
                  isLight ? "text-[#0A1430]" : "text-white"
                }`}
              >
                Company
              </h4>
              <ul className="space-y-2.5 text-sm font-inter">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className={`transition-colors ${
                        isLight
                          ? "text-slate-500 hover:text-[#D7195A]"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-3.5">
              <h4
                className={`font-space font-bold text-[14px] sm:text-[15px] tracking-tight ${
                  isLight ? "text-[#0A1430]" : "text-white"
                }`}
              >
                Support
              </h4>
              <ul className="space-y-2.5 text-sm font-inter">
                {supportLinks.map((item) => (
                  <li key={item.label}>
                    {item.to.startsWith("#") ? (
                      <a
                        href={item.to}
                        className={`transition-colors ${
                          isLight
                            ? "text-slate-500 hover:text-[#D7195A]"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        className={`transition-colors ${
                          isLight
                            ? "text-slate-500 hover:text-[#D7195A]"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div
          className={`mt-12 sm:mt-16 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-inter ${
            isLight
              ? "border-slate-200/80 text-slate-400"
              : "border-slate-800 text-gray-400"
          }`}
        >
          <p>© 2026 Avenue Impact</p>
          <div className="flex items-center gap-2">
            <Link
              to="/privacy-policy"
              className={`transition-colors ${
                isLight ? "hover:text-[#D7195A]" : "hover:text-white"
              }`}
            >
              Privacy
            </Link>
            <span>·</span>
            <Link
              to="/terms-of-service"
              className={`transition-colors ${
                isLight ? "hover:text-[#D7195A]" : "hover:text-white"
              }`}
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AVIFooter;
