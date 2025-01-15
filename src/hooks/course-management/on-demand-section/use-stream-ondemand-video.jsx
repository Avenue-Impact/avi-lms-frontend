import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const streamVideo = (courseId, section, videoId, range) => {
  return axios.get(
    `${BASE_URL}/courses/${courseId}/on-demand-section/${section}/recordings?videoId=${videoId}`,
    {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
        Range: range,
        // Range: "bytes=0-1048575",
      },
    },
  );
};

export const useStreamVideo = (courseId, section, videoId, range) => {
  return useQuery({
    queryKey: ["streamVideo", { courseId, section, videoId }],
    queryFn: () => streamVideo(courseId, section, videoId, range),
    enabled: !!courseId && !!videoId && !!section,
    onError: (error) => {
      console.error("Error streaming video:", error);
    },
  });
};
