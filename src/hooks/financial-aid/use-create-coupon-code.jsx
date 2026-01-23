import { axiosAdmin } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const createCouponCode = async (data) => {
  return axiosAdmin.post("/financial-aid/coupon-codes", data);
};

export const useCouponCode = () => {
  const queryClient = useQueryClient();
  const { mutate: create, isPending } = useMutation({
    mutationFn: createCouponCode,
    onSuccess: () => {
      toast.success("Coupon Code Generated Successfully");
      queryClient.invalidateQueries("coupon-created");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { create, isPending };
};
