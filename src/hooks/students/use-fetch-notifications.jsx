import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchNotifications = async () =>
  // https://avi-lms-backend.onrender.com/api/v1/users/me/notifications
  await axios.get(`${STUDENT_BASE_URL}/users/me/notifications`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

export const useFetchNotifications = () =>
  useQuery({
    queryKey: ["fetch-Notifications"],
    queryFn: () => fetchNotifications(),
  });
