import { useQuery } from "@tanstack/react-query";
import { axiosInstructor } from "@/services/api";

const fetchRecentSubmissions = async () => {
  const { data } = await axiosInstructor.get("/recent-submissions");
  return data;
};

export const useFetchRecentSubmissions = () => {
  return useQuery({
    queryKey: ["instructor-recent-submissions"],
    queryFn: fetchRecentSubmissions,
  });
};
