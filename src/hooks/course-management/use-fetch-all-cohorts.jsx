import { fetchCohorts } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCohorts = (courseId) => {
  return useQuery({
    queryKey: ["get-cohorts", courseId],
    queryFn: () => fetchCohorts(courseId),
  });
};
