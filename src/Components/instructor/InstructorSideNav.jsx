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
  User,
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
    path: "/instructor/dashboard/cohorts",
  },
  {
    text: "Submissions",
    icon: <FileCheck size={20} />,
    path: "/instructor/dashboard/submissions",
  },
  {
    text: "Live Sessions",
    icon: <Video size={20} />,
    path: "/instructor/dashboard/live-sessions",
  },
  {
    text: "Messages",
    icon: <MessageSquare size={20} />,
    path: "/instructor/dashboard/messages",
  },
  {
    text: "Feedbacks",
    icon: <Star size={20} />,
    path: "/instructor/dashboard/feedbacks",
  },
];

const InstructorSideNav = () => {
  const { data: instructor } = useInstructorAuth();

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-[320px] flex-col border-r border-gray-200 bg-white">
      <div className="p-6">
        <DarkLogo />
        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-primary-color-600">
          Instructor Portal
        </p>
      </div>

      <nav className="mt-2 flex-grow overflow-y-auto px-4">
        <p className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
          Main Menu
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>

        <div className="mt-6 border-t border-gray-100 pt-6">
          <p className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Account
          </p>
          <ul className="space-y-1">
            <SidebarItem
              text="Account Settings"
              icon={<Settings size={20} />}
              path="/instructor/settings"
            />
          </ul>
        </div>
      </nav>

      {/* User profile + sign out */}
      <div className="border-t border-gray-100 p-4">
        <div className="mb-2 flex items-center gap-3 px-3 py-2">
          <div className="text-primary-color-700 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-color-100 text-xs font-bold">
            {instructor?.firstname?.[0] || ""}
            {instructor?.lastname?.[0] || ""}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-800">
              {instructor?.firstname || "Instructor"}{" "}
              {instructor?.lastname || ""}
            </p>
            <p className="truncate text-[11px] text-gray-400">
              {instructor?.role || "Instructor"}
            </p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, text, path }) => {
  const { pathname } = useLocation();
  const isActive =
    pathname === path || (path !== "/instructor" && pathname.startsWith(path));

  return (
    <li>
      <NavLink
        to={path}
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
          isActive
            ? "bg-primary-color-600 text-white shadow-sm"
            : "text-gray-600 hover:bg-gray-50 hover:text-primary-color-600",
        )}
      >
        <span
          className={cn(
            "transition-colors",
            isActive
              ? "text-white"
              : "text-gray-400 group-hover:text-primary-color-600",
          )}
        >
          {icon}
        </span>
        <span>{text}</span>
      </NavLink>
    </li>
  );
};

export default InstructorSideNav;
