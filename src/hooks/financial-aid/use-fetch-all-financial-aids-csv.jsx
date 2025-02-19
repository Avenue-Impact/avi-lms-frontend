import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

// Generate csv file of withdrawal requests

const fetchFinancialCSVRequest = async () => {
  // https://avi-lms-backend.onrender.com/api/v1/admins/financial-aid/csv
  const response = await axios.get(`${BASE_URL}/financial-aid/csv`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
    responseType: "blob",
  });
  return response.data;
};

export const useFetchFinancialCSVRequest = () => {
  return useQuery({
    queryKey: ["Financial-csv-request"],
    queryFn: fetchFinancialCSVRequest,
    enabled: false,
  });
};
