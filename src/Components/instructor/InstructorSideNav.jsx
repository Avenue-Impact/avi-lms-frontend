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

const InstructorSideNav = () => {
  const { data: instructor } = useInstructorAuth();

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("token");
    window.location.href = "/login?_r=/instructor/dashboard";
  };

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-[320px] flex-col border-r border-gray-200 bg-white">
      <div className="p-6">
        <DarkLogo />
        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-primary-color-600">
          Instructor Portal
        </p>
      </div>

      <nav className="mt-2 flex h-full flex-col justify-between overflow-y-auto px-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>

        <div className="mt-6 border-t border-gray-100 pt-6">
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
      <div className="flex w-full items-center justify-between border-t border-gray-100 p-4">
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
          "flex items-center gap-3 px-4 py-3 text-base transition-all",
          isActive
            ? "border-l-4 border-primary-color-600 bg-primary-color-100 text-black"
            : "text-gray-600 hover:border-l-2 hover:border-primary-color-600 hover:bg-primary-color-100 hover:text-black",
        )}
      >
        <span
          className={cn(
            "transition-colors",
            isActive
              ? "text-primary-color-600"
              : "text-gray-400 hover:text-primary-color-600",
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
