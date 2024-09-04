import { LucideLogOut } from "lucide-react";
import { PiGearThin } from "react-icons/pi";
import { IoGiftOutline } from "react-icons/io5";
import { useContext, createContext, useState } from "react";
import { DarkLogo } from "../Logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import Cookies from "js-cookie";
import { useProfile } from "@/services/queries";

import { Skeleton } from "../ui/skeleton";

const SidebarContext = createContext();

export function Sidebar({ children, toggleNav, setToggleNav }) {
  const [expanded, setExpanded] = useState(false);

  const { userDetails } = useAuth();

  const location = useLocation();

  // const { data, isLoading } = useQuery({
  //   queryKey: ["userProfile"],
  //   queryFn: fetchUserProfile,
  // });
  const { data, isLoading } = useProfile();
  // if (!isLoading && data?.data?.data !== undefined)
  //   dispatch({ type: "auth/update_profile", payload: { ...data.data.data } });

  const handleLogout = () => {
    // navigate("/login");
    // dispatch({ Type: "auth/logout" });
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen w-[272px] transition-transform duration-200",
        toggleNav ? "-translate-x-full lg:translate-x-0" : "translate-x-0",
      )}
    >
      <nav className="flex h-full w-full flex-col border-r bg-white shadow-sm">
        <div className="mb-3 flex items-center justify-between p-4 pb-2 lg:ml-4 lg:justify-start">
          <DarkLogo className={`overflow-hidden transition-all lg:w-40`} />
          <button onClick={() => setToggleNav((prev) => !prev)}>
            <FontAwesomeIcon
              icon={faClose}
              className="text-2xl text-tertiary-color-700 lg:hidden"
            />
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-2 md:px-3">{children}</ul>
        </SidebarContext.Provider>
        <div>
          <ul className="flex-1 px-3">
            <li
              className={"dashboard"}
              onClick={() => setToggleNav((prev) => !prev)}
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
              onClick={() => setToggleNav((prev) => !prev)}
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

          <div className="flex border-t p-3">
            <Avatar>
              <AvatarImage
                src={
                  userDetails?.avatar
                    ? userDetails.avatar
                    : isLoading
                      ? "" // Skeleton will be shown when isLoading is true
                      : data?.data?.data.avatar || ""
                }
                alt="User Avatar"
              />
              {isLoading && <Skeleton className="h-12 w-12 rounded-full" />}

              <AvatarFallback className="bg-primary-color-100 text-lg text-primary-color-600">
                {userDetails.firstname ? (
                  `${userDetails.firstname.charAt(0).toUpperCase()}${userDetails.lastname.charAt(0).toUpperCase()}`
                ) : isLoading ? (
                  <Skeleton className="h-12 w-12 rounded-full" />
                ) : (
                  `${data?.data?.data.firstname.charAt(0).toUpperCase()}${data?.data?.data.lastname.charAt(0).toUpperCase()}`
                )}
              </AvatarFallback>
            </Avatar>

            <div
              className={`ml-3 flex w-full items-center justify-between overflow-hidden transition-all`}
            >
              <div className="leading-4">
                <h4 className="capitalize text-[#101928]">
                  {!userDetails.firstname && isLoading ? (
                    <Skeleton className="h-4 w-[100px]" />
                  ) : (
                    <>
                      {" "}
                      <span>
                        {userDetails.firstname
                          ? userDetails.firstname
                          : isLoading
                            ? "loading"
                            : data?.data?.data.firstname}
                      </span>{" "}
                      <span>
                        {userDetails.lastname
                          ? userDetails.lastname
                          : isLoading
                            ? "loading"
                            : data?.data?.data.lastname}
                      </span>
                    </>
                  )}
                </h4>
                <span className="text-xs text-gray-600">
                  {userDetails.email.length > 17 ? (
                    `${userDetails.email.slice(0, 19)}...`
                  ) : userDetails.email || isLoading ? (
                    <Skeleton className="mt-1 h-4 w-[150px]" />
                  ) : data?.data?.data.email.length > 17 ? (
                    `${data?.data?.data.email.slice(0, 19)}...`
                  ) : (
                    data?.data?.data.email
                  )}
                </span>
              </div>
              <button onClick={handleLogout}>
                <LucideLogOut />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, path, setToggleNav }) {
  // const { expanded } = useContext(SidebarContext);

  const { pathname } = useLocation();
  // const isActive =
  //   (pathname === "/" && href === "/") ||
  //   pathname === href ||
  //   pathname?.startsWith(`${href}/`);

  return (
    <li
      className={"dashboard capitalize lg:whitespace-nowrap"}
      onClick={() => setToggleNav((prev) => !prev)}
    >
      <NavLink
        to={path}
        className={cn(
          "group relative my-1 flex cursor-pointer items-center border-4 border-transparent px-1 py-2 text-gray-600 transition-colors hover:border-l-primary-color-600 hover:bg-primary-color-100/30 hover:text-primary-color-600",

          pathname === path || pathname?.startsWith(`${path}`)
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
