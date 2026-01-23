import { useQuery } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";

const fetchCouponStats = async () => {
  const response = await axiosAdmin.get("/promo-codes/stats");
  return response.data;
};

export const useFetchCouponStats = () => {
  return useQuery({
    queryKey: ["coupon-stats"],
    queryFn: fetchCouponStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
