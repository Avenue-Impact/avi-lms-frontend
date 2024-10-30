import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useCourseManagementInfo } from "@/hooks/useCourseManagementInfo";

import CourseManagementPage from "../CourseManagementPage";
import CourseType from "../CourseType";

import PublishPage from "./PublishPage";
import CohortCourseSection from "./CohortCourseSection";

import OnDemandCourseSection from "./OnDemand-section";

const tab = [
  "Course Management",
  "Course Type",
  "Cohort Course Sections",
  "On-Demand Course Sections",
  "Publish",
];

export default function CourseCreationPage() {
  const { activeTab } = useCourseManagementInfo();

  return (
    <div className="mx-auto max-w-6xl p-4">
      {/* Tabs and Buttons */}
      <div className="mt-11 flex gap-6">
        {tab.map((label, index) => (
          <span
            key={index}
            className={`flex items-center text-sm font-medium ${activeTab === index + 1 ? "text-[#CC1747]" : "text-[#98A2B3] hover:text-gray-800"}`}
          >
            <span
              className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full border border-[#98A2B3] ${activeTab === index + 1 && "border-transparent bg-[#CC1747] text-white"} ${activeTab > index + 1 && "border-transparent bg-[#98A2B3] text-white"}`}
            >
              {index + 1}
            </span>
            {label}
            <FontAwesomeIcon
              icon={faAngleRight}
              className={`ml-2 ${activeTab === index + 1 ? "text-[#CC1747]" : "text-[#98A2B3]"}`}
            />
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4">
        {activeTab === 1 && <CourseManagementPage />}

        {activeTab === 2 && <CourseType />}

        {activeTab === 3 && <CohortCourseSection />}

        {/* {activeTab === 3 && <CourseCohortPreview />} */}

        {activeTab === 4 && <OnDemandCourseSection />}

        {activeTab === 5 && <PublishPage />}
      </div>
    </div>
  );
}
