import LiveSessionMentoringCourseType from "@/pages/admin-pages/course-management/LiveSessionMentoringCourseType";
import OnDemandSessionCourseType from "@/pages/admin-pages/course-management/OnDemandSessionCourseType";
import React, { useState } from "react";
import SaveButton from "../SaveButton";
import EditLiveSessionCourseType from "./EditLiveSessionCourseType";
import EditOnDemandSessionCourseType from "./EditOnDemandSessionCourseType";

const EditCourseType = ({ data, setModalOpen }) => {
  const [tab, setTab] = useState(1);

  return (
    <div className="h-full w-full max-w-[900px]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-2 mt-5 text-[24px] font-[500] text-[#344054]">
          Course Type
        </h2>
      </div>

      <div className="mb-4 flex gap-4 border-b border-[#98A2B3]">
        <button
          className={`border-b-2 px-4 py-2 font-[600] ${tab === 1 ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "border-b-transparent text-[#344054]"} `}
          onClick={() => setTab(1)}
        >
          Live session + Mentoring
        </button>

        <button
          className={`border-b-2 px-4 py-2 font-[600] ${tab === 2 ? "border-b-primary-color-600 text-primary-color-600" : "border-b-transparent text-[#344054]"} `}
          onClick={() => setTab(2)}
        >
          On-Demand Session
        </button>
      </div>

      {tab === 1 && (
        <EditLiveSessionCourseType
          priceInfo={data.data.data.course.live_class_price}
          cohorts={data.data.data.course.cohorts}
          setModalOpen={setModalOpen}
        />
      )}

      {tab === 2 && (
        <EditOnDemandSessionCourseType
          dataToEdit={data.data.data.course.pre_recorded_price}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  );
};

export default EditCourseType;
