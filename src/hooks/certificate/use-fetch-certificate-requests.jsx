import { useQuery } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";

const fetchCertificateRequests = async (status, page, perPage) => {
  const params = {};
  if (status) params.status = status;
  if (page) params.page = page;
  if (perPage) params.perPage = perPage;

  const { data } = await axiosAdmin.get("/certificates/requests", { params });
  return data.data;
};

export const useFetchCertificateRequests = ({ status, page, perPage } = {}) => {
  return useQuery({
    queryKey: ["fetch-certificate-requests", { status, page, perPage }],
    queryFn: () => fetchCertificateRequests(status, page, perPage),
  });
};
