import { useParams } from "react-router-dom";
import CreateOndemandForm from "./CreateOnDemandForm";
import OnDemandRecordedSection from "./OnDemandRecordedSection";
import { useState } from "react";
import { CommonButton } from "@/Components/ui/button";

const EditOndemandCourseSectionForm = ({ setEdit, initialSection }) => {
  const { courseId } = useParams();
  const [section, setSection] = useState(null);

  return (
    <div>
      <main className="grid grid-cols-[3fr_1fr] gap-10 rounded-[10px] border-2 border-[#F0F2F5] p-12 pr-6">
        <div>
          <CreateOndemandForm
            courseId={courseId}
            section={section}
            setSection={setSection}
            initialSection={initialSection}
          />
        </div>
        <div className="overflow-y-hidden">
          <OnDemandRecordedSection
            courseId={courseId}
            setSection={setSection}
          />
        </div>
      </main>
      <CommonButton
        className="ml-auto mt-6 block w-max"
        variant={"secondary"}
        onClick={() => {
          setEdit((prev) => !prev);
          localStorage.removeItem("demandSectionNumber");
        }}
      >
        Back
      </CommonButton>
    </div>
  );
};

export default EditOndemandCourseSectionForm;
