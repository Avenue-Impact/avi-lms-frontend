import SaveButton from "@/Components/admindashboard/course-management/courses/SaveButton";
import { ScrollRestoration } from "react-router-dom";
import LiveSession from "./LiveSession";
import RecordedSession from "./RecordedSession";
import { useCourseManagementInfo } from "@/hooks/useCourseManagementInfo";
import { useQuery } from "@tanstack/react-query";
import LIveOrRecordedSelectionTabs from "./LIveOrRecordedSelectionTabs";
import { useGetSingleCohort } from "@/hooks/course-management/use-get-singleCohorts";

const LiveOrRecordedSelection = () => {
  const { setSubTab, subTab, setActiveTab } = useCourseManagementInfo();
  const handleSubTabClick = (subTabIndex) => {
    setSubTab(subTabIndex);
  };
  const courseId = localStorage.getItem("courseId");
  const cohortId = localStorage.getItem("cohortId");

  const { data, isLoading } = useGetSingleCohort(courseId, cohortId);

  return (
    <div>
      <ScrollRestoration />

      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-2 mt-5 text-[24px] font-[500] text-[#344054]">
          Course Sections{" "}
          {isLoading
            ? "Loading..."
            : `(${data?.data?.data.cohort ?? "Proceed to the next page"})`}
        </h2>
        <SaveButton onClick={() => setActiveTab((prev) => prev + 1)}>
          Save and Continue
        </SaveButton>
      </div>

      <LIveOrRecordedSelectionTabs tab={subTab} setTab={setSubTab} />

      {/* <div className="mb-4 flex w-max gap-4 border-b border-[#98A2B3]">
        <button
          className={`border-b-2 px-4 py-2 font-[600] ${subTab === 1 ? "border-b-2 border-[#CC1747] text-[#CC1747]" : "border-b-transparent text-[#344054]"} `}
          onClick={() => handleSubTabClick(1)}
        >
          Live Session
        </button>

        <button
          className={`border-b-2 px-4 py-2 font-[600] ${subTab === 2 ? "border-b-primary-color-600 text-primary-color-600" : "border-b-transparent text-[#344054]"} `}
          onClick={() => handleSubTabClick(2)}
        >
          Recorded
        </button>
      </div>

      {subTab === 1 && <LiveSession />}

      {subTab === 2 && <RecordedSession />} */}
    </div>
  );
};

export default LiveOrRecordedSelection;
