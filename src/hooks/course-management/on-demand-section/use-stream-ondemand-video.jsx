import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const streamVideo = (courseId, section, videoId, range, cohortId) => {
  // https://avi-lms-backend.onrender.com/api/v1/courses/enrolled/:courseId/cohorts/:cohortId/sections/:section/recordings?videoId=671887148b0720dec44b8af5
  return axios.get(
    `https://avi-lms-backend.onrender.com/api/v1/courses/enrolled/${courseId}/cohorts/${cohortId}/sections/${section}/recordings?videoId=${videoId}`,
    {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
        // Range: range,
        Range: "bytes=0-1048575",
      },
    },
  );
};

export const useStreamVideo = (courseId, section, videoId, range, cohortId) => {
  return useQuery({
    queryKey: ["streamVideo", { courseId, section, videoId, cohortId, range }],
    queryFn: () => streamVideo(courseId, section, videoId, range, cohortId),
    enabled: !!courseId && !!videoId && !!section && !!cohortId,
    onError: (error) => {
      console.error("Error streaming video:", error);
    },
  });
};
