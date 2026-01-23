import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

// Generate csv file of withdrawal requests

const fetchFinancialCSVRequest = async () => {
  // https://avi-lms-backend.onrender.com/api/v1/admins/financial-aid/csv
  // https://avi-lms-backend.onrender.com/api/v1/admins/financial-aid/csv
  const response = await axiosAdmin.get(`/financial-aid/csv`, {
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
