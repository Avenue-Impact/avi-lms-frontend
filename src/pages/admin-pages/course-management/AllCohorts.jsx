import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/format-date";

import { ClipLoader } from "react-spinners";
import { fetchCohorts } from "@/services/api";
import { cn } from "@/lib/utils";
import { useState } from "react";

const AllCohorts = ({ setCohortId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-cohorts"],
    queryFn: fetchCohorts,
  });

  const [active, setActive] = useState("");

  return (
    <>
      {isLoading ? (
        <ClipLoader size={20} color={"#CC1747"} />
      ) : (
        <div className="col-span-7 space-y-3">
          {data?.data.data.map((cohortItem) => (
            <button
              onClick={() => {
                setActive(cohortItem.id);
                setCohortId(cohortItem.id);
                localStorage.setItem("cohorts", cohortItem.cohort);
              }}
              key={cohortItem.id}
              className={cn(
                "w-full rounded-lg border px-4 py-6 text-left hover:border-primary-color-600 hover:bg-[#FFEBF0]",
                active === cohortItem.id
                  ? "border-primary-color-600 bg-[#FFEBF0]"
                  : "",
              )}
            >
              <span className="mb-3 block text-lg font-semibold text-tertiary-color-700">
                {cohortItem.cohort}
              </span>
              <span className="block text-xs text-primary-color-600">
                {formatDate(cohortItem.created_at)}
              </span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default AllCohorts;
