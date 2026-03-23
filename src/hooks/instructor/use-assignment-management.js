import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstructor } from "@/services/api";
import toast from "react-hot-toast";

const fetchAssignments = async (cohortId) => {
  const { data } = await axiosInstructor.get(`/cohorts/${cohortId}/assignments`);
  return data;
};

const createAssignment = async (data) => {
  const response = await axiosInstructor.post("/assignments", data);
  return response.data;
};

export const useFetchAssignmentTasks = (cohortId) => {
  return useQuery({
    queryKey: ["cohort-assignments", cohortId],
    queryFn: () => fetchAssignments(cohortId),
    enabled: !!cohortId,
  });
};

export const useCreateAssignmentTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries(["cohort-assignments"]);
      toast.success("Assignment created successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create assignment");
    },
  });
};
