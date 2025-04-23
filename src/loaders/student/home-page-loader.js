import { STUDENT_BASE_URL } from "@/constant";
import axios from "axios";
import Cookies from "js-cookie";

const fetchLiveCourse = async () => {
  return await axios.get(
    `${STUDENT_BASE_URL}/courses/enrolled/live-sessions?page=1`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );
};
export const liveSessionDetailQuery = () => ({
  queryKey: ["fetch-enrolled-live-session-course"],
  queryFn: fetchLiveCourse,
  staleTime: 1000 * 60 * 2,
});

const fetchRecordedCourse = async () => {
  return axios.get(
    `${STUDENT_BASE_URL}/courses/enrolled/pre-recorded-sessions?page=1`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );
};

export const recordedSessionDetailQuery = () => ({
  queryKey: ["fetch-enrolled-pre-recorded-course"],
  queryFn: fetchRecordedCourse,
  staleTime: 1000 * 60 * 2, // 1 hour
});
// export const useFetchEnrolledPreRecordedCourse = () => {
//   return useQuery({
//     queryKey: ["enrolled-pre-recorded-course"],
//     queryFn: fetchLiveCourse,
//   });
// };

export const homePageLoader = (queryClient) => async () => {
  const query = liveSessionDetailQuery();
  const recordedQuery = recordedSessionDetailQuery();
  // ⬇️ return data or fetch it
  return await Promise.all([
    queryClient.ensureQueryData(query),
    queryClient.ensureQueryData(recordedQuery),
  ]);
};
