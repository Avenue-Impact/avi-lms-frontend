import { fetchCohorts } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCohorts = () => {
  const { data: cohorts, isLoading: isFetching } = useQuery({
    queryKey: ["get-cohorts"],
    queryFn: fetchCohorts,
  });

  return {
    cohorts,
    isFetching,
  };
};
