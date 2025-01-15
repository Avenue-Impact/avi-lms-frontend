import { useState } from "react";

import CourseInformation from "@/Components/admindashboard/course-management/CourseInformation";
import CourseCohortsPreview from "./CourseCohortsPreview";
import OnDemand from "./OnDemand";
import { useParams, useSearchParams } from "react-router-dom";
import { CommonButton } from "@/Components/ui/button";
import { useUnpublishCourse } from "@/hooks/course-management/use-unpublish-course";
// import { IoSearch } from "react-icons/io5";
// import BorderCard from "@/Components/BorderCard";
// import Modal from "@/pages/auth/components/Modal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClose, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
// import { Heading, Paragraph } from "@/pages/auth/components/Text";

const EditCourse = () => {
  // const [modal, setModal] = useState(false);
  const [activeSection, setActiveSection] = useState("courseInfo");

  const [queryString] = useSearchParams();
  const title = queryString.get("title");

  // const [searchParams] = useSearchParams();
  // const courseId = searchParams.get("id");

  const { courseId } = useParams();
  // console.log("courseId", courseId);

  const { unPublish, isUnPublishing } = useUnpublishCourse();
  console.log("unPublish function:", unPublish);
  console.log("isUnPublishing state:", isUnPublishing);



  const handleUnpublish = () => {
    if (!courseId) {
      console.error("Course ID is missing.");
      return;
    }
    unPublish({ courseId });
  };

  return (
    <div>
      <div className="mb-8 mt-16 flex items-center justify-between">
        <p className="font-[500] text-[#344054] lg:text-[18px] 2xl:text-[24px]">
          {title}
        </p>

        <div>
          <button
            onClick={() => setActiveSection("courseInfo")}
            className={`px-4 py-2 text-sm font-medium ${activeSection === "courseInfo" ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "text-[#344054] hover:text-gray-800"}`}
          >
            {" "}
            Course Information
          </button>

          <button
            onClick={() => setActiveSection("courseSection")}
            className={`px-4 py-2 text-sm font-medium ${activeSection === "courseSection" ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "text-[#344054] hover:text-gray-800"}`}
          >
            {" "}
            Course Cohorts
          </button>

          <button
            onClick={() => setActiveSection("onDemandSection")}
            className={`px-4 py-2 text-sm font-medium ${activeSection === "onDemandSection" ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "text-[#344054] hover:text-gray-800"}`}
          >
            {" "}
            On-Demand Section
          </button>

          {/* <button
            onClick={() => setActiveSection("studentManagement")}
            className={`px-4 py-2 text-sm font-medium ${activeSection === "studentManagement" ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "text-[#344054] hover:text-gray-800"}`}
          > Student Management
          </button> */}
        </div>
      </div>

      <div>
        {activeSection === "courseInfo" && <CourseInformation />}

        {activeSection === "courseSection" && <CourseCohortsPreview />}

        {activeSection === "onDemandSection" && <OnDemand />}

        {/* {activeSection === "studentManagement" && (
          <div>
            <StudentManagement />
          </div>
        )} */}
      </div>

      <div className="my-6 flex items-center justify-between gap-6">
        <CommonButton onClick={handleUnpublish} disabled={isUnPublishing}  className="ml-auto border border-gray-500 bg-transparent text-gray-500 hover:bg-gray-300">
          {isUnPublishing ? "Unpublishing..." : "Unpublish"}
        </CommonButton>

        <CommonButton className="block bg-primary-color-600 font-normal">
          Delete Course
        </CommonButton>
      </div>
    </div>
  );
};

export default EditCourse;
