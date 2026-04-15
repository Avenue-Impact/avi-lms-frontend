import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosStudent } from "@/services/api";
import toast from "react-hot-toast";

/**
 * API call to submit an assignment task.
 * Uses taskId as a URL parameter as per RESTful requirements.
 */
const submitTaskRequest = async ({ taskId, payload }) => {
  const { data } = await axiosStudent.post(`/tasks/${taskId}/submit`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

/**
 * Hook for student assignment submissions.
 * 
 * @param {Object} options - Mutation options like onSuccess or onError
 * @returns {Object} { submitTask, isSubmitting, error, data }
 */
export const useSubmitAssignment = (options = {}) => {
  const queryClient = useQueryClient();
  
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: submitTaskRequest,
    onSuccess: (res) => {
      // Invalidate cache to reflect submission status in the list
      queryClient.invalidateQueries({ queryKey: ["active-assignments"] });
      
      toast.success(res.message || "Assignment submitted successfully");
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      const message = err.response?.data?.message || "Failed to submit assignment";
      toast.error(message);
      if (options.onError) options.onError(err);
    },
    ...options
  });

  return {
    submitTask: (taskId, payload) => mutate({ taskId, payload }),
    isSubmitting: isPending,
    error,
    data
  };
};
