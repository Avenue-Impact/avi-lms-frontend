import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const editRole = async ({ data, adminId }) =>
  await axios.patch(
    `https://avi-lms-backend.onrender.com/api/v1/admins/${adminId}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );

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
