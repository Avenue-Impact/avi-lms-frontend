import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaRegBell } from "react-icons/fa";
import { DarkLogo } from "../Logo";
import { Link, useNavigate } from "react-router-dom";
import PopUp from "./PopUp";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/services/queries";
import { Skeleton } from "../ui/skeleton";

function DashboardNav({ setToggleNav }) {
  const navigate = useNavigate();

  // const { dispatch } = useAuth();
  const { userDetails } = useAuth();
  const { isLoading, data } = useProfile();

  return (
    <nav className="flex w-full flex-nowrap items-center justify-between bg-white py-4 pl-6 pr-6 md:grid md:grid-cols-[3fr_1fr] md:gap-36 md:px-16 md:py-6 md:pl-10 md:pr-4 lg:gap-10 lg:px-[70px] lg:pl-16">
      <span className="flex items-center gap-2 lg:hidden">
        <button
          className="self-end lg:hidden"
          onClick={() => setToggleNav((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faBars} className="text-2xl text-[#23314A]" />
        </button>
        <DarkLogo />
      </span>
      <div className="hidden w-max items-center gap-3 rounded-lg bg-[#FDFDFD] px-4 py-2 lg:flex lg:w-full">
        <FontAwesomeIcon icon={faSearch} className="text-[#475367]" />
        <input
          type="text"
          placeholder=" What do you want to learn?"
          className="w-36 rounded-none border-none bg-transparent text-[#667185] md:w-full"
        />
      </div>
      <div className="flex items-center gap-3 justify-self-end md:gap-4 lg:gap-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hidden text-sm text-[#667185] md:block md:text-nowrap"
            onClick={() => navigate("/discover-courses")}
          >
            View all Courses
          </button>
          <span className="lg:hidden">
            <FontAwesomeIcon icon={faSearch} className="text-[#475367]" />
          </span>

          <Link to={"/dashboard/notification"}>
            <span className="text-xl">
              <FaRegBell />
            </span>
          </Link>
        </div>
        <div className="relative">
          <div className="absolute right-0 top-0 z-10 h-2 w-2 rounded-full bg-[#008000] md:h-3 md:w-3"></div>
          <PopUp className="relative cursor-pointer">
            <Avatar className="h-8 w-8 cursor-pointer md:h-10 md:w-10">
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

              <AvatarFallback className="bg-primary-color-100 text-sm text-primary-color-600 md:text-lg">
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
      </div>
    </nav>
  );
}

export default DashboardNav;
