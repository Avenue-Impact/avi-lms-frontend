import { useQuery } from "@tanstack/react-query";
import { axiosStudent } from "@/services/api";

const fetchActiveAssignments = async (page, limit, courseId) => {
  const params = { page, limit };
  if (courseId) params.courseId = courseId;
  const { data } = await axiosStudent.get("/assignments/active", { params });
  return data;
};

/**
 * Hook to fetch paginated active assignments for the student, optionally filtered by courseId.
 */
export const useActiveAssignments = (page = 1, limit = 10, courseId = "") => {
  return useQuery({
    queryKey: ["active-assignments", page, limit, courseId],
    queryFn: () => fetchActiveAssignments(page, limit, courseId),
    staleTime: 5 * 60 * 1000,
  });
};
