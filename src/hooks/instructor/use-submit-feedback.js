import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstructor } from "@/services/api";
import toast from "react-hot-toast";

const submitFeedbackFn = async ({ submissionId, feedback, mark_reviewed = false }) => {
  const { data } = await axiosInstructor.patch(
    `/submissions/${submissionId}/feedback`,
    { feedback, mark_reviewed }
  );
  return data;
};

export const useSubmitFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitFeedbackFn,
    onSuccess: () => {
      toast.success("Feedback submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["instructor-recent-submissions"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-submissions"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to submit feedback");
    },
  });
};
