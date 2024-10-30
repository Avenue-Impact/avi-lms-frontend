import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

import SaveButton from "@/Components/admindashboard/course-management/courses/SaveButton";
import { ScrollRestoration } from "react-router-dom";

import CohortSelection from "@/Components/admindashboard/course-management/courses/CohortSelection";
import { CommonButton } from "@/Components/ui/button";

import { ClipLoader } from "react-spinners";

import { cohorts } from "@/lib/cohorts";
import { cn } from "@/lib/utils";
import DashButton from "../../auth/ButtonDash";
import { useCreateSingleCohort } from "@/hooks/course-management/use-create-single-cohorts";
import AllCohorts from "./AllCohorts";

const CourseCohortPreview = ({ setSection }) => {
  const [cohort, setCohort] = useState("");
  const [cohortId, setCohortId] = useState("");
  const [cohortErr, setCohortErr] = useState("");

  const { createSingleCohort, isCreating } = useCreateSingleCohort();

  const handleAddCohort = () => {
    if (!cohort) return setCohortErr("Add cohort");
    createSingleCohort({
      cohort,
    });
  };

  const handleNext = () => {
    if (!cohortId) return;
    console.log(cohortId);

    setSection("live or recorded");
    localStorage.setItem("section", "live or recorded");
    localStorage.setItem("cohortId", cohortId);
  };

  return (
    <>
      <ScrollRestoration />

      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-2 mt-5 text-[24px] font-[500] text-[#344054]">
          Course Cohort
        </h2>

        <SaveButton onClick={handleNext}>Save and Continue</SaveButton>
      </div>

      <div className="mb-4 mt-5 grid grid-cols-12 items-start gap-10 rounded border border-gray-300 p-10 md:mb-0">
        <div className="col-span-5">
          <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
            Live session + Mentoring
          </h3>
          <p>
            Add Course Original Price, Discounted Price, Cohort, and Duration
          </p>

          <div className="w-full pt-3">
            <CohortSelection
              data={cohorts}
              setCohort={setCohort}
              text={"Select cohort"}
            />
            <div>
              <span
                className={cn("text-primary-color-600", cohort && "hidden")}
              >
                {cohortErr}
              </span>
              {cohort && (
                <p className="mt-5 flex items-center gap-2 capitalize text-primary-color-600">
                  <span>
                    <FaCheck />
                  </span>
                  <span>{cohort} </span>
                </p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <DashButton
              onClick={handleAddCohort}
              disabled={isCreating}
              className="text-white"
            >
              {isCreating ? (
                <ClipLoader size={20} color={"#fff"} />
              ) : (
                "Add cohort"
              )}
            </DashButton>
          </div>
        </div>
        <AllCohorts setCohortId={setCohortId} cohortId={cohortId} />
      </div>

      <div className="flex items-center justify-end pt-10">
        <CommonButton
          className="min-w-32 rounded bg-primary-color-600"
          disabled={isCreating}
          onClick={handleNext}
        >
          Save & Continue
        </CommonButton>
      </div>
    </>
  );
};

export default CourseCohortPreview;
