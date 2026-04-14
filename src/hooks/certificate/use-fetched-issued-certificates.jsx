import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";


const fetchIssuedCert = async (id, page = 1, perPage = 10) =>
  // https://avi-lms-backend.onrender.com/api/v1/courses/:id/certificates
  await axios.get(`${BASE_URL}/courses/${id}/certificates?page=${page}&perPage=${perPage}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFetchedIssuedCert = (id, page = 1, perPage = 10) =>
  useQuery({
    queryKey: ["fetch-issued-certificates", { id, page, perPage }],
    queryFn: () => fetchIssuedCert(id, page, perPage),
    enabled: !!id,
  });
