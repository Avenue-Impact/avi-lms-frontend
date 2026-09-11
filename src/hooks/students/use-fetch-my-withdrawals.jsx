import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchMyWithdrawals = async () => {
  const token = Cookies.get("token");
  const response = await axios.get(
    `${STUDENT_BASE_URL}/users/me/referrals/withdrawals`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const useFetchMyWithdrawals = () =>
  useQuery({
    queryKey: ["fetch-my-withdrawals"],
    queryFn: fetchMyWithdrawals,
  });
