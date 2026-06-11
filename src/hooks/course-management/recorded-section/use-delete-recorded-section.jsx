import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteRecordedSectionApi = ({ section, courseId, cohortId }) => {
  const token = Cookies.get("adminToken");

  const url = `/courses/${courseId}/cohorts/${cohortId}/sections/${section}`;

  return axiosAdmin.delete(url,{
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
