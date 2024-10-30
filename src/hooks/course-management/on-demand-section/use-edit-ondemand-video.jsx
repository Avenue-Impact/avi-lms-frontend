import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const editVideo = async ({ data, section, id }) => {
  const courseId = localStorage.getItem("courseId");
  const token = Cookies.get("adminToken");

  const url = `${BASE_URL}/courses/${courseId}/on-demand-section/${section}/recordings/${id}`;

  return axios.patch(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useEditOnDemandVideo = () => {
  const queryClient = useQueryClient();
  const { mutate: editOnDemandVideo, isPending: isEditing } = useMutation({
    mutationFn: editVideo,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries("get-single-cohort");
    },
    onError: (err) =>
      toast.error(err.response.data.message || "something went wrong"),
  });

  return {
    editOnDemandVideo,
    isEditing,
  };
};
