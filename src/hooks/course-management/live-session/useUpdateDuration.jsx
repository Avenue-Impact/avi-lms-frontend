import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";

const updateDurationApi = async ({ courseId, cohortId, studentId, access_expires_at }) => {
  return await axiosAdmin.put(
    `/courses/${courseId}/cohorts/${cohortId}/enrolled-students/${studentId}/access-duration`,
    { access_expires_at }
  );
};

export const useUpdateDuration = () => {
  const queryClient = useQueryClient();
  const { mutate: updateDuration, isPending } = useMutation({
    mutationFn: updateDurationApi,
    onSuccess: ({ data }) => {
      toast.success(data.message || "Duration updated successfully");
      queryClient.invalidateQueries(["fetch-all-live-student"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  return { updateDuration, isPending };
};
