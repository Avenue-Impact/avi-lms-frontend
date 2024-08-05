import { DarkLogo } from "../Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";

const AviNav = ({ showNav, setShowNav }) => {
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
      <div
        className={`fixed right-0 top-0 z-20 flex h-[40vh] w-2/4 flex-col items-center gap-8 bg-white px-12 py-10 transition-transform duration-300 ease-linear md:relative md:h-fit md:w-max md:translate-x-0 md:flex-row md:gap-5 md:px-0 md:py-0 ${showNav ? "translate-x-full" : "translate-x-0"}`}
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
        <ul className="nav gap- flex flex-col items-center *:cursor-pointer *:capitalize *:text-[#23314A] md:flex-row md:gap-10">
          {/* className="contents-[''] relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#CC1747]" */}
          <li onClick={() => setShowNav(true)}>
            <NavLink to={"/avi"}>home</NavLink>
          </li>
          <li onClick={() => setShowNav(true)}>
            <NavLink to={"/login"}>login</NavLink>
          </li>
        </ul>
        <button
          onClick={() => navigate("/signup")}
          className="rounded-lg bg-[#CC1747] px-4 py-2 capitalize text-[#FFEBF0]"
        >
          register
        </button>
      </div>
    </nav>
  );
};

export default AviNav;
