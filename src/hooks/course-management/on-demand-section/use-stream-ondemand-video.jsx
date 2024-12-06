import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const streamVideo = (courseId, section, videoId) => {
  return axios.get(
    `${BASE_URL}/courses/${courseId}/on-demand-section/${section}/recordings?videoId=${videoId}`,
    {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );
};

export const useStreamVideo = (courseId, section, videoId) => {
  return useQuery({
    queryKey: ["streamVideo", { courseId, section, videoId }],
    queryFn: () => streamVideo(courseId, section, videoId),
    enabled: !!courseId && !!videoId && !!section,
    onError: (error) => {
      console.error("Error streaming video:", error);
    },
  });
};
