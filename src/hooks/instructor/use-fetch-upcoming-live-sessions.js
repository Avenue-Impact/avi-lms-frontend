import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchUpcomingLiveSessions = async () => {
  const baseUrl = import.meta.env.VITE_AUTH_URL.replace("/auth", "");
  const { data } = await axios.get(`${baseUrl}/instructor/upcoming-live-sessions`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return data;
};

export const useFetchUpcomingLiveSessions = () => {
  return useQuery({
    queryKey: ["upcoming-live-sessions"],
    queryFn: fetchUpcomingLiveSessions,
  });
};
