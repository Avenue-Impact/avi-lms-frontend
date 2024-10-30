import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const moveRecordedVideo = ({ section, data }) => {
  const courseId = localStorage.getItem("courseId");
  const cohortId = localStorage.getItem("cohortId");
  const token = Cookies.get("adminToken");

  const url = `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/sections/${section}/move-video`;
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useMoveRecordedVideo = () => {
  const queryClient = useQueryClient();
  const { mutate: moveVideo, isPending: isMovingVideo } = useMutation({
    mutationFn: moveRecordedVideo,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.data.message);
      queryClient.invalidateQueries("get-single-cohort");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response.data.message);
    },
  });

  return { moveVideo, isMovingVideo };
};
