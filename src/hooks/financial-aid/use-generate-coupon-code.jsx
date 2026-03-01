import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchGenerateCoupon = async () => {
  return await axiosAdmin.get("/financial-aid/coupon-codes/generate");
};

export const useFetchGenerateCoupon = () => {
  return useQuery({
    queryKey: ["fetch-general-coupon"],
    queryFn: fetchGenerateCoupon,
    enabled: false,
  });
};
