import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchStats = async () =>
  await axiosAdmin.get("/data/courses");

export const useFetchCourseStats = () =>
  useQuery({
    queryKey: ["fetch-course-stats"],
    queryFn: fetchStats,
    staleTime: 60 * 1000, // 1 minute
  });
