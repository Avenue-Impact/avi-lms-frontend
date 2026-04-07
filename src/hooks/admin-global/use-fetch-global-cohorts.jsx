import { useQuery } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";
import { cohorts as staticCohorts } from "@/lib/cohorts";

export const useFetchGlobalCohorts = () => {
  return useQuery({
    queryKey: ["global-cohorts"],
    queryFn: async () => {
      try {
        const response = await axiosAdmin.get("/data/global-cohorts");
        const dbCohorts = response.data?.data || [];
        
        const transformedDbCohorts = dbCohorts.map((cohort) => ({
          id: cohort._id, 
          month: cohort.month,
          year: cohort.year,
        }));

        return [...staticCohorts, ...transformedDbCohorts];
      } catch (error) {
        console.error("Error fetching global cohorts:", error);
        return staticCohorts;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
