import { useState } from "react";
import LinkList from "@/Components/LinkList";
import OndemandSection from "./OndemandSection";
import StudentManagement from "@/Components/admindashboard/course-management/courses/StudentManagement";

function OnDemand() {
  const [active, setActive] = useState("course-section");

  return (
    <>
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
          onClick={() => setActive("student-management")}
          active={active === "student-management"}
        >
          student management
        </LinkList>
      </ul>
      {active === "course-section" && <OndemandSection />}
      {active === "student-management" && <StudentManagement />}
    </>
  );
}

export default OnDemand;
