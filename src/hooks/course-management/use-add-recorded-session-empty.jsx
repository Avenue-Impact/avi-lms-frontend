import { addRecordedSessionEmpty } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddRecordedSessionEmpty = (courseId, cohortId) => {
  const queryclient = useQueryClient();
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: addRecordedSessionEmpty,
    onSuccess: (data) => {
      queryclient.invalidateQueries({
        queryKey: ["get-single-cohort", { courseId, cohortId }],
      });
      toast.success(data?.data?.message ?? "Section added successfully");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to add section",
      );
    },
  });

  return { mutate, isCreating: isPending, error, isSuccess };
};
