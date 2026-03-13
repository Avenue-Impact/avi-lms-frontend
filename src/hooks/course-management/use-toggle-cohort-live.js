import { toggleCohortLive } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useToggleCohortLive = (courseId, cohortId) => {
  const queryClient = useQueryClient();

  const { mutate: toggleLive, isLoading: isToggling } = useMutation({
    mutationFn: (isLive) => toggleCohortLive({ courseId, cohortId, is_live: isLive }),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Cohort live status updated");
      queryClient.invalidateQueries(["get-single-cohort", { courseId, cohortId }]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update cohort status");
    },
  });

  return { toggleLive, isToggling };
};
