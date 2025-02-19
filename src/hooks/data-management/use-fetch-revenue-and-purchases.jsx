import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
const fetchRevenueAndPurchases = async () =>
  await axios.get(`${BASE_URL}/data/revenue-and-purchases`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchRevenueAndPurchases = () => {
  return useQuery({
    queryKey: ["fetch-revenue-and-purchases"],
    queryFn: fetchRevenueAndPurchases,
  });
};
