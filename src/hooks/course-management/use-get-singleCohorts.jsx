import { getSingleCohort } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleCohort = () => {
  const { data: cohortData } = useQuery({
    queryKey: ["get-single-cohort"],
    queryFn: getSingleCohort,
  });

  return {
    cohortData,
  };
};
