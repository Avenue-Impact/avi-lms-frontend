import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const fetchNotifications = async () =>
  await axiosAdmin.get("/me/notifications");

export const useFetchNotifications = () => {
  const token = Cookies.get("adminToken");
  const hasValidToken = Boolean(token && token !== "undefined" && token !== "null");

  return useQuery({
    queryKey: ["fetch-admin-notifications"],
    queryFn: fetchNotifications,
    enabled: hasValidToken,
    retry: false,
    staleTime: 60 * 1000,
  });
};
