import { useQuery } from "@tanstack/react-query";
import { axiosStudent } from "@/services/api";

const fetchActiveAssignments = async (page, limit) => {
  const { data } = await axiosStudent.get("/assignments/active", {
    params: { page, limit },
  });
  return data;
};

/**
 * Hook to fetch paginated active assignments for the student.
 * 
 * @param {number} page - The current page number
 * @param {number} limit - Items per page
 * @returns {QueryResult} The query result containing:
 *  - data: Array of assignments with course_info and cohort_info
 *  - meta: { totalCount, totalPages, currentPage }
 */
export const useActiveAssignments = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["active-assignments", page, limit],
    queryFn: () => fetchActiveAssignments(page, limit),
    staleTime: 5 * 60 * 1000, // Keep data fresh for 5 minutes
    select: (response) => {
      // Logic to simplify access if needed, but the backend already returns data and meta
      return response;
    },
  });
};
