import CohortSelection from "@/Components/admindashboard/course-management/courses/CohortSelection";
import BorderCard from "@/Components/BorderCard";
import Error from "@/Components/Error";
import { CommonButton } from "@/Components/ui/button";
import { useCreateSingleCohort } from "@/hooks/course-management/use-create-single-cohorts";
import { useGetAllCohorts } from "@/hooks/course-management/use-fetch-all-cohorts";
import { cohorts } from "@/lib/cohorts";
import { cn } from "@/lib/utils";
import DashButton from "@/pages/auth/ButtonDash";

import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

import { Link, useParams, useSearchParams } from "react-router-dom";

import { ClipLoader } from "react-spinners";
// import AllCohorts from "./AllCohorts";

// const cohorts = [
//   {
//     id: "01",
//     month: "May Cohort",
//     year: "2024",
//     created: "Created: 01/02/2023",
//   },
//   {
//     id: "01",
//     month: "April Cohort",
//     year: "2024",
//     created: "Created: 01/02/2023",
//   },
//   {
//     id: "01",
//     month: "October Cohort",
//     year: "2024",
//     created: "Created: 01/02/2023",
//   },
//   {
//     id: "01",
//     month: "January Cohort",
//     year: "2024",
//     created: "Created: 01/02/2023",
//   },
// ];

const CourseCohortsPreview = () => {
  const [cohort, setCohort] = useState("");
  // const [cohortId, setCohortId] = useState("");
  const [cohortErr, setCohortErr] = useState("");

  const { courseId } = useParams();
  const { createSingleCohort, isCreating } = useCreateSingleCohort(courseId);

  const { data, isLoading, error, refetch } = useGetAllCohorts(courseId);
  console.log(error);

  const handleAddCohort = () => {
    if (!cohort) return setCohortErr("Add cohort");
    createSingleCohort({
      data: {
        cohort,
      },
      courseId,
    });
  };

  const formatDate = (date) => {
    const createdAt = new Date(date);
    const locale = navigator.language;

    return new Intl.DateTimeFormat(locale).format(createdAt);
  };

  const [queryString] = useSearchParams();

  return (
    <div>
      {/* Live Session + Mentoring */}
      <BorderCard className="mb-4 mt-5 grid grid-cols-[1fr_2fr]">
        <div className="mt-10">
          <h3 className="text-[20px] font-[500] text-[#344054] lg:text-[24px]">
            Live Session + Mentoring
          </h3>
          {/* <p>Add Course Cohort</p> */}

          {/* <div className="w-full pt-3">
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
          </div> */}

          {/* <AllCohorts setCohortId={setCohortId} cohortId={cohortId} /> */}
        </div>

        {isLoading ? (
          <div className="mt-6 h-full w-full">
            <p className="mx-auto w-min text-center">
              <ClipLoader color="#CC1747" />
            </p>
          </div>
        ) : error ? (
          <div className="mt-6 h-full w-full space-y-3">
            <p className="text-center">
              Something Went Wrong::{error?.response?.data?.message ?? ""}
            </p>

            <CommonButton
              className="mx-auto block bg-primary-color-600"
              onClick={refetch}
            >
              {"Retry"}
            </CommonButton>
          </div>
        ) : (
          <div className="w-full max-w-[612px] space-y-4 justify-self-end">
            {data?.data?.data.length === 0 && (
              <p className="italic text-slate-400">No cohorts present... </p>
            )}
            {data?.data?.data?.map((cohort) => (
              <Link
                to={`/admin/course/management/info/${courseId}?title=${queryString.get("title")}&cohort=${cohort.cohort}&cohortId=${cohort.id}`}
                key={cohort.id}
                className="block w-full rounded-lg border px-4 py-6 text-left hover:border-primary-color-600 hover:bg-[#FFEBF0]"
              >
                <span className="mb-3 block text-lg font-semibold text-tertiary-color-700">
                  {`${cohort?.cohort}`}
                </span>
                <span className="block text-xs text-primary-color-600">
                  Created {formatDate(cohort.created_at)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </BorderCard>
    </div>
  );
};

export default CourseCohortsPreview;
