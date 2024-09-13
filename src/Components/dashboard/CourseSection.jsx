import { courseSections } from "@/lib/courseSection";

import { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { HiOutlinePencil } from "react-icons/hi";
import { CommonButton } from "../ui/button";
import CourseSectionAccordion from "./CourseSectionAccordion";
import { DocumentContext } from "@/pages/dashboard/ShareDocument";

function CourseSection({ editButton }) {
  const [active, setActive] = useState("1");
  const { setSession, setSectionDetails } = useContext(DocumentContext);

  const changeSession = (courseSection, id) => {
    const { section_title, section } = courseSection;

    setSectionDetails((prevState) => {
      return { ...prevState, topic: section_title, section };
    });

    setActive(id);

    if (section_title.includes("Join Live Sessions")) return setSession("live");

    return setSession("recorded");
  };

  return (
    <div>
      <div
        className={cn(
          editButton ? "mb-4 flex items-center justify-between" : "",
        )}
      >
        <h3
          className={cn(
            editButton
              ? "whitespace-nowrap text-lg font-medium"
              : "hidden text-2xl font-medium capitalize text-black lg:block",
          )}
        >
          Course section
        </h3>
        {editButton && (
          <CommonButton
            variant="outline"
            className="space-x-1 px-[6px] py-2 text-xs text-[#667185]"
          >
            <span className="text-xs">
              <HiOutlinePencil />
            </span>
            <span className="text-sm">Edit section</span>
          </CommonButton>
        )}
      </div>
      <CourseSectionAccordion
        sections={courseSections}
        onClick={changeSession}
        active={active}
      />
    </div>
  );
}

export default CourseSection;
