import { useQuery } from "@tanstack/react-query";
import { axiosInstructor } from "@/services/api";

const fetchMe = async () => {
  const { data } = await axiosInstructor.get("/me");
  return data?.data;
};

export const useInstructorAuth = (options = {}) => {
  return useQuery({
    queryKey: ["instructor-me"],
    queryFn: fetchMe,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    ...options,
  });
};
