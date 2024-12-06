import { useNavigate } from "react-router-dom";

import { GroupIcon } from "@/Components/Icon";
import { LayoutDashboard } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";

function ProjectAreaTools({
  setModalTab,
  setModal,

  selectedCourse,
  selectedCohort,
}) {
  const navigate = useNavigate();
  const handleSelect = (path) => {
    navigate(path);
    setModal((prev) => !prev);
  };

  return (
    <section>
      <div className="flex items-start gap-2">
        <button
          onClick={() => setModalTab("cohort")}
          className="rounded-sm border border-[#E4E7EC] px-[9px] py-[7.7px]"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-bold text-[#101928]">
          {/* Project Area and Tools & resources */}
          {selectedCourse.title}
          {/* {id} */}
        </h2>
      </div>
      <p className="mb-6 mt-3 text-[#667185]">
        Create a project area and tools & resources for students to enhance
        their learning and improve on real-life projects.
      </p>
      <div className="space-y-5">
        <div
          className="group w-full max-w-[400px] cursor-pointer rounded-lg bg-[#D0D5DD] px-6 py-12 transition-all duration-200 ease-linear hover:bg-primary-color-600"
          onClick={() =>
            handleSelect(
              `/admin/project-area/${selectedCourse.id}/general?courseTitle=${selectedCourse.title}&cohortId=${selectedCohort.cohortId}&cohort=${selectedCohort.cohort}`,
            )
          }
        >
          <div className="flex items-start gap-[10px]">
            <span className="block w-fit rounded-[5.5px] bg-white p-[11.2px] duration-200 group-hover:bg-[#FFEBF0]">
              <LayoutDashboard className="h-[24px] w-[24px] stroke-[#DDDDFF] duration-200 group-hover:stroke-primary-color-600" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-white">General</h3>
              <p className="mt-[6px] w-full max-w-[283px] font-medium leading-[20.3px] text-white">
                View and manage General content in the course project area and
                tools & resources
              </p>
            </div>
          </div>
        </div>
        <div
          className="group w-full max-w-[400px] cursor-pointer rounded-lg bg-[#D0D5DD] px-6 py-12 transition-all duration-200 ease-linear hover:bg-primary-color-600"
          onClick={() =>
            handleSelect(
              `/admin/project-area/${selectedCourse.id}/group/?courseTitle=${selectedCourse.title}&cohortId=${selectedCohort.cohortId}&cohort=${selectedCohort.cohort}`,
            )
          }
        >
          <div className="flex items-start gap-[10px]">
            <span className="block w-fit rounded-[5.5px] bg-white p-[11.2px] duration-200 group-hover:bg-[#FFEBF0]">
              <GroupIcon
                className={
                  "w-[24px] *:fill-[#DDDDFF] group-hover:*:fill-primary-color-600"
                }
              />
            </span>
            <div>
              <h3 className="text-xl font-bold text-white">Groups</h3>
              <p className="mt-[6px] w-full max-w-[283px] font-medium leading-[20.3px] text-white">
                View and manage General content in the course project area and
                tools & resources
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectAreaTools;
