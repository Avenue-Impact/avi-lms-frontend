import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaRegBell } from "react-icons/fa";
import { Link } from "react-router-dom";

function DashboardNav() {
  return (
    <nav className="flex w-full items-center justify-between bg-white py-4 pl-6 pr-6 md:grid md:grid-cols-[3fr_1fr] md:gap-36 md:px-16 md:py-6 md:pl-10 md:pr-4 lg:gap-10 lg:px-[70px] lg:pl-16">
      <div className="flex w-max items-center gap-3 rounded-lg bg-[#FDFDFD] px-4 py-2 lg:w-full">
        <FontAwesomeIcon icon={faSearch} className="text-[#475367]" />
        <input
          type="text"
          placeholder=" What do you want to learn?"
          className="w-36 rounded-none border-none bg-transparent text-[#667185] md:w-full"
        />
      </div>
      <div className="flex items-center gap-3 justify-self-end md:gap-4 lg:gap-6">
        <div className="flex items-center gap-4">
          <p className="hidden text-sm text-[#667185] md:block md:text-nowrap">
            View all Courses
          </p>

          <Link to={"/dashboard/notification"} className="text-xl">
            <FaRegBell />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute right-0 top-0 z-10 h-2 w-2 rounded-full bg-[#008000] md:h-3 md:w-3"></div>
          <Avatar className="h-8 w-8 md:h-10 md:w-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-primary-color-100 text-sm text-primary-color-600 md:text-lg">
              CN
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav;
