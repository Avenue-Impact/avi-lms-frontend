import { STUDENT_BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAllCourses = ({ courseType = "", page = 1, perPage = 12, searchQuery = "" } = {}) => {
  const params = new URLSearchParams({
    page,
    per_page: perPage,
    ...(courseType ? { course_type: courseType } : {}),
    ...(searchQuery ? { searchQuery } : {}),
  });
  return axios.get(`${STUDENT_BASE_URL}/courses?${params.toString()}`);
};

export const useFetchAllCourses = ({ courseType = "", page = 1, perPage = 12, searchQuery = "" } = {}) => {
  return useQuery({
    queryKey: ["fetch-all-courses", courseType, page, perPage, searchQuery],
    queryFn: () => fetchAllCourses({ courseType, page, perPage, searchQuery }),
    keepPreviousData: true,
  });
};





export const previewCourses = async (courseId) => {
  return await axios.get(`${STUDENT_BASE_URL}/courses/${courseId}`);
};

export const usePreviewCourses = (courseId) => {
  const { data: previewCourse, isLoading: isLoading } = useQuery({
    queryKey: ["preview-courses", courseId],
    queryFn: () => previewCourses(courseId),
  });
  return { previewCourse, isLoading };
};

// Preview VIDEO
// export const previewVideo = async (courseId, videoId) => {
//   const token = Cookies.get("token");

//   // https://avi-lms-backend.onrender.com/api/v1/courses/:courseId/stream-video/:videoId
//   return await axios.get(`${STUDENT_BASE_URL}/courses/${courseId}/stream-video/${videoId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const usePreviewVideo = (courseId, videoId) => {
//   const { data: previewVideo, isLoading: isLoadingVideo } = useQuery({
//     queryKey: ["preview-video", courseId, videoId],
//     queryFn: ()=>previewVideo(courseId, videoId),
//   });
//   return { previewVideo, isLoadingVideo};
// };

// export const enrollNow = async (data) => {
//   const token = Cookies.get("token");
//   const courseId = localStorage.getItem("courseId");

//   // https://avi-lms-backend.onrender.com/api/v1/courses/:courseId/enroll

//   return await axios.post(
//     `${STUDENT_BASE_URL}/courses/${courseId}/enroll`,
//     data,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );
// };

// export const useEnrollNow = () => {
//   const { mutate:createEnrollNow, isPending:isLoading } = useMutation({
//     mutationFn: enrollNow(),
//     onSuccess: ({ data }) => {
//       toast.success(data.message);
//       localStorage.setItem("courseId", data.data.id);

//       localStorage.setItem("enroll-now", JSON.stringify(data.data));
//     }
//   });
//   return {createEnrollNow, isLoading};
// }
