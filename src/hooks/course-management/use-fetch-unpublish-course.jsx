import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchUnpublishCourse = async () =>
  //  https://avi-lms-backend.onrender.com/api/v1/admins/courses/unpublished

  await axios.get(`${BASE_URL}/courses/unpublished`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useUnpublishCourses = () => {
  return useQuery({
    queryKey: ["fetch-unpublish-course"],
    queryFn: () => fetchUnpublishCourse(),
  });
};
