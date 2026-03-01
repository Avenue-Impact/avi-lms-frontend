import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchStudentAndEnrollment = async () =>
  await axiosAdmin.get("/data/students-and-enrollments");

export const useFetchStudentAndEnrollment = () => {
  return useQuery({
    queryKey: ["fetch-student-and-enrollment"],
    queryFn: fetchStudentAndEnrollment,
  });
};
