import { useQuery } from "@tanstack/react-query";
import { axiosInstructor } from "@/services/api";

const fetchCohortStudents = async (cohortId) => {
  const { data } = await axiosInstructor.get(`/cohorts/${cohortId}/students`);
  return data;
};

export const useFetchCohortStudents = (cohortId) => {
  return useQuery({
    queryKey: ["cohort-students", cohortId],
    queryFn: () => fetchCohortStudents(cohortId),
    enabled: !!cohortId,
  });
};
