import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchNotifications = async () =>
  await axios.get(`${BASE_URL}/me/notifications`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchNotifications = () =>
  useQuery({
    queryKey: ["fetch-admin-notifications"],
    queryFn: fetchNotifications,
  });
