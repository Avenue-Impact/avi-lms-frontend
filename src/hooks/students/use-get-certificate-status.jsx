import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const getCertificateStatus = async (courseId) => {
  const { data } = await axios.get(
    `${STUDENT_BASE_URL}/courses/certificates/status?courseId=${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return data.data;
};

export const useGetCertificateStatus = (courseId) => {
  return useQuery({
    queryKey: ["certificate-status", courseId],
    queryFn: () => getCertificateStatus(courseId),
    enabled: !!courseId,
  });
};
