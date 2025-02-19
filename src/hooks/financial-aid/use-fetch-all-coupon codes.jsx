import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchAllCoupons = async () =>
  //   https://avi-lms-backend.onrender.com/api/v1/admins/financial-aid/coupon-codes

  await axios.get(`${BASE_URL}/financial-aid/coupon-codes`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchAllCoupons = () => {
  return useQuery({
    queryKey: ["fetch-all-coupons"],
    queryFn: fetchAllCoupons,
  });
};
