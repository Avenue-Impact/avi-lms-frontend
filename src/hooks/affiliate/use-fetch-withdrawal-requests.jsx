import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";


const fetchWithdrawalRequests = async () =>
  // https://avi-lms-backend.onrender.com/api/v1/admins/affiliates/withdrawal-requests

  await axios.get(`${BASE_URL}/affiliates/withdrawal-requests`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchWithdrawalRequests = () => {
  return useQuery({
    queryKey: ["fetch-rithdrawal-requests"],
    queryFn: fetchWithdrawalRequests,
  });
};
