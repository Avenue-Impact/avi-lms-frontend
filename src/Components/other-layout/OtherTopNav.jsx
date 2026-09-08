import { useState, useRef, useEffect } from "react";
import { useCourseData } from "@/hooks/use-course-data";
import { cn } from "@/lib/utils";
import { FaLongArrowAltLeft, FaRegHeart, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { LiaTrophySolid } from "react-icons/lia";
import { TiGroupOutline } from "react-icons/ti";
import { BsGrid, BsPlayCircle, BsGraphUp, BsFolder2 } from "react-icons/bs";
import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import { useSafeBack } from "@/hooks/use-safe-back";
import { useFetchUnseenMaterialsCount } from "@/hooks/materials/use-materials";

const OtherTopNav = ({ setShowModal, setIsQuestionDrawerOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [queryString] = useSearchParams();
  const { courseId } = useParams();

  const { data, type } = useCourseData();
  const previewPath = type === "live class" 
    ? `/dashboard/${courseId}/live?title=${queryString.get("title") ?? ""}&cohortId=${data?.data?.data?.cohort_id ?? ""}` 
    : `/dashboard/${courseId}/recorded?title=${queryString.get("title") ?? ""}`;

  const cohortId = data?.data?.data?.cohort_id || (type === "on demand" ? "on-demand" : "");
  // For on-demand, the enrolled course includes subscription_limit via the enrollment record
  const onDemandDuration = type === "on demand" ? (data?.data?.data?.subscription_limit || "") : "";

  const materialParams = type === "live class" 
    ? { cohort_id: data?.data?.data?.cohort_id }
    : { on_demand_duration: data?.data?.data?.subscription_limit };
  const { data: unseenCount = 0 } = useFetchUnseenMaterialsCount(courseId, materialParams);

  const handleModal = () => setShowModal((prev) => !prev);
  const { setSections } = useViewCourseSections();
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = useSafeBack();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const isMoreActive =
    location.pathname.endsWith("projects") ||
    location.pathname.endsWith("certificate");

  const handleBack = () => {
    goBack();
  };

  return (
    <nav className="flex items-center justify-between gap-[97px] px-3 py-[25px] md:px-5">
      <div className="flex w-full items-center justify-between gap-1 md:gap-6 lg:w-max lg:justify-normal">
        <div className="flex items-center gap-2 md:gap-6">
          <button
            onClick={handleBack}
            type="button"
            className="flex items-center gap-1"
          >
            <span className="flex items-center justify-center rounded-sm border-[#E4E7EC] text-base text-black md:h-6 md:w-6 md:border md:text-[10px]">
              <FaLongArrowAltLeft />
            </span>
            <span className="hidden text-sm capitalize text-[#667185] md:block">
              go back
            </span>
          </button>
          <p className="text-sm font-medium text-black lg:text-lg 2xl:text-2xl max-w-[200px] md:max-w-none truncate md:text-wrap">
            {queryString.get("title") ??
              "Project Consultant Training Programme (Bundle)"}
          </p>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setSections(prev => ({ ...prev, mobile: "course sections" }))}
            className="text-[#E11D48] hover:text-rose-700"
          >
            <BsGrid size={24} />
          </button>
          <button 
            onClick={() => setIsQuestionDrawerOpen?.(true)}
            className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#E11D48] text-xs font-bold text-white hover:bg-rose-700"
          >
            ?
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-[#E11D48] hover:text-rose-700 ml-1"
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Right Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-white shadow-xl flex flex-col">
          <div className="flex justify-end p-4 border-b border-gray-100">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-800"
            >
              <FaTimes size={24} />
            </button>
          </div>
          
          <ul className="flex flex-col p-4 gap-4">
            <li>
              <Link
                to={previewPath}
                className="flex items-center gap-3 text-tertiary-color-700 hover:text-primary-color-600 transition-colors p-2 rounded hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-[22px]"><BsPlayCircle /></span>
                <span className="text-base capitalize font-medium">course preview</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/dashboard/${courseId}/materials?title=${queryString.get("title") ?? ""}${cohortId ? `&cohortId=${cohortId}` : ""}${onDemandDuration ? `&duration=${encodeURIComponent(onDemandDuration)}` : ""}${type ? `&access_type=${encodeURIComponent(type)}` : ""}`}
                className="flex items-center justify-between text-tertiary-color-700 hover:text-primary-color-600 transition-colors p-2 rounded hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[22px]"><BsFolder2 /></span>
                  <span className="text-base capitalize font-medium">course materials</span>
                </div>
                {Number(unseenCount) > 0 && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold text-white bg-[#CC1747]">
                    {unseenCount > 99 ? "99+" : unseenCount}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                to={`/dashboard/${courseId}/progress?title=${queryString.get("title") ?? ""}`}
                className="flex items-center gap-3 text-tertiary-color-700 hover:text-primary-color-600 transition-colors p-2 rounded hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-[22px]"><BsGraphUp /></span>
                <span className="text-base capitalize font-medium">course progress</span>
              </Link>
            </li>
            {type !== "on demand" && (
              <li>
                <Link
                  to={`/dashboard/${courseId}/projects?title=${queryString.get("title") ?? ""}`}
                  className="flex items-center gap-3 text-tertiary-color-700 hover:text-primary-color-600 transition-colors p-2 rounded hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-[22px]"><TiGroupOutline /></span>
                  <span className="text-base capitalize font-medium">project area</span>
                </Link>
              </li>
            )}
            <li>
              <Link
              to={`/dashboard/${courseId}/certificate?cohortId=${cohortId}&title=${queryString.get("title") ?? ""}${onDemandDuration ? `&duration=${encodeURIComponent(onDemandDuration)}` : ""}`}
                className="flex items-center gap-3 text-tertiary-color-700 hover:text-primary-color-600 transition-colors p-2 rounded hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-[22px]"><LiaTrophySolid /></span>
                <span className="text-base capitalize font-medium">get certificate</span>
              </Link>
            </li>
            <li>
              <button
                className="flex items-center gap-3 text-tertiary-color-700 hover:text-primary-color-600 transition-colors w-full text-left p-2 rounded hover:bg-gray-50"
                onClick={() => {
                  handleModal();
                  setIsMobileMenuOpen(false);
                }}
              >
                <span className="text-[22px]"><FaRegHeart /></span>
                <span className="text-base capitalize font-medium">leave a review</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:block">
        <ul className="flex items-center gap-3 *:text-nowrap">
          <li
            className={cn(
              "after:contents-[''] relative cursor-pointer capitalize text-tertiary-color-700 transition-colors duration-300 ease-linear after:absolute after:-bottom-2 after:left-0 after:block after:h-px after:w-0 after:bg-[#CC1747] hover:text-primary-color-600 hover:after:w-full",
              location.pathname.endsWith("live") || location.pathname.endsWith("recorded")
                ? "text-primary-color-600 after:w-full"
                : "",
            )}
          >
            <Link
              to={previewPath}
              className="flex gap-2 2xl:gap-[13px]"
            >
              <span className="text-[22px]">
                <BsPlayCircle />
              </span>
              <span className="text-sm">course preview</span>
            </Link>
          </li>
          <li
            className={cn(
              "after:contents-[''] relative cursor-pointer capitalize text-tertiary-color-700 transition-colors duration-300 ease-linear after:absolute after:-bottom-2 after:left-0 after:block after:h-px after:w-0 after:bg-[#CC1747] hover:text-primary-color-600 hover:after:w-full",
              location.pathname.endsWith("materials")
                ? "text-primary-color-600 after:w-full"
                : "",
            )}
          >
            <Link
              to={`/dashboard/${courseId}/materials?title=${queryString.get("title") ?? ""}${cohortId ? `&cohortId=${cohortId}` : ""}${onDemandDuration ? `&duration=${encodeURIComponent(onDemandDuration)}` : ""}${type ? `&access_type=${encodeURIComponent(type)}` : ""}`}
              className="flex items-center gap-2 2xl:gap-[13px] relative"
            >
              <span className="text-[22px] relative">
                <BsFolder2 />
                {Number(unseenCount) > 0 && (
                  <span className="absolute -top-1 -right-2 flex items-center justify-center min-w-[17px] h-[17px] px-1 rounded-full text-[10px] font-bold text-white bg-[#CC1747] ring-2 ring-white">
                    {unseenCount > 99 ? "99+" : unseenCount}
                  </span>
                )}
              </span>
              <span className="text-sm flex items-center gap-1.5">
                course materials
                {Number(unseenCount) > 0 && (
                  <span className="hidden xl:inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-semibold text-[#CC1747] bg-[#CC1747]/10">
                    {unseenCount} new
                  </span>
                )}
              </span>
            </Link>
          </li>
          <li
            className={cn(
              "after:contents-[''] relative cursor-pointer capitalize text-tertiary-color-700 transition-colors duration-300 ease-linear after:absolute after:-bottom-2 after:left-0 after:block after:h-px after:w-0 after:bg-[#CC1747] hover:text-primary-color-600 hover:after:w-full",
              location.pathname.endsWith("progress")
                ? "text-primary-color-600 after:w-full"
                : "",
            )}
          >
            <Link
              to={`/dashboard/${courseId}/progress?title=${queryString.get("title") ?? ""}`}
              className="flex gap-2 2xl:gap-[13px]"
            >
              <span className="text-[22px]">
                <BsGraphUp />
              </span>
              <span className="text-sm">course progress</span>
            </Link>
          </li>
          {/* 4. More Dropdown (Project Area, Certificate, Leave a Review) */}
          <li
            ref={dropdownRef}
            className={cn(
              "after:contents-[''] relative cursor-pointer capitalize text-tertiary-color-700 transition-colors duration-300 ease-linear after:absolute after:-bottom-2 after:left-0 after:block after:h-px after:w-0 after:bg-[#CC1747] hover:text-primary-color-600 hover:after:w-full",
              isMoreActive || isDropdownOpen
                ? "text-primary-color-600 after:w-full"
                : "",
            )}
          >
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 2xl:gap-2 text-sm focus:outline-none"
            >
              <span>more</span>
              <FaChevronDown
                className={cn(
                  "text-[10px] transition-transform duration-200",
                  isDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {type !== "on demand" && (
                  <Link
                    to={`/dashboard/${courseId}/projects?title=${queryString.get("title") ?? ""}`}
                    onClick={() => setIsDropdownOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 px-4 py-2 text-sm capitalize transition-colors hover:bg-gray-50 hover:text-primary-color-600",
                      location.pathname.endsWith("projects")
                        ? "text-primary-color-600 font-semibold bg-rose-50/50"
                        : "text-tertiary-color-700"
                    )}
                  >
                    <span className="text-[18px]">
                      <TiGroupOutline />
                    </span>
                    <span>project area</span>
                  </Link>
                )}

                <Link
                  to={`/dashboard/${courseId}/certificate?cohortId=${cohortId}&title=${queryString.get("title") ?? ""}${onDemandDuration ? `&duration=${encodeURIComponent(onDemandDuration)}` : ""}`}
                  onClick={() => setIsDropdownOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2 text-sm capitalize transition-colors hover:bg-gray-50 hover:text-primary-color-600",
                    location.pathname.endsWith("certificate")
                      ? "text-primary-color-600 font-semibold bg-rose-50/50"
                      : "text-tertiary-color-700"
                  )}
                >
                  <span className="text-[18px]">
                    <LiaTrophySolid />
                  </span>
                  <span>get certificate</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleModal();
                  }}
                  className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-sm capitalize text-tertiary-color-700 hover:bg-gray-50 hover:text-primary-color-600 transition-colors"
                >
                  <span className="text-[18px]">
                    <FaRegHeart />
                  </span>
                  <span>leave a review</span>
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default OtherTopNav;
