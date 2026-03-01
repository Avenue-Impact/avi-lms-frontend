import { useCourseData } from "@/hooks/use-course-data";
import { cn } from "@/lib/utils";
import { FaLongArrowAltLeft, FaRegHeart } from "react-icons/fa";
import { LiaTrophySolid } from "react-icons/lia";
import { TiGroupOutline } from "react-icons/ti";
import { BsGrid } from "react-icons/bs";
import { useViewCourseSections } from "@/hooks/students/use-course-secion-view";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const OtherTopNav = ({ setShowModal, setIsQuestionDrawerOpen }) => {
  const [queryString] = useSearchParams();
  const { courseId } = useParams();

  const { data } = useCourseData();

  const cohortId = data?.data?.data?.cohort_id ?? "";

  const handleModal = () => setShowModal((prev) => !prev);
  const { setSections } = useViewCourseSections();
  // const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
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
        </div>
      </div>
      <div className="hidden lg:block">
        <ul className="flex items-center gap-3 *:text-nowrap">
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
