
import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const getStudentsReviews = async (courseId) =>
  await axios.get(`${STUDENT_BASE_URL}/courses/${courseId}/reviews`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

export const useFetchStudentsReviews = (courseId) =>
  useQuery({
    queryKey: ["fetch-students-reviews", courseId],
    queryFn: () => getStudentsReviews(courseId),
  });
