import { deleteRecordedSessionVideo } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteRecordedSessionVideo = (courseId, cohortId) => {
  const queryclient = useQueryClient();
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: deleteRecordedSessionVideo,
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ["get-single-cohort", { courseId, cohortId }],
      });
      toast.success("Video deleted successfully");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete video",
      );
    },
  });

  return { mutate, isDeleting: isPending, error, isSuccess };
};
