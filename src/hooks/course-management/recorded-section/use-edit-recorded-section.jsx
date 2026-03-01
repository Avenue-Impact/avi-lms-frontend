import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const editRecordedSectionApi = async ({ data, section }) => {
  const token = Cookies.get("adminToken");
  const courseId = localStorage.getItem("courseId");
  const cohortId = localStorage.getItem("cohortId");

  return await axios.patch(
    `${BASE_URL}/admins/courses/${courseId}/cohorts/${cohortId}/sections/${section}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export function useEditOnDemandSection() {
  const queryClient = useQueryClient();
  const { mutate: editRecordedSection, isPending: isEditing } = useMutation({
    mutationFn: editRecordedSectionApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["get-single-cohort"],
      });
    },
    onError: (err) =>
      toast.error(err.response.data.message || "something went wrong"),
  });

  return { editRecordedSection, isEditing };
}
