import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/constant";

const fetchNotifications = async () =>
  await axiosAdmin.get("/me/notifications");

export const useFetchNotifications = () =>
  useQuery({
    queryKey: ["fetch-admin-notifications"],
    queryFn: fetchNotifications,
  });
