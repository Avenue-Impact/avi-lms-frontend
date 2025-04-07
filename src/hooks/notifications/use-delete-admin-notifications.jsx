import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteNotifications = ({ notificationId }) => {
  // https://avi-lms-backend.onrender.com/api/v1/users/admins/me/notifications/:notificationId
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
      toast.success("notification deleted successfully");
      queryClient.invalidateQueries("admin-notifications");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });
  return { removeFromList, isRemoving };
};
