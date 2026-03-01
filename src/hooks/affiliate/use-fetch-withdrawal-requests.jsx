import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchWithdrawalRequests = async () => {
  const response = await axiosAdmin.get("/affiliates/withdrawal-requests");
  return response.data;
};

export const useFetchWithdrawalRequests = () => {
  return useQuery({
    queryKey: ["fetch-withdrawal-requests"],
    queryFn: fetchWithdrawalRequests,
  });
};
