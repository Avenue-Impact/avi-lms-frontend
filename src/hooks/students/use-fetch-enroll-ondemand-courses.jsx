import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchCourse = async () => {
  return axios.get(
    `${STUDENT_BASE_URL}/courses/enrolled/pre-recorded-sessions?page=1`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );
};

export const useFetchEnrolledPreRecordedCourse = () => {
  return useQuery({
    queryKey: ["enrolled-pre-recorded-course"],
    queryFn: fetchCourse,
  });
};
