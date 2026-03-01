import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

// Generate csv file of withdrawal requests

const fetchGeneralCSVRequest = async () => {
  const response = await axiosAdmin.get(
    "/affiliates/withdrawal-requests/csv",
    {
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
