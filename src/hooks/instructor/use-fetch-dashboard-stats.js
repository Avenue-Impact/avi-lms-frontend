import { useQuery } from "@tanstack/react-query";
import { axiosInstructor } from "@/services/api";

const fetchDashboardStats = async () => {
  const { data } = await axiosInstructor.get("/dashboard-stats");
  return data;
};

export const useFetchDashboardStats = () => {
  return useQuery({
    queryKey: ["instructor-dashboard-stats"],
    queryFn: fetchDashboardStats,
  });
};
