import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";

const createCoupon = async (data) => {
  const response = await axiosAdmin.post("/promo-codes", data);
  return response.data;
};

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCoupon,
    onSuccess: (data) => {
      toast.success(data.message || "Coupon created successfully");
      // Invalidate and refetch coupons list
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      queryClient.invalidateQueries({ queryKey: ["coupon-stats"] });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to create coupon";
      toast.error(message);
    },
  });
};
