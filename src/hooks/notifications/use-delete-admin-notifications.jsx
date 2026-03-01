import { axiosAdmin } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const deleteNotifications = ({ notificationId }) => {
  return axiosAdmin.delete(`/me/notifications/${notificationId}`);
};

export const useDeleteNotifications = () => {
  const queryClient = useQueryClient();
  const { mutate: removeFromList, isPending: isRemoving } = useMutation({
    mutationFn: deleteNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries("fetch-admin-notifications");
      toast.success("Notification deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message ?? "Something went wrong");
    },
  });
  return { removeFromList, isRemoving };
};
