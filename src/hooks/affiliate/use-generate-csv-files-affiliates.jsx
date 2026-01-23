import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchGeneralCSVAffiliateRequest = async () => {
    
  const response = await axiosAdmin.get(
    "/affiliates/referred-users/csv",
    {
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
