import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const streamVideo = (courseId, section, videoId, range, cohortId) => {
  //https://avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId/on-demand-section/:section/recordings?videoId=6733f24c4eea174af578734c
  return axios.get(
    `https://avi-lms-5478f16284c6.herokuapp.com/api/v1/courses/enrolled/${courseId}/cohorts/${cohortId}/sections/${section}/recordings?videoId=${videoId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        // Range: range,
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
