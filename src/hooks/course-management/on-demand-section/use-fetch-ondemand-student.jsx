import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";

const fetchEnrollStudents = async (courseId) => {
  return await axiosAdmin.get(
    `/courses/${courseId}/on-demand-section/enrolled-students`,
  );
};

export const useFetchOndemandStudent = (courseId) => {
  return useQuery({
    queryKey: ["get-ondemand-student", { courseId }],
    queryFn: () => fetchEnrollStudents(courseId),
  });
};
