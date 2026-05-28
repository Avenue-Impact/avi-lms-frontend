import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DarkLogo } from "@/Components/Logo";
import Cookies from "js-cookie";
import {
  LayoutDashboard,
  Users,
  FileCheck,
  Video,
  MessageSquare,
  Star,
  Settings,
  LogOut,
} from "lucide-react";
import { useInstructorAuth } from "@/hooks/instructor/use-instructor-auth";

const navItems = [
  {
    text: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/instructor/dashboard",
  },
  {
    text: "Cohorts",
    icon: <Users size={20} />,
    path: "/instructor/cohorts",
  },
  {
    text: "Submissions",
    icon: <FileCheck size={20} />,
    path: "/instructor/submissions",
  },
  {
    text: "Live Sessions",
    icon: <Video size={20} />,
    path: "/instructor/live-sessions",
  },
  {
    text: "Messages",
    icon: <MessageSquare size={20} />,
    path: "/instructor/messages",
  },
  {
    text: "Feedbacks",
    icon: <Star size={20} />,
    path: "/instructor/feedbacks",
  },
];

const InstructorSideNav = ({ open, onClose }) => {
  const { data: instructor } = useInstructorAuth();

  const fName = instructor?.firstname || instructor?.first_name || "";
  const lName = instructor?.lastname || instructor?.last_name || "";
  const initials = `${fName?.[0] || ""}${lName?.[0] || ""}`.toUpperCase() || "I";
  const fullName = `${fName} ${lName}`.trim() || "Instructor";
  const role = instructor?.role || "Instructor";

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("token");
    Cookies.remove("userRole");
    window.location.href = "/login?_r=/instructor/dashboard";
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col border-r border-gray-100 bg-white shadow-xl transition-transform duration-300 ease-in-out",
          // On large screens always visible, on small screens toggle
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
          <div>
            <DarkLogo />
            <p className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.2em] text-primary-color-600">
              Instructor Portal
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Main Menu
          </p>
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <SidebarItem key={item.path} {...item} onNavigate={onClose} />
            ))}
          </ul>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Account
            </p>
            <ul className="space-y-0.5">
              <SidebarItem
                text="Account Settings"
                icon={<Settings size={20} />}
                path="/instructor/settings"
                onNavigate={onClose}
              />
            </ul>
          </div>
        </nav>

        {/* User profile footer — redesigned */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-3 transition-colors hover:bg-gray-100">
            {/* Avatar */}
            <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-color-500 to-primary-color-700 text-sm font-bold text-white shadow-sm">
              {initials}
              {/* Online dot */}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
            </div>

            {/* Name + role */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900 leading-tight">
                {fullName}
              </p>
              <p className="truncate text-[11px] text-gray-400 capitalize leading-tight mt-0.5">
                {role}
              </p>
            </div>

            {/* Sign-out icon — tight to the right */}
            <button
              onClick={handleSignOut}
              title="Sign out"
              className="flex-shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

const SidebarItem = ({ icon, text, path, onNavigate }) => {
  const { pathname } = useLocation();
  const isActive =
    pathname === path || (path !== "/instructor" && pathname.startsWith(path));

  return (
    <li>
      <NavLink
        to={path}
        onClick={onNavigate}
        className={cn(
          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
          isActive
            ? "bg-primary-color-600 text-white shadow-sm"
            : "text-gray-600 hover:bg-primary-color-50 hover:text-primary-color-700",
        )}
      >
        <span
          className={cn(
            "flex-shrink-0 transition-colors",
            isActive ? "text-white" : "text-gray-400 group-hover:text-primary-color-600",
          )}
        >
          {icon}
        </span>
        <span>{text}</span>
        {isActive && (
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/70" />
        )}
      </NavLink>
    </li>
  );
};

export default InstructorSideNav;
