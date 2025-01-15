import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchCourse = async () => {
  return await axios.get(
    `${STUDENT_BASE_URL}/courses/enrolled/live-sessions?page=1`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );
};

export const useFetchEnrolledLiveSessionCourse = () => {
  return useQuery({
    queryKey: ["fetch-enrolled-live-session-course"],
    queryFn: fetchCourse,
  });
};
