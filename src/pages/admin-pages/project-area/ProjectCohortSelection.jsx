import { CommonButton } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { FaArrowLeft } from "react-icons/fa6";

function ProjectCohortSelection({
  setModal,
  onClick,
  cohorts,
  selectedCourse,
  selectedCohort,
  setSelectedCohort,
}) {
  console.log(selectedCohort);

  const handleSelectCohort = (id) => {
    const selectedCohort = cohorts.find((cohort) => cohort.id === id);
    setSelectedCohort((prev) => ({
      ...prev,
      cohort: selectedCohort.cohort,
      cohortId: selectedCohort.id,
    }));
  };

  return (
    <section>
      <div className="flex items-start gap-2">
        <button
          onClick={() => {
            setSelectedCohort((prev) => {
              return {
                ...prev,
                cohort: "",
                cohortId: "",
              };
            });
            setModal((prev) => !prev);
          }}
          className="rounded-sm border border-[#E4E7EC] px-[9px] py-[7.7px]"
          aria-label="back button"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-bold text-[#101928]">
          {selectedCourse.title}
          {/* Project Consultant Training Programme (Bundle) */}
        </h2>
      </div>
      <p className="mb-6 mt-3 text-[#667185]">
        Select a cohort for this project area
      </p>
      <div>
        {cohorts.length > 0 && (
          <p className="text-sm font-medium text-[#475367]">Select cohort: </p>
        )}
        <div>
          {cohorts.length > 0 ? (
            <Select
              className="w-full"
              onValueChange={(value) => handleSelectCohort(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a cohort" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cohorts</SelectLabel>
                  {cohorts.map((cohort, i) => (
                    <SelectItem key={i} value={cohort.id}>
                      {cohort.cohort}{" "}
                      {/* Assuming 'time' is a property in your cohort data */}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <p className="italic text-slate-400">No cohort for this course</p>
          )}
        </div>
      </div>
      <CommonButton
        className="ml-auto mt-6 block w-28 bg-primary-color-600"
        onClick={onClick}
        disabled={!selectedCohort.cohort}
      >
        Next
      </CommonButton>
    </section>
  );
}

export default ProjectCohortSelection;
