import { fetchCourseInformation } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchCourseInfo = (courseId) =>
  useQuery({
    queryFn: () => fetchCourseInformation(courseId),
    queryKey: ["get-course-info", courseId],
  });
