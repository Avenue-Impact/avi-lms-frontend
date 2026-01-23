import { axiosAdmin } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const deleteAllCoupon = ({couponCodeId}) => {
  return axiosAdmin.delete(`/financial-aid/coupon-codes/${couponCodeId}`);
};

export const useDeleteAllCoupon = () => {
  const queryClient = useQueryClient();
  const { mutate:deleteCoupon, isPending } = useMutation({
    mutationFn: deleteAllCoupon,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("fetch-all-coupon");
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message ?? "Something went wrong");
    },
  });

  return { deleteCoupon, isPending };
};
