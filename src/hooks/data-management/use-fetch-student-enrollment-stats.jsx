import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchStudentEnrollmentStats = async (studentId) => {
  return await axios.get(`${BASE_URL}/data/students/${studentId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
};

export const useFetchStudentEnrollmentStats = (studentId) => {
  return useQuery({
    queryKey: ["fetch-student-enrollment-stats", studentId],
    queryFn: () => fetchStudentEnrollmentStats(studentId),
  });
};
