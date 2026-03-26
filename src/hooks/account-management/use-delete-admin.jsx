import { axiosAdmin } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const deleteAdmin = ({ adminId }) => {
  return axiosAdmin.delete(`/${adminId}`);
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();
  const { mutate: delAdmin, isPending } = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      toast.success("Admin deleted successfully");
      queryClient.invalidateQueries("get-all-admins-account");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });
  return { delAdmin, isPending };
};

