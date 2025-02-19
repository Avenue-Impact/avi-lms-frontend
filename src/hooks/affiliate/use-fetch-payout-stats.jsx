import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchPayoutStats = async () =>
  // https://avi-lms-backend.onrender.com/api/v1/admins/affiliates/payout-stats

  await axios.get(`${BASE_URL}/affiliates/payout-stats`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchPayoutStats = () => {
  return useQuery({
    queryKey: ["fetch-payout-stats"],
    queryFn: fetchPayoutStats,
  });
};
