import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchViewEnrollCourse = async (courseId, accessType) => {
  const url = accessType 
    ? `${STUDENT_BASE_URL}/courses/enrolled/${courseId}?access_type=${accessType}`
    : `${STUDENT_BASE_URL}/courses/enrolled/${courseId}`;
    
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
};

export const useViewEnrolledCourse = (courseId, accessType) => {
  return useQuery({
    queryKey: ["view-enrolled-course", { courseId, accessType }],
    queryFn: () => fetchViewEnrollCourse(courseId, accessType),
  });
};
