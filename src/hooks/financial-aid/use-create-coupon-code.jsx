import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const createCouponCode = async (data) => {
//  https://avi-lms-backend.onrender.com/api/v1/admins/financial-aid/coupon-codes
  const url = `${BASE_URL}/financial-aid/coupon-codes`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
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
