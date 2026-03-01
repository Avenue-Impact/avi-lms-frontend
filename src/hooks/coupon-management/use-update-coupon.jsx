import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";

const updateCoupon = async ({ id, data }) => {
  const response = await axiosAdmin.patch(`/promo-codes/${id}`, data);
  return response.data;
};

export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCoupon,
    onSuccess: (data) => {
      toast.success(data.message || "Coupon updated successfully");
      // Invalidate and refetch coupons list
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      queryClient.invalidateQueries({ queryKey: ["coupon-stats"] });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to update coupon";
      toast.error(message);
    },
  });
};
