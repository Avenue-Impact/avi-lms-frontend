import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchStudentEnrollmentStats = async (studentId) => {
  return await axiosAdmin.get(`/data/students/${studentId}`);
};

export const useFetchStudentEnrollmentStats = (studentId) => {
  return useQuery({
    queryKey: ["fetch-student-enrollment-stats", studentId],
    queryFn: () => fetchStudentEnrollmentStats(studentId),
  });
};
