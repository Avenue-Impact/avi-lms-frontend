import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchCourseProgress = async (courseId) =>
  await axios.get(
    `${STUDENT_BASE_URL}/courses/enrolled/${courseId}/progress`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );

export const useCourseProgress = (courseId) =>
  useQuery({
    queryKey: ["course-progress", courseId],
    queryFn: () => fetchCourseProgress(courseId),
    enabled: !!courseId,
  });
