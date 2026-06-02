import { STUDENT_BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const addVideoProgress = async ({ courseId, video_id, current_time, progress_percentage, is_completed, timestamp, cohort_id }) => {
  return axios.post(
    `${STUDENT_BASE_URL}/courses/${courseId}/video-progress?video_id=${video_id}`,
    {
      current_time,
      progress_percentage,
      is_completed,
      timestamp,
      video_id,
      course_id: courseId,
      cohort_id,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const useAddVideoProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addVideoProgress,
    onSuccess: () => {
      // Invalidate the course lists to show updated progress percentages
      queryClient.invalidateQueries({ queryKey: ["fetch-enrolled-live-session-course"] });
      queryClient.invalidateQueries({ queryKey: ["fetch-enrolled-pre-recorded-course"] });
    },
    onError: (error) => {
      console.error("Failed to save video progress", error);
    },
  });
};
