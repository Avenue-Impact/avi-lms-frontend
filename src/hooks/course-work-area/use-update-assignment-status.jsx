import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const updateAssignment = async ({
  courseId,
  cohortId,
  section,
  assignmentId,
  data,
}) =>
  await axios.patch(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/course-area/sections/${section}/assignments/${assignmentId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
        "Content-Type": "application/json",
      },
    },
  );

export const useUpdateAssignment = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateAssignment,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? " status updated successfully");
      queryClient.invalidateQueries("fetch-assignments");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? " failed to update status");
    },
  });

  return { mutate, isPending };
};
