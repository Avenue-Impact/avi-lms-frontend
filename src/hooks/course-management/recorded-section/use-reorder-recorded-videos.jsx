import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderRecordedSessionVideos } from "@/services/api";
import toast from "react-hot-toast";

export const useReorderRecordedVideos = () => {
  const queryClient = useQueryClient();

  const { mutate: reorderVideos, isPending: isReordering } = useMutation({
    mutationFn: reorderRecordedSessionVideos,
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Videos reordered successfully!");
      // Invalidate both get-cohort and get-demand-course just in case they are used
      queryClient.invalidateQueries({ queryKey: ["get-cohort"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to reorder videos",
      );
    },
  });

  return { reorderVideos, isReordering };
};
