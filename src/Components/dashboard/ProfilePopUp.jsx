import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaRegBell, FaRegHeart } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";

import {
  faCog,
  faSignOutAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Skeleton } from "../ui/skeleton";
import { useProfile } from "@/hooks/students/use-fetch-student-profile";
import { useCareerAssessment } from "@/utils/careerAssessment";
import fallbackCourseImage from "@/assets/images/join_team.png";
import Cookies from "js-cookie";

const ProfilePopUp = () => {
  const { isLoading, data } = useProfile();
  const { hasCompleted, courses, pathway } = useCareerAssessment();

  return (
    <div className="mx-auto ml-auto w-full max-w-[400px] rounded-md border border-gray-200 bg-white px-6 py-6 text-[#344054] shadow-lg">
      {isLoading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8 rounded-full md:h-14 md:w-14" />
          <div className="space-y-2">
            <Skeleton className="h-4 max-w-[120px]" />
            <Skeleton className="h-4 max-w-[100px]" />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-5 pb-5 pt-2">
          <div>
            <Avatar className="w-8 cursor-pointer md:h-[60px] md:w-[60px]">
              <AvatarImage src={data?.data?.data.avatar} alt="User Avatar" />
              {isLoading && <Skeleton className="h-12 w-12 rounded-full" />}

              <AvatarFallback className="bg-primary-color-100 text-sm text-primary-color-600 md:text-2xl">
                {`${data?.data?.data.firstname.charAt(0).toUpperCase() ?? "A"}${data?.data?.data.lastname.charAt(0).toUpperCase() ?? "I"}`}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 font-[300] text-[#667185]">
            <p className="text-[20px] font-medium text-[#0A1430] *:capitalize">
              {" "}
              <span>{data?.data?.data.firstname ?? "Unavailable"}</span>{" "}
              <span>{data?.data?.data.lastname}</span>
            </p>
            <p className="text-[13px] text-slate-500">
              {data?.data?.data.email?.length > 26
                ? `${data?.data?.data.email.slice(0, 26)}...`
                : (data?.data?.data.email ?? "unavailable")}
            </p>
          </div>
        </div>
      )}

      {/* Career Profile Suggestions (Scenario 13) */}
      {hasCompleted && courses.length > 0 && (
        <div className="py-3 px-1 my-2 border-t border-b border-[#E2E8F0] bg-[#F8FAFC] -mx-6 px-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D7195A]">
              Matched to Career Profile
            </span>
            <span className="text-[11px] font-medium text-slate-500">
              {courses.slice(0, 3).length} courses
            </span>
          </div>
          <div className="space-y-1.5">
            {courses.slice(0, 3).map((course) => (
              <Link
                key={course.id || course._id || course.slug}
                to={`/preview-course/${course.slug || course.id || course._id}`}
                className="flex items-center gap-3 p-2 rounded-lg bg-white border border-slate-200/70 hover:border-[#D7195A]/50 hover:shadow-xs transition-all group"
              >
                <img
                  src={course.cover_image || fallbackCourseImage}
                  alt={course.title}
                  className="w-10 h-10 rounded-md object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-800 group-hover:text-[#D7195A] transition-colors truncate">
                    {course.title}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    Click to view course
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="h-[1px] w-full bg-[#C7D7F4] lg:block" />

      <div className="py-4">
        <Link
          to="/dashboard"
          className="flex items-center px-4 py-3 hover:bg-gray-100"
        >
          <GrHomeRounded className="mr-4" /> Dashboard
        </Link>
        <Link
          to="/dashboard/notification"
          className="flex items-center px-4 py-3 hover:bg-gray-100"
        >
          <FaRegBell className="mr-4" />
          Notifications
        </Link>
        <Link
          to="/dashboard/wishlists"
          className="flex items-center px-4 py-2 hover:bg-gray-100"
        >
          <FaRegHeart className="mr-4" /> Wishlist
        </Link>
      </div>

      <div className="hidden h-[1.2px] w-full bg-[#C7D7F4] lg:block" />

      <div className="py-5">
        <Link
          to="/dashboard/student-settings"
          className="flex items-center px-4 py-2 hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faCog} className="mr-4" /> Account Settings
        </Link>
        <Link
          to="/dashboard/referral"
          className="flex items-center px-4 py-2 hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-4" /> Referral
        </Link>
      </div>

      <div className="mb-6 hidden h-[1.2px] w-full bg-[#C7D7F4] lg:block" />

      <button
        onClick={() => {
          Cookies.remove("token");
          window.location.href = "/login";
        }}
        className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-4" /> Logout
      </button>
    </div>
  );
};

export default ProfilePopUp;
