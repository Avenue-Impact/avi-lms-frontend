import { useQuery } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";

const fetchMe = async () => {
  const { data } = await axiosAdmin.get("/me");
  return data?.data;
};

export const useInstructorAuth = () => {
  return useQuery({
    queryKey: ["instructor-me"],
    queryFn: fetchMe,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
