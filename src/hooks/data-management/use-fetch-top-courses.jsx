import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchTopCourse = async () =>
  await axiosAdmin.get("/data/top-courses");

export const useFetchTopCourses = () =>
  useQuery({
    queryKey: ["fetch-top-courses"],
    queryFn: fetchTopCourse,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
