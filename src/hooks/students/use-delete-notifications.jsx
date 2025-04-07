import { STUDENT_BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteNotifications = async ({ notificationId }) =>
  // https://avi-lms-backend.onrender.com/api/v1/users/me/notifications/:notificationId
  await axios.delete(
    `${STUDENT_BASE_URL}/users/me/notifications/${notificationId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );

export const useDeleteNotifications = () => {
  const queryClient = useQueryClient();
  const { mutate: removeFromList, isPending: isRemoving } = useMutation({
    mutationFn: deleteNotifications,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Notification deleted successfully");
      queryClient.invalidateQueries("fetch-notification");
    },
    onError: (error) => {
      toast.error(
        error.response.data.message || "Failed to delete notifications",
      );
    },
  });

  return { removeFromList, isRemoving };
};
