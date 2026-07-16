import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchCertificateRequests = async (status, page, perPage) => {
  const url = new URL(`${BASE_URL}/certificates/requests`);
  if (status) url.searchParams.append("status", status);
  if (page) url.searchParams.append("page", page);
  if (perPage) url.searchParams.append("perPage", perPage);

  const { data } = await axios.get(url.toString(), {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return data.data;
};

export const useFetchCertificateRequests = ({ status, page, perPage } = {}) => {
  return useQuery({
    queryKey: ["fetch-certificate-requests", { status, page, perPage }],
    queryFn: () => fetchCertificateRequests(status, page, perPage),
  });
};
