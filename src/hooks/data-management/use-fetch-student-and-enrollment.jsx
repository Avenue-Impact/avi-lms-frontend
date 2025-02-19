import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
const fetchStudentAndEnrollment = async () =>
  await axios.get(`${BASE_URL}/data/students-and-enrollments`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchStudentAndEnrollment = () => {
  return useQuery({
    queryKey: ["fetch-student-and-enrollment"],
    queryFn: fetchStudentAndEnrollment,
  });
};
