import { useQuery } from "@tanstack/react-query";
import { axiosInstructor } from "@/services/api";

const fetchSubmissions = async (taskId) => {
  const { data } = await axiosInstructor.get(`/assignments/${taskId}/submissions`);
  return data;
};

export const useFetchAssignmentSubmissions = (taskId) => {
  return useQuery({
    queryKey: ["assignment-submissions", taskId],
    queryFn: () => fetchSubmissions(taskId),
    enabled: !!taskId,
  });
};
