import React from "react";
import { useCourseData } from "@/hooks/use-course-data";
import { cn } from "@/lib/utils";
import { FaLongArrowAltLeft, FaBars, FaRegHeart } from "react-icons/fa";
import { BsGrid } from "react-icons/bs";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import { useSearchParams } from "react-router-dom";
import { useSafeBack } from "@/hooks/use-safe-back";

const OtherTopNav = ({
  setShowModal,
  setIsQuestionDrawerOpen,
  setIsMobileSidebarOpen,
}) => {
  const [queryString] = useSearchParams();
  const { type } = useCourseData();
  const { setSections } = useViewCourseSections();
  const goBack = useSafeBack();

  const courseTitle =
    queryString.get("title") ?? "Course Training Programme";

  const handleBack = () => {
    goBack();
  };

  return (
    <nav className="flex items-center justify-between gap-4 border-b border-[#F2F4F7] bg-white px-4 py-3.5 md:px-8">
      {/* Left side: Mobile Sidebar Toggle + Back Button + Course Title */}
      <div className="flex min-w-0 items-center gap-2.5 md:gap-4">
        {/* Mobile menu trigger to open Course Sidebar */}
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen?.(true)}
          className="rounded-lg p-2 text-[#475467] hover:bg-gray-100 hover:text-[#101928] lg:hidden"
          aria-label="Open Course Menu"
        >
          <FaBars size={18} />
        </button>

        {/* Back Button */}
        <button
          onClick={handleBack}
          type="button"
          className="flex items-center gap-1.5 text-[#667185] hover:text-[#101928] transition-colors"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E4E7EC] bg-white text-xs text-[#344054] shadow-2xs">
            <FaLongArrowAltLeft />
          </span>
          <span className="hidden sm:inline text-xs font-semibold capitalize">
            Back
          </span>
        </button>

        {/* Course Title and Type Badge */}
        <div className="flex min-w-0 items-center gap-2 md:gap-3">
          <h1
            className="truncate text-sm font-bold text-[#101928] md:text-base lg:text-lg max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-xl xl:max-w-2xl"
            title={courseTitle}
          >
            {courseTitle}
          </h1>

          {type && (
            <span
              className={cn(
                "hidden sm:inline-flex items-center text-[10px] font-semibold px-2.5 py-0.5 rounded-full capitalize border flex-shrink-0",
                type === "live class"
                  ? "bg-[#FFECE5] text-[#AD3307] border-[#FFD9CC]"
                  : "bg-[#ECFDF3] text-[#027A48] border-[#D1FADF]"
              )}
            >
              {type === "live class" ? "Live Session" : "On Demand"}
            </span>
          )}
        </div>
      </div>

      {/* Right side: Quick Action Buttons & Mobile Helpers */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        {/* Desktop Quick Actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsQuestionDrawerOpen?.(true)}
            className="flex items-center gap-1.5 rounded-lg border border-[#EAECF0] bg-white px-3 py-1.5 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] hover:text-[#101928] transition-colors shadow-2xs"
          >
            <AiOutlineQuestionCircle className="text-base text-[#CC1747]" />
            <span>Ask Question</span>
          </button>

          <button
            type="button"
            onClick={() => setShowModal?.(true)}
            className="flex items-center gap-1.5 rounded-lg border border-[#EAECF0] bg-white px-3 py-1.5 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB] hover:text-[#101928] transition-colors shadow-2xs"
          >
            <FaRegHeart className="text-xs text-[#CC1747]" />
            <span>Leave Review</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Toggle video sections drawer */}
          <button
            onClick={() =>
              setSections((prev) => ({ ...prev, mobile: "course sections" }))
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EAECF0] bg-white text-[#E11D48] hover:bg-rose-50 shadow-2xs"
            aria-label="Course Sections"
            title="Course Sections"
          >
            <BsGrid size={16} />
          </button>

          {/* Question button */}
          <button
            onClick={() => setIsQuestionDrawerOpen?.(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E11D48] text-xs font-bold text-white hover:bg-rose-700 shadow-2xs"
            aria-label="Ask Question"
            title="Ask Question"
          >
            ?
          </button>
        </div>
      </div>
    </nav>
  );
};

export default OtherTopNav;
