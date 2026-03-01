import { axiosAdmin } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const updateWithdrawalRequest = async ({ data, requestId }) =>
  await axiosAdmin.patch(
    `/affiliates/withdrawal-requests/${requestId}`,
    data
  );

export const useUpdateWithdrawalRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateWithdrawalRequest,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? " status updated successfully");
      queryClient.invalidateQueries("fetch-withdrawal-request");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? " failed to update status");
    },
  });

  return { mutate, isPending };
};
