import { fetchDemandCourse } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
export const useFetchondemandCourse = (courseId) => {
  return useQuery({
    queryKey: ["get-demand-course", { courseId }],
    queryFn: () => fetchDemandCourse(courseId),
  });
};
