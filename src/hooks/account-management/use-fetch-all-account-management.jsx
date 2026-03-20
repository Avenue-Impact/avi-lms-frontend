import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";

const fetchAccountManagement = async () => {
  return await axiosAdmin.get(BASE_URL);
};

export const useFetchAccountManagement = () =>
  useQuery({
    queryKey: ["get-all-admins-account"],
    queryFn: fetchAccountManagement,
  });
