import { axiosAdmin } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const editRole = async ({ data, adminId }) =>
  await axiosAdmin.patch(`/${adminId}`, data);

export const useEditAdminRole = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: editRole,
    onSuccess: ({ data }) => {
      toast.success(data.message ?? "Admin role edited successfully");
      queryClient.invalidateQueries("get-all-admins-account");
    },
    onError: (error) => {
      toast.error(error.response.data.message ?? "Failed to edit admin role");
    },
  });

  return { mutate, isPending };
};
