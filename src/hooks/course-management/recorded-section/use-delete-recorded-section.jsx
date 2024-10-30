import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteRecordedSectionApi = (section) => {
  const token = Cookies.get("adminToken");

  const courseId = localStorage.getItem("courseId");
  const cohortId = localStorage.getItem("cohortId");
  const url = `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/sections/${section}`;

  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useDeleteRecordedSection = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteRecordedSection, isPending: isDeleting } = useMutation({
    mutationFn: deleteRecordedSectionApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.data.message);
      queryClient.invalidateQueries("get-demand-course");
    },
    onError: (err) =>
      toast.error(err.response.data.message || "something went wrong"),
  });

  return {
    deleteRecordedSection,
    isDeleting,
  };
};
