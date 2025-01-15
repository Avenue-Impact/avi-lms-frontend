import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const streamVideo = (courseId, cohortId, section, videoId) => {
  // https://avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId/cohorts/:cohortId/sections/:section/recordings?videoId=66fd10daa3bc60bbe50296b0

  return axios.get(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/sections/${section}/recordings?videoId=${videoId}`,
    {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
        Range: "bytes=0-",
      },
    },
  );
};

export const useStreamRecordedVideo = (
  courseId,
  cohortId,
  section,
  videoId,
) => {
  return useQuery({
    queryKey: ["streamRecordedVideo", { courseId, cohortId, section, videoId }],
    queryFn: () => streamVideo(courseId, cohortId, section, videoId),
    enabled: !!courseId && !!videoId && !!section && !!cohortId,

    onError: (error) => {
      console.error(error);
    },
  });
};
