import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useFetchVideoProgress = (courseId, videoId) => {
  return useQuery({
    queryKey: ["video-progress", courseId, videoId],
    queryFn: async () => {
      const token = Cookies.get("token");
      const { data } = await axios.get(
        `${STUDENT_BASE_URL}/courses/${courseId}/video-progress?video_id=${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    enabled: !!courseId && !!videoId,
  });
};
