import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchAllCoupons = async () => {
    return await axiosAdmin.get("/financial-aid/coupon-codes");
};

export const useFetchAllCoupons = () => {
  return useQuery({
    queryKey: ["fetch-all-coupons"],
    queryFn: fetchAllCoupons,
  });
};
