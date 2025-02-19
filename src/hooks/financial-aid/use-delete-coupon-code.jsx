import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteAllCoupon = ({couponCodeId}) =>
  
  axios.delete(`${BASE_URL}/financial-aid/coupon-codes/${couponCodeId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

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
