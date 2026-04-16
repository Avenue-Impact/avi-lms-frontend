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
    onSuccess: (res) => {
      toast.success(res?.data?.message || "Admin deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["get-all-admins-account"] });
    },
    onError: (err) => {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
  });

  return { delAdmin, isPending };
};

