import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";


const fetchAllStudent = async () =>
    
  await axios.get(`${BASE_URL}/data/students`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchAllManagementStudent = () => {
  return useQuery({
    queryKey: ["fetch-all-student"],
    queryFn: fetchAllStudent,
  });
};
