import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchNotifications = async () =>
  //  https://avi-lms-backend.onrender.com/api/v1/users/admins/me/notifications

  await axios.get(`${BASE_URL}/me/notifications`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchNotifications = () => {
  return useQuery({
    queryKey: ["fetch-notifications"],
    queryFn: fetchNotifications,
  });
};
