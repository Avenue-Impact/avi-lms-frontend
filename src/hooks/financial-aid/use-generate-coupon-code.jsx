import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchGenerateCoupon = async () =>
  //   https://avi-lms-backend.onrender.com/api/v1/admins/financial-aid/coupon-codes/generate

  await axios.get(`${BASE_URL}/financial-aid/coupon-codes/generate`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchGenerateCoupon = () => {
  return useQuery({
    queryKey: ["fetch-general-coupon"],
    queryFn: fetchGenerateCoupon,
  });
};
