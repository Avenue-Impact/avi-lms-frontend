import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchAffiliates = async () =>
  //   https://avi-lms-backend.onrender.com/api/v1/admins/affiliates/referred-users

  await axios.get(`${BASE_URL}/affiliates/referred-users`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchAffiliates = () => {
  return useQuery({
    queryKey: ["fetch-affiliates"],
    queryFn: fetchAffiliates,
  });
};
