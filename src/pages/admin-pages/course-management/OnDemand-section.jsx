import { CommonButton } from "@/Components/ui/button";

// import { useCourseManagementInfo } from "@/hooks/useCourseManagementInfo";
import { ScrollRestoration } from "react-router-dom";

import { useCourseManagementInfo } from "@/hooks/useCourseManagementInfo";

import OnDemandRecordedSection from "@/Components/admindashboard/course-management/on-demand-section/OnDemandRecordedSection";
import CreateOndemandForm from "@/Components/admindashboard/course-management/on-demand-section/CreateOnDemandForm";

function OnDemandCourseSection() {
  const { setActiveTab } = useCourseManagementInfo();
  const courseId = localStorage.getItem("courseId");

  return (
    <>
      <ScrollRestoration />

      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-2 mt-5 text-[24px] font-[500] text-[#344054]">
          On-Demand Course Sections
        </h2>

        <button className="flex items-center rounded border border-[#667185] bg-transparent px-4 py-2 text-[#667185] hover:bg-[#f0f0f0]">
          Preview
        </button>
      </div>
      <main className="grid grid-cols-[3fr_1fr] gap-10 rounded-[10px] border-2 border-[#F0F2F5] p-12 pr-6">
        <div>
          <CreateOndemandForm courseId={courseId} />
        </div>
        <div className="overflow-y-hidden">
          <OnDemandRecordedSection courseId={courseId} />
        </div>
      </main>

      <div className="my-6 flex items-center justify-between gap-6">
        <CommonButton
          onClick={() => setActiveTab((prev) => prev - 1)}
          className="ml-auto bg-gray-500 text-white hover:bg-gray-700"
        >
          Back
        </CommonButton>

        <CommonButton
          className="block bg-primary-color-600 font-normal"
          onClick={() => setActiveTab((prev) => prev + 1)}
        >
          Save and Continue
        </CommonButton>
      </div>
    </>
  );
}

export default OnDemandCourseSection;
