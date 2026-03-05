import { editRecordingSection } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useEditRecordingSection = (courseId, cohortId) => {
  const queryclient = useQueryClient();
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: editRecordingSection,
    onSuccess: (data) => {
      queryclient.invalidateQueries({
        queryKey: ["get-single-cohort", { courseId, cohortId }],
      });
      toast.success(data?.data?.message ?? "Section updated successfully");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to edit section",
      );
    },
  });

  return { mutate, isEditing: isPending, error, isSuccess };
};
