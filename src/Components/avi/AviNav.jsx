import { useState } from "react";
import { DarkLogo } from "../Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import PopUp from "../dashboard/PopUp";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/services/api";
import { Skeleton } from "../ui/skeleton";

const AviNav = ({ showNav, setShowNav }) => {
  const navigate = useNavigate();
  return (
    <nav className="z-50 flex items-center justify-between px-6 py-4 lg:px-20">
      <div>
        <Link to={"/"} className="cursor-pointer">
          <DarkLogo />
        </Link>
      </div>

      <button className="md:hidden" onClick={() => setShowNav((prev) => !prev)}>
        <FontAwesomeIcon icon={faBars} className="text-2xl text-[#23314A]" />
      </button>

      <div
        className={`fixed right-0 top-0 z-20 flex w-2/4 flex-col items-center gap-8 bg-white px-12 py-10 transition-transform duration-300 ease-linear md:relative md:h-fit md:w-max md:translate-x-0 md:flex-row md:gap-10 md:px-0 md:py-0 ${showNav ? "translate-x-full" : "translate-x-0"}`}
      >
        <button
          type=" button"
          className="w-min self-end md:hidden"
          onClick={() => setShowNav((prev) => !prev)}
        >
          <FontAwesomeIcon
            icon={faClose}
            className="text-xl text-tertiary-color-800"
          />
        </button>
        <ul className="nav flex flex-col items-center gap-6 *:cursor-pointer *:capitalize *:text-[#23314A] md:flex-row md:gap-10">
          {/* className="contents-[''] relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#CC1747]" */}
          <li onClick={() => setShowNav((prev) => !prev)}>
            <NavLink to={"/avi"}>home</NavLink>
          </li>
          <li onClick={() => setShowNav((prev) => !prev)}>
            <NavLink to={"/login"}>login</NavLink>
          </li>
        </ul>
        <button
          onClick={() => {
            navigate("/signup");
            setShowNav((prev) => !prev);
          }}
          className="rounded-lg bg-[#CC1747] px-4 py-2 capitalize text-[#FFEBF0]"
        >
          register
        </button>
      </div>
    </nav>
  );
};

export const PreviewVideoNav = ({ setShowNav }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const { userDetails } = useAuth();

  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 lg:px-20">
      <div>
        <Link to={"/"} className="cursor-pointer">
          <DarkLogo />
        </Link>
      </div>
      <button className="md:hidden" onClick={() => setShowNav((prev) => !prev)}>
        <FontAwesomeIcon icon={faBars} className="text-2xl text-[#23314A]" />
      </button>

      <div className="relative w-2/4">
        <input
          type="text"
          className="w-full rounded-md border bg-gray-50 px-1 py-2 pl-10 text-[14px] focus:outline-none"
          placeholder="What do you want to learn?"
        />
        <div className="absolute left-3 top-1.5 text-gray-400">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>

      <div className="relative flex items-center gap-6">
        <button
          onClick={() => navigate("/dashboard/notification")}
          className="text-xl"
        >
          <FaRegBell />
        </button>
        <div className="absolute right-0 top-0 z-10 h-2 w-2 rounded-full bg-[#008000] md:h-3 md:w-3"></div>

        <PopUp className="relative cursor-pointer">
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

          {/* {dropdownOpen && <ProfilePopUp />} */}
        </PopUp>
      </div>
    </nav>
  );
};

export default AviNav;
