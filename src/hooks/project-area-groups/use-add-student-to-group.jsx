import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const addStudents = ({ data, courseId, cohortId, groupId }) =>
  axios.post(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/groups/${groupId}/students`,

    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );

export const useAddStudentToGroup = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addStudents,
    onSuccess: () => {
      toast.success("Students added successfully");
      queryClient.invalidateQueries("fetch-student-in-group");
    },
    onError: (err) => {
      toast.error(err.response.data.message ?? "Something went wrong");
    },
  });

  return { mutate, isPending };
};
