import { addVideosToRecordedSession } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddVideosToRecordedSession = (courseId, cohortId) => {
  const queryclient = useQueryClient();
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: addVideosToRecordedSession,
    onSuccess: (data) => {
      queryclient.invalidateQueries({
        queryKey: ["get-single-cohort", { courseId, cohortId }],
      });
      toast.success(data?.data?.message ?? "Videos added successfully");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to add videos",
      );
    },
  });

  return { mutate, isAdding: isPending, error, isSuccess };
};
