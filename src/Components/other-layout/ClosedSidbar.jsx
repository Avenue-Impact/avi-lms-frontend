import mobileLogo from "../../assets/images/mobile-dark.png";

import { useProfile } from "@/hooks/students/use-fetch-student-profile";
import { cn } from "@/lib/utils";
import { createContext, useContext, useState } from "react";
import { IoGiftOutline } from "react-icons/io5";
import { PiGearThin } from "react-icons/pi";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

const SidebarContext = createContext();

export function ClosedSidnav({ children }) {
  const [expanded, setExpanded] = useState(false);

  const location = useLocation();

  // fixed left-0 top-0 z-10

  return (
    <aside className="left-0 top-0 hidden h-screen w-min lg:fixed lg:block">
      <nav className="flex h-full w-full flex-col border-r bg-white shadow-sm">
        <div className="mb-3 flex items-center justify-center pt-6 lg:ml-4 lg:justify-start">
          <img src={mobileLogo} alt="" className="w-8" />
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-2 md:px-3">{children}</ul>
        </SidebarContext.Provider>
        <div>
          <ul className="flex-1 px-2 md:px-3">
            <li className={"dashboard"}>
              <NavLink
                to={"student-settings"}
                className={cn(
                  "group relative my-1 flex cursor-pointer items-center border-4 border-transparent px-3 py-2 text-gray-600 transition-colors hover:border-l-primary-color-600 hover:bg-primary-color-100/30 hover:text-primary-color-600",
                  location.pathname === "/dashboard/student-settings"
                    ? "border-l-4 border-l-primary-color-600 bg-primary-color-100/30 font-medium text-primary-color-600"
                    : "",
                )}
              >
                <span className={"text-xl"}>
                  <PiGearThin />
                </span>
                {/* <span
                  className={`hidden overflow-hidden transition-all md:ml-3 lg:block`}
                >
                  Account Setting
                </span> */}
              </NavLink>
            </li>
            <li className={"dashboard"}>
              <NavLink
                to={"referral"}
                className={cn(
                  "group relative my-1 flex cursor-pointer items-center border-4 border-transparent px-3 py-2 text-gray-600 transition-colors hover:border-l-primary-color-600 hover:bg-primary-color-100/30 hover:text-primary-color-600",
                  location.pathname === "/dashboard/referral"
                    ? "border-l-4 border-l-primary-color-600 bg-primary-color-100/30 font-medium text-primary-color-600"
                    : "",
                )}
              >
                <span className={"text-xl"}>
                  <IoGiftOutline />
                </span>
                {/* <span
                  className={`hidden overflow-hidden transition-all md:ml-3 lg:block`}
                >
                  Referrals
                </span> */}
              </NavLink>
            </li>
          </ul>

          <ProfileImage />
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, path }) {
  const location = useLocation();

  return (
    <li className={"dashboard"}>
      <NavLink
        to={path}
        className={cn(
          "group relative my-1 flex cursor-pointer items-center border-4 border-transparent px-3 py-2 text-gray-600 transition-colors hover:border-l-primary-color-600 hover:bg-primary-color-100/30 hover:text-primary-color-600",
          location.pathname === `/dashboard/${path}`
            ? "border-l-4 border-l-primary-color-600 bg-primary-color-100/30 font-medium text-primary-color-600"
            : "",
        )}
      >
        <span className={"text-lg md:text-xl"}>{icon}</span>
      </NavLink>
    </li>
  );
}

const ProfileImage = () => {
  const { data, isLoading, error } = useProfile();

  if (isLoading)
    return (
      <div className="flex border-t p-2 md:p-3">
        <Skeleton className={"size-10 rounded-full"} />
      </div>
    );

  if (error)
    return (
      <div className="flex border-t p-2 md:p-3">
        <div className="flex size-10 items-center justify-center bg-slate-200">
          NA
        </div>
      </div>
    );

  return (
    <div className="flex border-t p-2 md:p-3">
      <Avatar>
        <AvatarImage src={data?.data?.data?.avatar} />
        <AvatarFallback className="bg-primary-color-100 text-lg text-primary-color-600">
          {data?.data?.data?.firstname.at(0)}
          {data?.data?.data?.lastname.at(0)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
