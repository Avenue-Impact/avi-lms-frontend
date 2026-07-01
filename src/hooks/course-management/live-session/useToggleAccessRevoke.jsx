import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";

const toggleAccessRevokeApi = async ({ courseId, cohortId, studentId, is_access_revoked }) => {
  return await axiosAdmin.put(
    `/courses/${courseId}/cohorts/${cohortId}/enrolled-students/${studentId}/revoke-access`,
    { is_access_revoked }
  );
};

export const useToggleAccessRevoke = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleAccessRevokeApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["live-session-enrolled-students"]);
      queryClient.invalidateQueries(["on-demand-enrolled-students"]);
      toast.success(data?.data?.message || "Access successfully updated");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update access status");
    },
  });
};
