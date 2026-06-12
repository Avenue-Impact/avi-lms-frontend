import { toggleCohortMentorship } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useToggleCohortMentorship = (courseId, cohortId) => {
  const queryClient = useQueryClient();

  const { mutate: toggleMentorship, isLoading: isTogglingMentorship } = useMutation({
    mutationFn: (enabled) => toggleCohortMentorship({ courseId, cohortId, enabled }),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Cohort mentorship status updated");
      queryClient.invalidateQueries(["get-single-cohort", courseId, cohortId]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update mentorship status");
    },
  });

  return { toggleMentorship, isTogglingMentorship };
};
