import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchCourseStats = async (page, perPage) => {
  return await axiosAdmin.get(`/data/courses?page=${page}&perPage=${perPage}`);
};

export const useFetchCourseStats = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ["fetch-stats-courses", page, perPage],
    queryFn: () => fetchCourseStats(page, perPage),
    staleTime: 60 * 1000, // 1 minute
  });
};
