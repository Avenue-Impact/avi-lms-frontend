import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchViewEnrollCourse = async (courseId, accessType, cohortId) => {
  let url = `${STUDENT_BASE_URL}/courses/enrolled/${courseId}`;
  const params = new URLSearchParams();
  if (accessType) params.append("access_type", accessType);
  if (cohortId) params.append("cohort_id", cohortId);
  const queryString = params.toString();
  if (queryString) url += `?${queryString}`;
    
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
};

export const useViewEnrolledCourse = (courseId, accessType, cohortId) => {
  return useQuery({
    queryKey: ["view-enrolled-course", { courseId, accessType, cohortId }],
    queryFn: () => fetchViewEnrollCourse(courseId, accessType, cohortId),
  });
};
