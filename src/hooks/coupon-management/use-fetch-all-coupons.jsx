import { useQuery } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";

const fetchAllCoupons = async (filters) => {
  const { status, search, page = 1, limit = 10 } = filters || {};
  
  const params = new URLSearchParams();
  if (status && status !== "all") params.append("status", status);
  if (search) params.append("search", search);
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const response = await axiosAdmin.get(`/promo-codes?${params.toString()}`);
  return response.data;
};

export const useFetchAllCoupons = (filters) => {
  return useQuery({
    queryKey: ["coupons", filters],
    queryFn: () => fetchAllCoupons(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
