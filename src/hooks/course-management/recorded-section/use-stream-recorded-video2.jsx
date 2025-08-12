import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const streamVideo = (courseId, section, videoId) => {
  // https://avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId/cohorts/:cohortId/sections/:section/recordings?videoId=66fd10daa3bc60bbe50296b0

  //avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId/on-demand-section/:section/recordings?videoId=6733f24c4eea174af578734c

  return axios.get(
    `${BASE_URL}/courses/${courseId}/on-demand-section/${section}/recordings?videoId=${videoId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
        Range: "bytes=0-",
      },
    },
  );
};

export const useStreamRecordedVideo2 = (courseId, section, videoId) => {
  return useQuery({
    queryKey: ["streamRecordedVideo2", { courseId, section, videoId }],
    queryFn: () => streamVideo(courseId, section, videoId),
    enabled: !!courseId && !!videoId && !!section,

    onError: (error) => {
      console.error(error);
    },
  });
};
