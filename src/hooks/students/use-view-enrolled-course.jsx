import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchViewEnrollCourse = async (courseId) => {
  return await axios.get(`${STUDENT_BASE_URL}/courses/enrolled/${courseId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
};

export const useViewEnrolledCourse = (courseId) => {
  return useQuery({
    queryKey: ["view-enrolled-course", { courseId }],
    queryFn: () => fetchViewEnrollCourse(courseId),
  });
};
