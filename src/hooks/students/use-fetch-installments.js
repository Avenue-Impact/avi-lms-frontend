import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchInstallments = async (enrollmentId) => {
  const token = Cookies.get("token");
  return axios.get(`${STUDENT_BASE_URL}/courses/installments/${enrollmentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const useFetchInstallments = (enrollmentId) => {
  return useQuery({
    queryKey: ["installments", enrollmentId],
    queryFn: () => fetchInstallments(enrollmentId),
    enabled: !!enrollmentId,
  });
};
