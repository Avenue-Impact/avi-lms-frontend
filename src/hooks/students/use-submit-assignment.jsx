import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosStudent } from "@/services/api";
import toast from "react-hot-toast";

/**
 * OLD API call to submit an assignment.
 * Uses courseId, cohortId, and section in the URL.
 */
const submitAssignmentOld = async ({ data, courseId, cohortId, section }) => {
  const { data: responseData } = await axiosStudent.post(
    `/enrolled/${courseId}/cohorts/${cohortId}/sections/${section}/assignments`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return responseData;
};

/**
 * Hook for student assignment submissions (Old Structure).
 */
export const useSubmitAssignment = (options = {}) => {
  const queryClient = useQueryClient();
  
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: (params) => submitAssignmentOld(params),
    onSuccess: (res) => {
      // Invalidate cache if needed
      queryClient.invalidateQueries({ queryKey: ["get-all-admins-account"] }); // Keep for compatibility
      
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
    mutate,
    isPending,
    error,
    data
  };
};
