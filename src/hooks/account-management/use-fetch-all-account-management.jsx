import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchAccountManagement = async () => {
  const token = Cookies.get("adminToken");

  return await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useFetchAccountManagement = () =>
  useQuery({
    queryKey: ["get-all-admins-account"],
    queryFn: fetchAccountManagement,
  });
