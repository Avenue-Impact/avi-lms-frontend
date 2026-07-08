import { useState } from "react";
import { useCourseData } from "@/hooks/use-course-data";
import { cn } from "@/lib/utils";
import { FaLongArrowAltLeft, FaRegHeart, FaBars, FaTimes } from "react-icons/fa";
import { LiaTrophySolid } from "react-icons/lia";
import { TiGroupOutline } from "react-icons/ti";
import { BsGrid, BsPlayCircle } from "react-icons/bs";
import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { useSafeBack } from "@/hooks/use-safe-back";

const OtherTopNav = ({ setShowModal, setIsQuestionDrawerOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [queryString] = useSearchParams();
  const { courseId } = useParams();

  const { data, type } = useCourseData();
  const previewPath = type === "live class" 
    ? `/dashboard/${courseId}/live?title=${queryString.get("title") ?? ""}&cohortId=${data?.data?.data?.cohort_id ?? ""}` 
    : `/dashboard/${courseId}/recorded?title=${queryString.get("title") ?? ""}`;

  const cohortId = data?.data?.data?.cohort_id ?? "";

  const handleModal = () => setShowModal((prev) => !prev);
  const { setSections } = useViewCourseSections();
  // const location = useLocation();
  const navigate = useNavigate();
  const goBack = useSafeBack();

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
                to={`/dashboard/${courseId}/certificate?cohortId=${cohortId}&title=${queryString.get("title") ?? ""}`}
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
          {type !== "on demand" && (
            <li
              className={cn(
                "after:contents-[''] relative cursor-pointer capitalize text-tertiary-color-700 transition-colors duration-300 ease-linear after:absolute after:-bottom-2 after:left-0 after:block after:h-px after:w-0 after:bg-[#CC1747] hover:text-primary-color-600 hover:after:w-full",
                location.pathname.endsWith("projects")
                  ? "text-primary-color-600 after:w-full"
                  : "",
              )}
            >
              <Link
                to={`/dashboard/${courseId}/projects?title=${queryString.get("title") ?? ""}`}
                className="flex gap-2 2xl:gap-[13px]"
              >
                <span className="text-[22px]">
                  <TiGroupOutline />
                </span>
                <span className="text-sm">project area</span>
              </Link>
            </li>
          )}
          <li
            className={cn(
              "after:contents-[''] relative cursor-pointer capitalize text-tertiary-color-700 transition-colors duration-300 ease-linear after:absolute after:-bottom-2 after:left-0 after:block after:h-px after:w-0 after:bg-[#CC1747] hover:text-primary-color-600 hover:after:w-full",
              location.pathname.endsWith("certificate")
                ? "text-primary-color-600 after:w-full"
                : "",
            )}
          >
            <Link
              to={`/dashboard/${courseId}/certificate?cohortId=${cohortId}&title=${queryString.get("title") ?? ""}`}
              className="flex gap-2 2xl:gap-[13px]"
            >
              <span className="text-[22px]">
                <LiaTrophySolid />
              </span>
              <span className="text-sm">get certificate</span>
            </Link>
          </li>
          <li
            className="after:contents-[''] relative flex cursor-pointer gap-2 capitalize text-tertiary-color-700 transition-colors duration-300 ease-linear after:absolute after:-bottom-2 after:left-0 after:block after:h-px after:w-0 after:bg-[#CC1747] hover:text-primary-color-600 hover:after:w-full 2xl:gap-[13px]"
            onClick={handleModal}
          >
            <span className="text-[22px]">
              <FaRegHeart />
            </span>
            <span className="text-sm">leave a review</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default OtherTopNav;
