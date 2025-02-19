import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchFinancialAid = async () =>
  //   https://avi-lms-backend.onrender.com/api/v1/admins/financial-aid/

  await axios.get(`${BASE_URL}/financial-aid`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchFinancialAid = () => {
  return useQuery({
    queryKey: ["fetch-financial-aid"],
    queryFn: fetchFinancialAid,
  });
};
