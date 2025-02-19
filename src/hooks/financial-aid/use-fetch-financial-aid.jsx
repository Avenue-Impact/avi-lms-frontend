import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchSingleFinancialAid = async (id) =>
  //   https://avi-lms-backend.onrender.com/api/v1/admins/financial-aid/:id

  await axios.get(`${BASE_URL}/financial-aid/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useSingleFinancialAid = (id) => {
  return useQuery({
    queryKey: ["fetch-single-financial-aid", id],
    queryFn: () => fetchSingleFinancialAid(id),
    enabled: !!id,
  });
};
