import { useState } from "react";

import CourseManagementSection from "@/Components/admindashboard/course-management/courses/CourseManagementSection";
import StudentManagement from "@/Components/admindashboard/course-management/courses/StudentManagement";
import LinkList from "@/Components/LinkList";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

function CourseInfomation() {
  const [queryString] = useSearchParams();
  const navigate = useNavigate();
  const [active, setActive] = useState("course-section");

  const month = queryString.get("month");
  const year = queryString.get("year");
  return (
    <div className="mt-12">
      <header className="flex items-center justify-between">
        <div className="flex w-full items-center justify-between gap-1 md:gap-6 lg:w-max lg:justify-normal">
          <button
            onClick={() => {
              navigate(-1);
            }}
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
          <p className="text-xl font-medium text-black lg:text-2xl 2xl:text-2xl">
            {month} {year}
          </p>
        </div>
        <ul className="flex items-center gap-4 *:capitalize">
          <LinkList
            className={"text-sm font-medium"}
            onClick={() => setActive("course-section")}
            active={active === "course-section"}
          >
            course sections
          </LinkList>
          <LinkList
            className={"text-sm font-medium"}
            onClick={() => setActive("course-management")}
            active={active === "course-management"}
          >
            student management
          </LinkList>
        </ul>
      </header>
      {active === "course-section" && <CourseManagementSection />}
      {active === "course-management" && <StudentManagement />}
    </div>
  );
}

export default CourseInfomation;
