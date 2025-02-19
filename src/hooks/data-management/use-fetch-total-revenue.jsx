import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
const fetchRevenue = async (period) =>
  await axios.get(`${BASE_URL}/data/revenue-by-period?period=${period}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchRevenue = (period) => {
  return useQuery({
    queryKey: ["fetch-revenue-trend", { period }],
    queryFn: () => fetchRevenue(period),
    enabled: !!period,
  });
};
