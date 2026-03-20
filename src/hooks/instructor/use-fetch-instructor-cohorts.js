import { useQuery } from "@tanstack/react-query";
import { axiosInstructor } from "@/services/api";

const fetchCohorts = async () => {
  const { data } = await axiosInstructor.get("/cohorts");
  return data;
};

export const useFetchInstructorCohorts = () => {
  return useQuery({
    queryKey: ["instructor-cohorts"],
    queryFn: fetchCohorts,
  });
};
