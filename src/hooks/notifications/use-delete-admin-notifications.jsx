import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteNotifications = ({ notificationId }) => {
  const url = `${BASE_URL}/me/notifications/${notificationId}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
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
