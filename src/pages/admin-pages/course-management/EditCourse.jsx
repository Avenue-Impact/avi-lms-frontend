import React, { useState } from "react";
import StudentManagement from "../StudentManagement";
import CourseInformation from "@/Components/admindashboard/course-management/CourseInformation";
import ShareDocument from "@/pages/dashboard/ShareDocument";

const EditCourse = () => {
  const [activeSection, setActiveSection] = useState("courseInfo");

  return (
    <div>
      <div className="mb-8 mt-16 flex items-center justify-between">
        <p className="font-[500] text-[#344054] lg:text-[18px] 2xl:text-[24px]">
          Project Consultant Training Programme (Bundle)
        </p>

        <div>
          <button
            onClick={() => setActiveSection("courseInfo")}
            className={`px-4 py-2 text-sm font-medium ${activeSection === "courseInfo" ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "text-[#344054] hover:text-gray-800"}`}
          >
            Course Information
          </button>
          <button
            onClick={() => setActiveSection("courseSection")}
            className={`px-4 py-2 text-sm font-medium ${activeSection === "courseSection" ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "text-[#344054] hover:text-gray-800"}`}
          >
            Course Sections
          </button>
          <button
            onClick={() => setActiveSection("studentManagement")}
            className={`px-4 py-2 text-sm font-medium ${activeSection === "studentManagement" ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "text-[#344054] hover:text-gray-800"}`}
          >
            Student Management
          </button>
        </div>
      </div>

      <div>
        {activeSection === "courseInfo" && <CourseInformation />}

        {activeSection === "courseSection" && (
          <ShareDocument editButton={true} />
        )}

        {activeSection === "studentManagement" && (
          <div>
            <StudentManagement />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCourse;
