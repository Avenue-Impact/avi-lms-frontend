import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";


const fetchIssuedCert = async (id) =>
  // https://avi-lms-backend.onrender.com/api/v1/admins/courses/:id/certificates
  await axios.get(`${BASE_URL}/courses/${id}/certificates`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchedIssuedCert = (id) =>
  useQuery({
    queryKey: ["fetch-issued-certificates", { id }],
    queryFn: () => fetchIssuedCert(id),
    enabled: !!id,
  });
