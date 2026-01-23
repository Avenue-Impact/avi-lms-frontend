import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";

const deactivateCoupon = async (id) => {
  const response = await axiosAdmin.patch(`/promo-codes/${id}/deactivate`);
  return response.data;
};

export const useDeactivateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivateCoupon,
    onSuccess: (data) => {
      toast.success(data.message || "Coupon deactivated successfully");
      // Invalidate and refetch coupons list
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      queryClient.invalidateQueries({ queryKey: ["coupon-stats"] });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to deactivate coupon";
      toast.error(message);
    },
  });
};
