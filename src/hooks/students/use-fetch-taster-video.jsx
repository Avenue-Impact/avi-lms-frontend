import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchVideo = async (courseId) => {
  const token = Cookies.get("token");

  return await axios.get(
    `https://avi-lms-5478f16284c6.herokuapp.com/api/v1/courses/stream-preview/${courseId}`,

    {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const useFetchVideo = (courseId) => {
  return useQuery({
    queryKey: ["fetch-taster-video", courseId],
    queryFn: () => fetchVideo(courseId),
  });
};
