import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

/**
 * Fetch enrolled course IDs for the current user from the backend.
 * Returns { cohortCourseIds, onDemandCourseIds } — used as the global
 * enrollment lock source of truth throughout the app.
 */
const fetchEnrolledCourseIds = async () => {
  return axios.get(`${STUDENT_BASE_URL}/courses/enrolled/course-ids`, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
};

/**
 * Hook: provides course-level enrollment lock data.
 * isEnrolled(courseId) — true if user has a live-class enrollment for this course.
 * isOnDemand(courseId) — true if user has an on-demand enrollment for this course.
 */
export const useEnrolledCourses = () => {
  const query = useQuery({
    queryKey: ["enrolled-course-ids"],
    queryFn: fetchEnrolledCourseIds,
    staleTime: 0, // always re-fetch to avoid stale lock data
    enabled: !!Cookies.get("token"),
  });

  const cohortCourseIds = query.data?.data?.data?.cohortCourseIds ?? [];
  const onDemandCourseIds = query.data?.data?.data?.onDemandCourseIds ?? [];

  return {
    ...query,
    cohortCourseIds,
    onDemandCourseIds,
    isEnrolled: (courseId) => cohortCourseIds.includes(courseId),
    isOnDemand: (courseId) => onDemandCourseIds.includes(courseId),
  };
};

/**
 * Admin: transfer a student from one cohort to another.
 */
export const transferStudent = async ({ userId, newCohortId, reason }) => {
  const adminToken = Cookies.get("adminToken") || Cookies.get("token");
  return axios.post(
    `${STUDENT_BASE_URL.replace("/api/v1", "")}/api/v1/admin/cohort-transfers`,
    { userId, newCohortId, reason },
    { headers: { Authorization: `Bearer ${adminToken}` } },
  );
};
