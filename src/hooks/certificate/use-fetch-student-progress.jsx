import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchStudentProgress = async (enrollmentId) => {
  const { data } = await axios.get(
    `${BASE_URL}/certificates/enrollments/${enrollmentId}/progress`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return data.data;
};

export const useFetchStudentProgress = (enrollmentId) => {
  return useQuery({
    queryKey: ["fetch-student-progress", enrollmentId],
    queryFn: () => fetchStudentProgress(enrollmentId),
    enabled: !!enrollmentId,
  });
};
