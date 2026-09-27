import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DarkLogo } from "@/Components/Logo";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/services/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import PopUp from "@/Components/dashboard/PopUp";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const PathwaysNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const token = Cookies.get("token");
  const isAuthenticated = Boolean(token);

  const { data: profileData } = useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
    enabled: isAuthenticated,
  });

  const user = profileData?.data?.data;

  const navLinks = [
    { label: "Home", href: "/individual", isInternal: true },
    { label: "Pathways", href: "/courses", isInternal: true },
    { label: "PrepnHire", href: "https://prepnhire.com/", isInternal: false },
    { label: "Mentliv", href: "https://mentiiv.com/", isInternal: false },
    { label: "ExpertsMerge", href: "/success-stories", isInternal: true },
    { label: "Community", href: "/partner", isInternal: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#EAECF0] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/individual" className="flex items-center gap-2">
          <DarkLogo className="h-9 w-auto object-contain sm:h-10" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.isInternal && location.pathname === link.href;
            return link.isInternal ? (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#CC1747]",
                  isActive ? "font-semibold text-[#CC1747]" : "text-[#344054]"
                )}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#344054] transition-colors hover:text-[#CC1747]"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action / Auth Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-2 text-xs font-semibold text-[#344054] transition-colors hover:bg-gray-50 hover:text-[#101928]"
              >
                Dashboard
              </Link>
              <PopUp className="relative cursor-pointer">
                <Avatar className="h-9 w-9 border border-[#CC1747]/30 transition-colors hover:border-[#CC1747]">
                  <AvatarImage src={user?.avatar} alt="User Avatar" />
                  <AvatarFallback className="bg-primary-color-100 text-xs font-bold text-primary-color-600">
                    {`${user?.firstname?.charAt(0)?.toUpperCase() ?? "A"}${user?.lastname?.charAt(0)?.toUpperCase() ?? "I"}`}
                  </AvatarFallback>
                </Avatar>
              </PopUp>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm font-semibold text-[#344054] shadow-2xs transition-colors hover:bg-gray-50 hover:text-[#101928]"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-[#CC1747] px-4 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#b0133d]"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="rounded-lg p-2 text-[#475467] hover:bg-gray-100 hover:text-[#101928] lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[#EAECF0] bg-white px-4 py-5 shadow-lg lg:hidden">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) =>
              link.isInternal ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-[#344054] hover:bg-gray-50 hover:text-[#CC1747]"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-[#344054] hover:bg-gray-50 hover:text-[#CC1747]"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
          <div className="mt-5 border-t border-[#F2F4F7] pt-4">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-primary-color-100 text-xs font-bold text-primary-color-600">
                      {`${user?.firstname?.charAt(0)?.toUpperCase() ?? "A"}${user?.lastname?.charAt(0)?.toUpperCase() ?? "I"}`}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-semibold text-[#101928]">
                    {user?.firstname} {user?.lastname}
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg bg-[#CC1747] px-3.5 py-1.5 text-xs font-semibold text-white"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-lg border border-[#D0D5DD] py-2 text-sm font-semibold text-[#344054]"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-lg bg-[#CC1747] py-2 text-sm font-semibold text-white"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default PathwaysNavbar;
