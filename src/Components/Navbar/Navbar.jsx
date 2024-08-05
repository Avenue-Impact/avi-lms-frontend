import React, { useState } from "react";
// import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { DarkLogo, WhiteLogo } from "../Logo";
import navImg from "../../assets/images/navImg.png";
import mobile from "../../assets/images/mobile-dark.png";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import MobileDropdown from "../MobileDropdown";

const Navbar = () => {
  // const [enterNav, setEnterNa] = useState("Home");
  const [dropdown, setDropDown] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const handleNav = () => {
    setShowNav((prev) => !prev);
    setDropDown((prev) => !prev);
  };
  const menus = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/about",
      label: "About Us",
    },
  ];

  return (
    <div className="group absolute left-0 top-0 z-20 w-full">
      <div className="flex justify-between overflow-x-hidden px-8 py-4 transition-all duration-300 ease-linear group-hover:bg-white md:px-12 lg:py-[25.72px] 2xl:px-20">
        <div className="nav-logo">
          <WhiteLogo className="block h-[34.45px] w-[155.05px] group-hover:hidden lg:h-[40.55px] lg:w-[200px]" />
          <DarkLogo
            className={
              "hidden h-[34.45px] w-[155.05px] group-hover:block lg:h-[40.55px] lg:w-[200px]"
            }
          />
        </div>
        <div>
          <div
            className={`absolute w-full md:h-fit md:w-auto ${
              showNav
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
            <ul className="nav flex flex-col items-start gap-6 px-12 text-[#23314A] md:flex-row md:items-center md:px-0 md:*:text-white">
              {menus.map((menu, id) => {
                return (
                  <li
                    key={id}
                    // className="after:contents-[''] relative transition-all duration-150 after:absolute after:left-0 after:mx-auto after:my-0 after:block after:h-[2px] after:w-0 after:bg-red-500 after:transition-[width] after:duration-100 after:ease-in hover:after:w-full"
                    onClick={() => {
                      setDropDown(false);
                      setShowNav(false);
                    }}
                  >
                    <NavLink
                      to={menu.path}
                      className={"group-hover:text-[#23314A]"}
                    >
                      {menu.label}
                    </NavLink>
                  </li>
                );
              })}
              <div>
                <li
                  className="service flex cursor-pointer items-center space-x-2 text-[#23314A] transition-all duration-150 group-hover:text-[#23314A] md:text-white"
                  onClick={() => setDropDown((prev) => !prev)}
                >
                  <span className="after:contents-[''] relative m-auto after:absolute after:left-0 after:m-auto after:block after:h-[2px] after:w-0 after:bg-red-500 after:transition-[width] after:duration-100 after:ease-in hover:after:w-full">
                    Services
                  </span>
                  <span
                    className={`mr-auto inline-flex transition-transform duration-150 ease-linear ${
                      dropdown ? "w-min rotate-180" : "w-min ease-in"
                    }`}
                  >
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                </li>
              </div>
              {dropdown && <MobileDropdown handleNav={handleNav} />}
              <div className="mt-3 md:hidden">
                <img
                  src={navImg}
                  alt=""
                  className={`${dropdown ? "invisible h-0" : "visible"}`}
                />
                <div className="mt-4 space-y-1">
                  <p className="font-light text-[#98A2B3]">+4480005410720</p>
                  <p className="font-light text-[#98A2B3]">London, UK</p>
                  <p className="font-light text-[#98A2B3]">
                    Mon - Sat 8:00 - 18:0
                  </p>
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

            <Link to={"/contact"}>
              <button className="hidden rounded-lg bg-[#f4f5f7] px-4 py-2 capitalize text-[#23314A] group-hover:bg-[#CC1747] group-hover:text-[#FFEBF0] md:block">
                contact
              </button>
            </Link>
          </div>
        </div>

        <button
          className="inline-flex items-center text-2xl text-white group-hover:text-[rgb(35,49,74)] md:hidden"
          role="show and hide menu"
          onClick={() => setShowNav((prev) => !prev)}
        >
          <span className="inline-flex cursor-pointer items-center text-2xl text-white group-hover:text-[rgb(35,49,74)] md:hidden">
            <FontAwesomeIcon icon={faBars} />
          </span>
        </button>
      </div>
      {dropdown && (
        <div
          className="dropdown mb-16 hidden bg-white px-12 md:block"
          onMouseLeave={() => setDropDown(false)}
        >
          <div className="grid grid-cols-2 divide-x divide-[#D6E3FA] border-t border-[#D6E3FA] pb-10">
            <div className="mt-3">
              <img src={navImg} alt="" />
              <div className="mt-4 space-y-1">
                <p className="font-light text-[#98A2B3]">+4480005410720</p>
                <p className="font-light text-[#98A2B3]">London, UK</p>
                <p className="font-light text-[#98A2B3]">
                  Mon - Sat 8:00 - 18:0
                </p>
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
            <div>
              <ul className="nav mt-8 space-y-3 pl-12 font-poppins *:cursor-pointer *:capitalize *:text-[#23314A]">
                <li
                  onClick={handleNav}
                  // className="after:contents-[''] relative w-max transition-all duration-150 after:absolute after:left-0 after:m-auto after:block after:h-[2px] after:w-0 after:bg-red-500 after:transition-[width] after:duration-100 after:ease-in hover:after:w-full"
                >
                  <NavLink to={"/digital-transformation"}>
                    digital transformation
                  </NavLink>
                </li>
                <li
                  onClick={handleNav}
                  // className="after:contents-[''] relative w-max transition-all duration-150 after:absolute after:left-0 after:m-auto after:block after:h-[3px] after:w-0 after:bg-red-500 after:transition-[width] after:duration-100 after:ease-in hover:after:w-full"
                >
                  <NavLink to={"/data-solution"}> data solution</NavLink>
                </li>
                <li
                  onClick={handleNav}
                  // className="after:contents-[''] relative w-max transition-all duration-150 after:absolute after:left-0 after:m-auto after:block after:h-[2px] after:w-0 after:bg-red-500 after:transition-[width] after:duration-100 after:ease-in hover:after:w-full"
                >
                  <NavLink to={"/avenue-impact-development"}>
                    avenue impact development CIC
                  </NavLink>
                </li>
                <li
                  onClick={handleNav}
                  // className="after:contents-[''] relative w-max transition-all duration-150 after:absolute after:left-0 after:m-auto after:block after:h-[2px] after:w-0 after:bg-red-500 after:transition-[width] after:duration-100 after:ease-in hover:after:w-full"
                >
                  <Link to={"/avi"}>Digital learning hub</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
