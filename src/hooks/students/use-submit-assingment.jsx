import { STUDENT_BASE_URL } from "@/constant";
import { useMutation } from "@tanstack/react-query";
import { data } from "autoprefixer";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const submitAssignment = async ({ data, courseId, cohortId, section }) =>
  await axios.post(
    `${STUDENT_BASE_URL}/courses/enrolled/${courseId}/cohorts/${cohortId}/sections/${section}/assignments`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );

export const useSubmitAssignment = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: submitAssignment,
    onSuccess: ({ data }) => {
      toast.success(data.message ?? "Assignment submitted successfully");
    },
  });

  return { mutate, isPending };
};
