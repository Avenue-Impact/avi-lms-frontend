import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteStudent = ({ courseId, cohortId, groupId, studentId }) =>
  axios.delete(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/groups/${groupId}/students/${studentId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );

export const useDeleteStudentFromGroup = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("fetch-student-in-group");
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message ?? "Something went wrong");
    },
  });

  return { mutate, isPending };
};
