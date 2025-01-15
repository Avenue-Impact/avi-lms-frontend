import { LucideLogOut } from "lucide-react";
import { PiGearThin } from "react-icons/pi";
import { IoGiftOutline } from "react-icons/io5";

import { DarkLogo } from "../Logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Cookies from "js-cookie";

import { Skeleton } from "../ui/skeleton";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useProfile } from "@/hooks/students/use-fetch-student-profile";

export function Sidebar({ children, toggleNav, setToggleNav }) {
  const location = useLocation();

  const { data, isLoading } = useProfile();

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 z-20 h-screen w-[272px] transition-transform duration-200",
          toggleNav ? "-translate-x-full lg:translate-x-0" : "translate-x-0",
        )}
      >
        <nav className="flex h-full w-full flex-col border-r bg-white shadow-sm">
          <div className="mb-3 flex items-center justify-between p-4 pb-2 lg:ml-4 lg:justify-start">
            <DarkLogo className={`overflow-hidden transition-all lg:w-40`} />
            <button onClick={() => setToggleNav?.((prev) => !prev)}>
              <FontAwesomeIcon
                icon={faClose}
                className="text-2xl text-tertiary-color-700 lg:hidden"
              />
            </button>
          </div>

          <ul className="flex-1 px-2 md:px-3">{children}</ul>
          <div>
            <ul className="flex-1 px-3">
              <li
                className={"dashboard"}
                onClick={() => setToggleNav?.((prev) => !prev)}
              >
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
                  <span className={`ml-3 overflow-hidden transition-all`}>
                    Account Setting
                  </span>
                </NavLink>
              </li>
              <li
                className={"dashboard"}
                onClick={() => setToggleNav?.((prev) => !prev)}
              >
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
                  <span className={`ml-3 overflow-hidden transition-all`}>
                    Referrals
                  </span>
                </NavLink>
              </li>
            </ul>
            <div className="flex items-center justify-between border-t p-3">
              {isLoading ? (
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
              ) : (
                <>
                  <Avatar>
                    <AvatarImage
                      src={data?.data?.data.avatar}
                      alt="User Avatar"
                    />
                    {isLoading && (
                      <Skeleton className="h-12 w-12 rounded-full" />
                    )}

                    <AvatarFallback className="bg-primary-color-100 text-lg text-primary-color-600">
                      {`${data?.data?.data.firstname.charAt(0).toUpperCase() ?? "A"}${data?.data?.data.lastname.charAt(0).toUpperCase() ?? "I"}`}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={`ml-3 flex w-full items-center justify-between overflow-hidden transition-all`}
                  >
                    <div className="leading-4">
                      <h4 className="capitalize text-[#101928]">
                        <>
                          {" "}
                          <span>
                            {data?.data?.data.firstname ?? "unavailable"}
                          </span>{" "}
                          <span>{data?.data?.data.lastname}</span>
                        </>
                      </h4>
                      <span className="text-xs text-gray-600">
                        {data?.data?.data.email.length > 17
                          ? `${data?.data?.data.email.slice(0, 19)}...`
                          : (data?.data?.data.email ?? "unavailable")}
                      </span>
                    </div>
                  </div>
                </>
              )}
              <button onClick={handleLogout}>
                <LucideLogOut />
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, path, setToggleNav }) {
  const { pathname } = useLocation();

  return (
    <li
      className={"dashboard capitalize lg:whitespace-nowrap"}
      onClick={() => setToggleNav?.((prev) => !prev)}
    >
      <NavLink
        to={path}
        className={cn(
          "group relative my-1 flex cursor-pointer items-center border-4 border-transparent px-1 py-2 text-gray-600 transition-colors hover:border-l-primary-color-600 hover:bg-primary-color-100/30 hover:text-primary-color-600",

          pathname === path || pathname?.includes(`${path}`)
            ? "border-l-4 border-l-primary-color-600 bg-primary-color-100/30 font-medium text-primary-color-600"
            : "",
        )}
      >
        <span className={"text-xl"}>{icon}</span>
        <span className={`ml-3 overflow-hidden transition-all lg:block`}>
          {text}
        </span>
      </NavLink>
    </li>
  );
}
