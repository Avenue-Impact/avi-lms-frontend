import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const getCertificate = (courseId, paramsObj = {}) => {
  let queryParams = new URLSearchParams();
  if (typeof paramsObj === "object" && paramsObj !== null) {
    Object.entries(paramsObj).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        queryParams.append(key, val);
      }
    });
  }
  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";

  return axios.get(
    `${STUDENT_BASE_URL}/courses/${courseId}/certificate${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      responseType: "blob",
    },
  );
};

export const useGetCertificate = (courseId, arg2, duration) => {
  let paramsObj = {};
  if (typeof arg2 === "object" && arg2 !== null) {
    paramsObj = arg2;
  } else {
    const cohortId = arg2;
    if (cohortId === "on-demand" || cohortId === "on demand") {
      paramsObj = { course_type: "on-demand", duration };
    } else if (cohortId) {
      paramsObj = { course_type: "live class", cohort_id: cohortId };
    }
  }

  return useQuery({
    queryKey: ["get-certificate", courseId, paramsObj],
    queryFn: () => getCertificate(courseId, paramsObj),
    enabled: !!courseId,
    refetchOnMount: true,
  });
};


