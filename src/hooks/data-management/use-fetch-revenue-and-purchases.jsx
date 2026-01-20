import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchRevenueAndPurchases = async () =>
  await axiosAdmin.get("/data/revenue-and-purchases");

export const useFetchRevenueAndPurchases = () => {
  return useQuery({
    queryKey: ["fetch-revenue-and-purchases"],
    queryFn: fetchRevenueAndPurchases,
  });
};
