import { FaHeart, FaLongArrowAltLeft, FaRegHeart } from "react-icons/fa";
import { TiGroupOutline } from "react-icons/ti";
import { LiaTrophySolid } from "react-icons/lia";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const OtherTopNav = ({ setShowModal }) => {
  const handleModal = () => setShowModal((prev) => !prev);
  const location = useLocation();
  return (
    <nav className="flex gap-[97px] px-3 py-[25px] md:px-5">
      <div className="flex w-full items-center justify-between gap-1 md:gap-6 lg:w-max lg:justify-normal">
        <button type="button" className="flex items-center gap-1">
          <span className="flex items-center justify-center rounded-sm border-[#E4E7EC] text-base text-black md:h-6 md:w-6 md:border md:text-[10px]">
            <FaLongArrowAltLeft />
          </span>
          <span className="hidden text-sm capitalize text-[#667185] md:block">
            go back
          </span>
        </button>
        <p className="text-sm font-medium text-black lg:text-lg 2xl:text-2xl">
          Project Consultant Training Programme (Bundle)
        </p>
      </div>
      <div className="hidden lg:block">
        <ul className="flex items-center gap-3 *:text-nowrap">
          <li
            className={cn(
              "after:contents-[''] relative cursor-pointer capitalize text-tertiary-color-700 transition-colors duration-300 ease-linear after:absolute after:-bottom-2 after:left-0 after:block after:h-px after:w-0 after:bg-[#CC1747] hover:text-primary-color-600 hover:after:w-full",
              location.pathname === "/dashboard/projects"
                ? "text-primary-color-600 after:w-full"
                : "",
            )}
          >
            <Link
              to={"/dashboard/projects"}
              className="flex gap-2 2xl:gap-[13px]"
            >
              <span className="text-[22px]">
                <TiGroupOutline />
              </span>
              <span className="text-sm">project area</span>
            </Link>
          </li>
          <li
            className={cn(
              "after:contents-[''] relative cursor-pointer capitalize text-tertiary-color-700 transition-colors duration-300 ease-linear after:absolute after:-bottom-2 after:left-0 after:block after:h-px after:w-0 after:bg-[#CC1747] hover:text-primary-color-600 hover:after:w-full",
              location.pathname === "/dashboard/certificate"
                ? "text-primary-color-600 after:w-full"
                : "",
            )}
          >
            <Link
              to={"/dashboard/certificate"}
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
            <span className="text-sm">leave a rating</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default OtherTopNav;
