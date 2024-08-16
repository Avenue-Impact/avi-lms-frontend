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

const ProfilePopUp = () => {
  return (
    <div className="absolute right-0 z-50 mt-2 w-[400px] rounded-md border border-gray-200 bg-white px-6 py-8 text-[#344054] shadow-lg">
      <div className="flex items-center gap-5 pb-6 pt-4">
        <div>
          <Avatar className="w-8 cursor-pointer md:h-[60px] md:w-[60px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-primary-color-100 text-sm text-primary-color-600 md:text-lg">
              MS
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 font-[300] text-[#667185]">
          <p className="text-[24px]">Yinka ABeeb</p>
          <p className="text-[14px]">Yinkaabeeb1@gmail.com</p>
        </div>
      </div>

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
          // Add logout functionality here
        }}
        className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-4" /> Logout
      </button>
    </div>
  );
};

export default ProfilePopUp;
