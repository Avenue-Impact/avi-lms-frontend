import { useState } from "react";
import { DarkLogo } from "../Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faClose,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import PopUp from "../dashboard/PopUp";
// import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/services/api";
import { Skeleton } from "../ui/skeleton";
import Cookies from "js-cookie";
import { useSafeBack } from "@/hooks/use-safe-back";

const AviNav = ({ showNav: propShowNav, setShowNav: propSetShowNav }) => {
  const goBack = useSafeBack();
  const [internalShowNav, setInternalShowNav] = useState(true);
  const showNav = propShowNav !== undefined ? propShowNav : internalShowNav;
  const setShowNav =
    propSetShowNav !== undefined ? propSetShowNav : setInternalShowNav;
  const navLinks = [
    { label: "Home", to: "/" },

    {
      to: "/digital-learning-hub",
      label: "Learning Hub",
    },
    { label: "Refer a Friend", to: "/partner" },
    { label: "Self-Paced Learning", to: "/self-pace" },
  ];

  const location = useLocation();
  const isPreviewCourse = location.pathname.startsWith("/preview-course");
  const isAuthenticated = !!Cookies.get("token");

  if (!isAuthenticated && !isPreviewCourse) {
    navLinks.push({ label: "Login", to: "/login" });
  }

  const navigate = useNavigate();
  return (
    <div className="relative z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex w-[95%] items-center justify-between px-6 pb-6 pt-4">
        <div className="flex items-center gap-4">
          <button
            onClick={goBack}
            className="flex items-center justify-center rounded-full bg-gray-100 p-2 px-3 text-gray-600 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <Link to={"/"} className="cursor-pointer">
            <DarkLogo />
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setShowNav((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faBars} className="text-2xl text-[#23314A]" />
        </button>

        <div
          className={`fixed left-0 top-0 z-20 flex h-screen w-full flex-col items-start gap-4 bg-[#14345F] px-8 py-10 transition-transform duration-300 ease-linear md:relative md:h-fit md:w-max md:translate-x-0 md:flex-row md:items-center md:bg-transparent md:px-0 md:py-0 xl:gap-8 ${showNav ? "translate-x-full md:translate-x-0" : "translate-x-0"}`}
        >
          <button
            type="button"
            className="mb-4 w-min self-end md:hidden"
            onClick={() => setShowNav((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faClose} className="text-3xl text-white" />
          </button>

          {/* Desktop & Mobile links */}
          <ul className="nav flex w-full flex-col gap-x-6 gap-y-6 text-white md:w-auto md:flex-row md:text-[#23314A]">
            {navLinks.map((l) => {
              const isActive = location.pathname === l.to;
              return (
                <li key={l.label}>
                  <NavLink
                    to={l.to}
                    className={`block pb-2 pt-4 transition-colors ${isActive ? "text-primary-color-600" : ""}`}
                    onClick={() => setShowNav((prev) => !prev)}
                  >
                    {l.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 w-full md:mt-0 md:w-auto md:hidden">
          {isAuthenticated ? (
            <button
              onClick={() => {
                navigate("/dashboard");
                setShowNav((prev) => !prev);
              }}
              className="w-full rounded-full bg-[#CC1747] px-6 py-3 capitalize text-[#FFEBF0] md:w-auto"
            >
              Dashboard
            </button>
          ) : !isPreviewCourse ? (
            <button
              onClick={() => {
                navigate("/signup");
                setShowNav((prev) => !prev);
              }}
              className="w-full rounded-full bg-[#CC1747] px-6 py-3 capitalize text-[#FFEBF0] md:w-auto"
            >
              Register
            </button>
          ) : null}
        </div>
        </div>
        <div className="mt-8 w-full md:mt-0 md:w-auto max-md:hidden">
          {isAuthenticated ? (
            <button
              onClick={() => {
                navigate("/dashboard");
                setShowNav((prev) => !prev);
              }}
              className="w-full rounded-full bg-[#CC1747] px-6 py-3 capitalize text-[#FFEBF0] md:w-auto"
            >
              Dashboard
            </button>
          ) : !isPreviewCourse ? (
            <button
              onClick={() => {
                navigate("/signup");
                setShowNav((prev) => !prev);
              }}
              className="w-full rounded-full bg-[#CC1747] px-6 py-3 capitalize text-[#FFEBF0] md:w-auto"
            >
              Register
            </button>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export const PreviewVideoNav = ({ setShowNav }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 lg:px-20">
      <div>
        <Link to={"/dashboard"} className="cursor-pointer">
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
            <AvatarImage src={data?.data?.data.avatar || ""} />
            {isLoading && <Skeleton className="h-12 w-12 rounded-full" />}
            <AvatarFallback>
              {isLoading
                ? ""
                : data?.data?.data.firstname[0].toUpperCase() +
                  data?.data?.data.lastname[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </PopUp>
      </div>
    </nav>
  );
};

export default AviNav;
