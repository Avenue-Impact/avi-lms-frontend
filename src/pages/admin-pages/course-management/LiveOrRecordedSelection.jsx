import SaveButton from "@/Components/admindashboard/course-management/courses/SaveButton";
import { useGetSingleCohort } from "@/hooks/course-management/use-get-singleCohorts";
import { useCourseManagementInfo } from "@/hooks/useCourseManagementInfo";
import { ScrollRestoration } from "react-router-dom";
import LIveOrRecordedSelectionTabs from "./LIveOrRecordedSelectionTabs";

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
    </div>
  );
};

export default LiveOrRecordedSelection;
