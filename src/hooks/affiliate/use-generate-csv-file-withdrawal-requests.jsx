import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

// Generate csv file of withdrawal requests

const fetchGeneralCSVRequest = async () => {
  const response = await axios.get(
    `${BASE_URL}/affiliates/withdrawal-requests/csv`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
      responseType: "blob",
    },
  );
  return response.data;
};

export const useFetchGeneralCSVRequest = () => {
  return useQuery({
    queryKey: ["general-csv-request"],
    queryFn: fetchGeneralCSVRequest,
    enabled: false,
  });
};
