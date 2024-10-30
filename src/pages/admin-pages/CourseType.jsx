// import { z } from "zod";


import { useCourseManagementInfo } from "@/hooks/useCourseManagementInfo";
import SaveButton from "@/Components/admindashboard/course-management/courses/SaveButton";
import { ScrollRestoration } from "react-router-dom";

import LiveSessionMentoringCourseType from "./course-management/LiveSessionMentoringCourseType";
import OnDemandSessionCourseType from "./course-management/OnDemandSessionCourseType";



const CourseType = () => {
  
  const { setSubTab, subTab, setActiveTab } = useCourseManagementInfo();
  const handleSubTabClick = (subTabIndex) => {
    setSubTab(subTabIndex);
  };


  return (
    <>
      <ScrollRestoration />

      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-2 mt-5 text-[24px] font-[500] text-[#344054]">
          Course Type
        </h2>

        <SaveButton onClick={() => setActiveTab((prev) => prev + 1)}>
          Save and Continue
        </SaveButton>
      </div>

      <div className="mb-4 flex w-max gap-4 border-b border-[#98A2B3]">
        <button
          className={`border-b-2 px-4 py-2 font-[600] ${subTab === 1 ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "border-b-transparent text-[#344054]"} `}
          onClick={() => handleSubTabClick(1)}
        >
          Live session + Mentoring
        </button>

        <button
          className={`border-b-2 px-4 py-2 font-[600] ${subTab === 2 ? "border-b-primary-color-600 text-primary-color-600" : "border-b-transparent text-[#344054]"} `}
          onClick={() => handleSubTabClick(2)}
        >
          On-Demand Session
        </button>

      </div>

        {subTab === 1 && <LiveSessionMentoringCourseType />}

        {subTab === 2 && <OnDemandSessionCourseType />}

    </>
  );
};

export default CourseType;
