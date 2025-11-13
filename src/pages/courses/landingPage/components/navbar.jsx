import React, { useState } from "react";
// import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { DarkLogo } from "../../../../Components/Logo";
import navImg from "../../../../assets/images/navImg.png";
import arrowImg from "../../../../assets/imgs/arrow.png";
import mobile from "../../../../assets/images/mobile-dark.png";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { scrollToElement } from "@/utils/scrollToView";

const CoursesNavbar = () => {
  // const [enterNav, setEnterNa] = useState("Home");
  const [dropdown, setDropDown] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const handleNav = () => {
    setShowNav((prev) => !prev);
    setDropDown((prev) => !prev);
  };
  const menus = [
    {
      path: "hero",
      label: "hero",
    },
    {
      path: "curriculum",
      label: "curriculum",
    },
    {
        path: "mentorship",
        label: "mentorship",
    },
    {
        path: "reviews",
        label: "reviews",
    },


  ];

  return (
    <div className="fixed left-0 top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
     <div className="w-full">
      <div className="flex items-center sm:w-[85%] w-[95%] mx-auto justify-between overflow-x-hidden py-4 transition-all duration-300 ease-linear lg:py-[10px] ">
        <div className="nav-logo">
          {/* <WhiteLogo className="block h-[34.45px] w-[155.05px] group-hover:hidden lg:h-[40.55px] lg:w-[200px]" /> */}
          <Link to={"/"} className="cursor-pointer">
          <DarkLogo
            className={
              " h-[34.45px] w-[155.05px] group-hover:block lg:h-[40.55px] lg:w-[200px]"
            }
          />
          </Link>
        </div>
        <div>
          <div
            className={`absolute w-full md:h-fit md:w-auto ${showNav
                ? "translate-x-0 duration-150 ease-linear"
                : "translate-x-full duration-150 ease-linear"
              } left-0 top-0 gap-6 bg-white pb-12 md:relative md:flex md:translate-x-0 md:bg-transparent md:pb-0`}
          >
            <div className="flex justify-between px-12 py-6 md:hidden">
              <img src={mobile} alt="mobile logo" />

              <button
                onClick={() => setShowNav((prev) => !prev)}
                className="block text-2xl text-[#23314a] md:hidden"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>

            {/* Desktop menu */}
            <ul className="nav flex flex-col items-start gap-6 px-12 text-[#23314A] md:flex-row md:items-center md:px-0 md:*:text-white">
              {menus.map((menu, id) => {
                return (
                  <li
                    key={id}
                    // className=""
                    onClick={() => scrollToElement(menu.path)}
                    className="after:contents-[''] cursor-pointer capitalize relative transition-all duration-150 after:absolute after:left-0 after:mx-auto after:my-0 after:block after:h-[2px] after:w-0 after:bg-red-500 after:transition-[width] after:duration-100 after:ease-in hover:after:w-full"
                    // onClick={() => {
                    //   setDropDown(false);
                    //   setShowNav(false);
                    // }}
                  >
                    {/* <NavLink
                      to={menu.path}
                      className={"group-hover:text-[#23314A]"}
                    >
                      {menu.label}
                    </NavLink> */}
                     {menu.label}
                  </li>
                );
              })}

              {/* Mobile Dropdown */}
              {/* {dropdown && <MobileDropdown handleNav={handleNav} />} */}
              <div className="mt-3 md:hidden">
                <div className="mt-4 space-y-1">
                  <div className="flex gap-3">
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center rounded-full bg-[#ffebf0] p-2 text-[#F53366]"
                    >
                      <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center rounded-full bg-[#ffebf0] p-2 text-[#F53366]"
                    >
                      <FontAwesomeIcon icon={faTwitter} className="text-xl" />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center rounded-full bg-[#ffebf0] p-2 text-[#F53366]"
                    >
                      <FontAwesomeIcon icon={faInstagram} className="text-xl" />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center rounded-full bg-[#ffebf0] p-2 text-[#F53366]"
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            </ul>


          </div>
        </div>

        <div>
              <button 
               onClick={() => scrollToElement("register")}
               className="hidden md:flex rounded-full bg-[#23314A] items-center gap-4 px-4 py-3 capitalize text-[#23314A] text-[#FFEBF0] ">
                <div>
                  Enroll Now
                </div>
                <div className="bg-[#CC1747] h-6 w-6 rounded-full relative">
                  <div className="bg-[#CC1747] h-6 w-6 rounded-full"></div>
                  <img src={arrowImg} alt="arrow" className="absolute bottom-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 " />
                </div>
              </button>
        </div>

        <button
          className="inline-flex items-center text-2xl text-white group-hover:text-[rgb(35,49,74)] md:hidden"
          role="show and hide menu"
          onClick={() => setShowNav((prev) => !prev)}
        >
          <span className="inline-flex cursor-pointer items-center text-2xl text-[rgb(35,49,74)] md:hidden">
            <FontAwesomeIcon icon={faBars} />
          </span>
        </button>
      </div>
     </div>
    </div>
  );
};

export default CoursesNavbar;
