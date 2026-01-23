import { axiosAdmin } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchAffiliates = async () => {
  const response = await axiosAdmin.get("/affiliates/referred-users");
  return response.data;
};

export const useFetchAffiliates = () => {
  return useQuery({
    queryKey: ["fetch-affiliates"],
    queryFn: fetchAffiliates,
  });
};
