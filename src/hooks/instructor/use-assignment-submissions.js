import { useQuery } from "@tanstack/react-query";
import { axiosInstructor } from "@/services/api";

const fetchSubmissions = async (taskId, page, total) => {
  const { data } = await axiosInstructor.get("/assignments/submissions", {
    params: { taskId, page, total },
  });
  return data;
};

export const useFetchAssignmentSubmissions = (
  taskId = "all",
  page = 1,
  total = 40,
) => {
  return useQuery({
    queryKey: ["assignment-submissions", taskId, page, total],
    queryFn: () => fetchSubmissions(taskId, page, total),
  });
};
