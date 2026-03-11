import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";

const fetchAllStudent = async (courseId, cohortId) => {
  return await axiosAdmin.get(
    `/courses/${courseId}/cohorts/${cohortId}/enrolled-students`,
  );
};

export const useFetchAllLiveStudents = (courseId, cohortId) => {
  return useQuery({
    queryKey: ["fetch-all-live-student", { courseId, cohortId }],
    queryFn: () => fetchAllStudent(courseId, cohortId),
  });
};
