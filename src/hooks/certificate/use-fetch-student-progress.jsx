import { useQuery } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";

const fetchStudentProgress = async (enrollmentId) => {
  const { data } = await axiosAdmin.get(
    `/certificates/enrollments/${enrollmentId}/progress`
  );
  return data.data;
};

export const useFetchStudentProgress = (enrollmentId) => {
  return useQuery({
    queryKey: ["fetch-student-progress", enrollmentId],
    queryFn: () => fetchStudentProgress(enrollmentId),
    enabled: !!enrollmentId,
  });
};
