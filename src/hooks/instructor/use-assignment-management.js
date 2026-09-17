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

const updateAssignment = async ({ assignmentId, data }) => {
  const response = await axiosInstructor.put(`/assignments/${assignmentId}`, data);
  return response.data;
};

const deleteAssignment = async (assignmentId) => {
  const response = await axiosInstructor.delete(`/assignments/${assignmentId}`);
  return response.data;
};

export const useFetchAssignmentTasks = (cohortId) => {
  return useQuery({
    queryKey: ["cohort-assignments", cohortId],
    queryFn: () => fetchAssignments(cohortId),
    enabled: !!cohortId,
  });
};

export const useCreateAssignmentTask = (cohortId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAssignment,
    onSuccess: () => {
      if (cohortId) {
        queryClient.invalidateQueries(["cohort-assignments", cohortId]);
      }
      queryClient.invalidateQueries(["cohort-assignments"]);
      toast.success("Assignment created successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create assignment");
    },
  });
};

export const useUpdateAssignmentTask = (cohortId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAssignment,
    onSuccess: () => {
      if (cohortId) {
        queryClient.invalidateQueries(["cohort-assignments", cohortId]);
      }
      queryClient.invalidateQueries(["cohort-assignments"]);
      toast.success("Assignment updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update assignment");
    },
  });
};

export const useDeleteAssignmentTask = (cohortId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAssignment,
    onSuccess: () => {
      if (cohortId) {
        queryClient.invalidateQueries(["cohort-assignments", cohortId]);
      }
      queryClient.invalidateQueries(["cohort-assignments"]);
      toast.success("Assignment deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete assignment");
    },
  });
};
