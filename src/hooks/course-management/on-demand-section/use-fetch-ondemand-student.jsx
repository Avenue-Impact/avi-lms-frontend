import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const fetchEnrollStudents = async (courseId) => {
  return await axios.get(
    `${BASE_URL}/admins/courses/${courseId}/on-demand-section/enrolled-students`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );
};

export const useFetchOndemandStudent = (courseId) => {
  return useQuery({
    queryKey: ["get-ondemand-student", { courseId }],
    queryFn: () => fetchEnrollStudents(courseId),
  });
};
