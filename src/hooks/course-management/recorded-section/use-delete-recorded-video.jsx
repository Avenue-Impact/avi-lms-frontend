import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteRecordedVideo = async ({ section, id }) => {
  const courseId = localStorage.getItem("courseId");
  const cohortId = localStorage.getItem("cohortId");
  const token = Cookies.get("adminToken");

  const url = `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/sections/${section}/recorded-session/${id}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useDeleteRecordedVideo = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteVideo, isPending: isDeleting } = useMutation({
    mutationFn: deleteRecordedVideo,
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries("get-demand-course");
    },
    onError: (err) =>
      toast.error(err.response.data.message || "something went wrong"),
  });

  return { deleteVideo, isDeleting };
};
