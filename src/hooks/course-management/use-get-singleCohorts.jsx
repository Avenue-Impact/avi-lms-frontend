import { getSingleCohort } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleCohort = (courseId, cohortId) => {
  return useQuery({
    queryKey: ["get-single-cohort", { courseId, cohortId }],
    queryFn: () => getSingleCohort(courseId, cohortId),
    // enabled: !!cohortId,
  });
};
