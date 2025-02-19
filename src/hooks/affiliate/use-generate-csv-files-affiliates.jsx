import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";


const fetchGeneralCSVAffiliateRequest = async () => {
    
  const response = await axios.get(
    `${BASE_URL}/affiliates/referred-users/csv`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
      responseType: "blob",
    },
  );
  return response.data;
};

export const useFetchGeneralCSVAffiliateRequest = () => {
  return useQuery({
    queryKey: ["general-csv-affiliate-request"],
    queryFn: fetchGeneralCSVAffiliateRequest,
    enabled: false,
  });
};
