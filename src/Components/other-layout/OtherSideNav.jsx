import React from "react";
import { Link, NavLink, useLocation, useParams, useSearchParams } from "react-router-dom";
import { DarkLogo } from "../Logo";
import { cn } from "@/lib/utils";
import { useCourseData } from "@/hooks/use-course-data";
import { useProfile } from "@/hooks/students/use-fetch-student-profile";
import { useFetchUnseenMaterialsCount } from "@/hooks/materials/use-materials";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { 
  BsPlayCircle, 
  BsFolder2, 
  BsGraphUp 
} from "react-icons/bs";
import { TiGroupOutline } from "react-icons/ti";
import { LiaTrophySolid } from "react-icons/lia";
import { 
  FaRegHeart, 
  FaTimes, 
  FaLongArrowAltLeft 
} from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { PiGearThin } from "react-icons/pi";
import { IoGiftOutline } from "react-icons/io5";

const OtherSideNav = ({
  setIsQuestionDrawerOpen,
  setShowModal,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const location = useLocation();
  const { courseId } = useParams();
  const [queryString] = useSearchParams();
  const courseTitle = queryString.get("title") || "Course";

  const { data, type } = useCourseData();
  const cohortId = data?.data?.data?.cohort_id || (type === "on demand" ? "on-demand" : "");
  const onDemandDuration = type === "on demand" ? (data?.data?.data?.subscription_limit || "") : "";

  const previewPath = type === "live class" 
    ? `/dashboard/${courseId}/live?title=${encodeURIComponent(courseTitle)}&cohortId=${cohortId}` 
    : `/dashboard/${courseId}/recorded?title=${encodeURIComponent(courseTitle)}`;

  const materialParams = type === "live class" 
    ? { cohort_id: data?.data?.data?.cohort_id, cohortId: data?.data?.data?.cohort_id }
    : { on_demand_duration: data?.data?.data?.subscription_limit };
  const { data: unseenCount = 0 } = useFetchUnseenMaterialsCount(courseId, materialParams);

  const materialsPath = `/dashboard/${courseId}/materials?title=${encodeURIComponent(courseTitle)}${cohortId ? `&cohortId=${cohortId}&cohort_id=${cohortId}` : ""}${onDemandDuration ? `&duration=${encodeURIComponent(onDemandDuration)}` : ""}${type ? `&access_type=${encodeURIComponent(type)}` : ""}`;
  const progressPath = `/dashboard/${courseId}/progress?title=${encodeURIComponent(courseTitle)}`;
  const projectsPath = `/dashboard/${courseId}/projects?title=${encodeURIComponent(courseTitle)}`;
  const certificatePath = `/dashboard/${courseId}/certificate?cohortId=${cohortId}&title=${encodeURIComponent(courseTitle)}${onDemandDuration ? `&duration=${encodeURIComponent(onDemandDuration)}` : ""}`;

  const isContentActive = location.pathname.includes("/live") || location.pathname.includes("/recorded");
  const isMaterialsActive = location.pathname.includes("/materials");
  const isProgressActive = location.pathname.includes("/progress");
  const isProjectsActive = location.pathname.includes("/projects");
  const isCertificateActive = location.pathname.includes("/certificate");

  const getItemClass = (isActive) =>
    cn(
      "group flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
      isActive
        ? "bg-[#FFF1F3] text-[#CC1747] font-semibold border-l-4 border-[#CC1747] shadow-2xs"
        : "text-[#475467] hover:bg-[#F9FAFB] hover:text-[#101928]"
    );

  const handleLinkClick = () => {
    setIsOpenMobile?.(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setIsOpenMobile?.(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-[272px] flex-col border-r border-[#EAECF0] bg-white shadow-sm transition-transform duration-200 ease-in-out lg:z-30 lg:translate-x-0",
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Top Header: Logo + Close Button (Mobile) */}
        <div className="flex items-center justify-between p-4 pb-2">
          <Link to="/dashboard" onClick={handleLinkClick}>
            <DarkLogo className="w-36 overflow-hidden transition-all" />
          </Link>
          <button
            type="button"
            onClick={() => setIsOpenMobile?.(false)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 lg:hidden"
            aria-label="Close menu"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Back to Dashboard Button & Course Context */}
        <div className="px-3 pt-2 pb-1">
          <Link
            to="/dashboard"
            onClick={handleLinkClick}
            className="flex items-center gap-2 rounded-lg border border-[#EAECF0] bg-[#F9FAFB] px-3 py-2 text-xs font-semibold text-[#344054] transition-all hover:bg-[#F2F4F7] hover:text-[#101928] hover:border-[#D0D5DD]"
          >
            <FaLongArrowAltLeft className="text-sm text-[#667185]" />
            <span>Back to Dashboard</span>
          </Link>

          {/* Current Course Context Card */}
          <div className="mt-2.5 rounded-xl border border-[#F2F4F7] bg-gradient-to-br from-[#FAFAFA] to-[#F5F5F5] p-3 shadow-2xs">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#667185]">
                Course Workspace
              </span>
              <span
                className={cn(
                  "text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize",
                  type === "live class"
                    ? "bg-[#FFECE5] text-[#AD3307]"
                    : "bg-[#ECFDF3] text-[#027A48]"
                )}
              >
                {type === "live class" ? "Live Session" : "On Demand"}
              </span>
            </div>
            <h4 className="text-xs font-bold text-[#101928] line-clamp-2 leading-snug" title={courseTitle}>
              {courseTitle}
            </h4>
          </div>
        </div>

        {/* Scrollable Navigation Items Area */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
          {/* Main Course Nav Items */}
          <div>
            <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-[#98A2B3] mb-1.5">
              Course Menu
            </p>
            <ul className="space-y-1">
              {/* 1. Course Content / Preview */}
              <li>
                <Link
                  to={previewPath}
                  onClick={handleLinkClick}
                  className={getItemClass(isContentActive)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-inherit">
                      <BsPlayCircle />
                    </span>
                    <span>Course Content</span>
                  </div>
                </Link>
              </li>

              {/* 2. Course Materials */}
              <li>
                <Link
                  to={materialsPath}
                  onClick={handleLinkClick}
                  className={getItemClass(isMaterialsActive)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-inherit">
                      <BsFolder2 />
                    </span>
                    <span>Course Materials</span>
                  </div>
                  {Number(unseenCount) > 0 && (
                    <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold text-white bg-[#CC1747]">
                      {unseenCount > 99 ? "99+" : unseenCount}
                    </span>
                  )}
                </Link>
              </li>

              {/* 3. Course Progress */}
              <li>
                <Link
                  to={progressPath}
                  onClick={handleLinkClick}
                  className={getItemClass(isProgressActive)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-inherit">
                      <BsGraphUp />
                    </span>
                    <span>Course Progress</span>
                  </div>
                </Link>
              </li>

              {/* 4. Project Area (Only for non on-demand courses) */}
              {type !== "on demand" && (
                <li>
                  <Link
                    to={projectsPath}
                    onClick={handleLinkClick}
                    className={getItemClass(isProjectsActive)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-inherit">
                        <TiGroupOutline />
                      </span>
                      <span>Project Area</span>
                    </div>
                  </Link>
                </li>
              )}

              {/* 5. Get Certificate */}
              <li>
                <Link
                  to={certificatePath}
                  onClick={handleLinkClick}
                  className={getItemClass(isCertificateActive)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-inherit">
                      <LiaTrophySolid />
                    </span>
                    <span>Get Certificate</span>
                  </div>
                </Link>
              </li>

              {/* 6. Leave a Review */}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    handleLinkClick();
                    setShowModal?.(true);
                  }}
                  className={cn(
                    "w-full text-left",
                    getItemClass(false)
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-inherit">
                      <FaRegHeart />
                    </span>
                    <span>Leave a Review</span>
                  </div>
                </button>
              </li>

              {/* 7. Ask Question / Support */}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    handleLinkClick();
                    setIsQuestionDrawerOpen?.(true);
                  }}
                  className={cn(
                    "w-full text-left",
                    getItemClass(false)
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-inherit">
                      <AiOutlineQuestionCircle />
                    </span>
                    <span>Ask a Question</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Student Profile Card */}
        <ProfileImage />
      </aside>
    </>
  );
};

const ProfileImage = () => {
  const { data, isLoading, error } = useProfile();
  const student = data?.data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 border-t border-[#F2F4F7] p-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-2.5 w-28" />
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex items-center gap-3 border-t border-[#F2F4F7] p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
          AI
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-[#101928]">Student</p>
        </div>
      </div>
    );
  }

  const firstName = student?.firstname || student?.first_name || "A";
  const lastName = student?.lastname || student?.last_name || "I";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="flex items-center gap-3 border-t border-[#F2F4F7] p-3">
      <Avatar className="h-10 w-10 rounded-full border border-[#EAECF0]">
        <AvatarImage src={student?.avatar} alt="Student avatar" />
        <AvatarFallback className="bg-primary-color-100 text-xs font-bold text-primary-color-600">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-[#101928] capitalize">
          {firstName} {lastName}
        </p>
        <p className="truncate text-[11px] text-[#667185]">
          {student?.email}
        </p>
      </div>
    </div>
  );
};

export default OtherSideNav;
