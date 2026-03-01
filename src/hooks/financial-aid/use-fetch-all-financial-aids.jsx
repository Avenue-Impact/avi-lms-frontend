import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchFinancialAid = async () =>
  //   https://avi-lms-backend.onrender.com/api/v1/admins/financial-aid/

  await axiosAdmin.get(`/financial-aid`);

export const useFetchFinancialAid = () => {
  return useQuery({
    queryKey: ["fetch-financial-aid"],
    queryFn: fetchFinancialAid,
  });
};
