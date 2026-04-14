import { updateLiveSessionDetails } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useUpdateLiveSession = (cohortId) => {
  const queryClient = useQueryClient();

  const { mutate: updateSession, isLoading: isUpdating } = useMutation({
    mutationFn: (data) => updateLiveSessionDetails({ cohortId, ...data }),
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Live session details updated successfully");
      queryClient.invalidateQueries(["instructor-cohorts"]);
      queryClient.invalidateQueries(["get-single-cohort"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update live session details");
    },
  });

  return { updateSession, isUpdating };
};
