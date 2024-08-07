import mobileLogo from "../../assets/images/mobile-dark.png";

import { LucideLogOut, MoreVertical } from "lucide-react";
import { PiGearThin } from "react-icons/pi";
import { IoGiftOutline } from "react-icons/io5";
import { useContext, createContext, useState } from "react";
import { DarkLogo } from "../Logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const SidebarContext = createContext();

export function ClosedSidnav({ children }) {
  const [expanded, setExpanded] = useState(false);

  const location = useLocation();

  // fixed left-0 top-0 z-10

  return (
    <aside className="fixed left-0 top-0 h-screen w-min">
      <nav className="flex h-full w-full flex-col border-r bg-white shadow-sm">
        <div className="mb-3 flex items-center justify-center pt-6 lg:ml-4 lg:justify-start">
          <img src={mobileLogo} alt="" className="w-8" />
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-2 md:px-3">{children}</ul>
        </SidebarContext.Provider>
        <div>
          <ul className="flex-1 px-2 md:px-3">
            <li
              className={"dashboard"}
              onClick={() => console.log(location.pathname)}
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
                {/* <span
                  className={`hidden overflow-hidden transition-all md:ml-3 lg:block`}
                >
                  Account Setting
                </span> */}
              </NavLink>
            </li>
            <li
              className={"dashboard"}
              onClick={() => console.log(location.pathname)}
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
                {/* <span
                  className={`hidden overflow-hidden transition-all md:ml-3 lg:block`}
                >
                  Referrals
                </span> */}
              </NavLink>
            </li>
          </ul>

          <div className="flex border-t p-2 md:p-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-primary-color-100 text-lg text-primary-color-600">
                MS
              </AvatarFallback>
            </Avatar>

            {/* <div
              className={`ml-3 hidden w-full items-center justify-between overflow-hidden transition-all lg:flex`}
            >
              <div className="leading-4">
                <h4 className="text-[#101928]">Maxwell Samantha</h4>
                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
              </div>
              <LucideLogOut />
            </div> */}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, alert, path, onClick, active }) {
  const { expanded } = useContext(SidebarContext);

  const location = useLocation();

  return (
    <li className={"dashboard"} onClick={() => console.log(location.pathname)}>
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
