import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchPayoutStats = async () => {
  const response = await axiosAdmin.get("/affiliates/payout-stats");
  return response.data;
};

export const useFetchPayoutStats = () => {
  return useQuery({
    queryKey: ["fetch-payout-stats"],
    queryFn: fetchPayoutStats,
  });
};
