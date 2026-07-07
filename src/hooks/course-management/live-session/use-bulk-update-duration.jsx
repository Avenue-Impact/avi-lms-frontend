import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";

const bulkUpdateDurationApi = async ({ courseId, cohortId, student_ids, access_expires_at }) => {
  return await axiosAdmin.put(
    `/courses/${courseId}/cohorts/${cohortId}/enrolled-students/bulk-access-duration`,
    { student_ids, access_expires_at }
  );
};

export const useBulkUpdateDuration = () => {
  const queryClient = useQueryClient();
  const { mutate: bulkUpdateDuration, isPending } = useMutation({
    mutationFn: bulkUpdateDurationApi,
    onSuccess: ({ data }) => {
      toast.success(data.message || "Student access durations updated successfully");
      queryClient.invalidateQueries({ queryKey: ["fetch-all-live-student"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  return { bulkUpdateDuration, isPending };
};
