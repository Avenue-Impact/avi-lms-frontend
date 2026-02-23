import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const addStudentApi = async ({ data, courseId, cohortId }) => {
  return await axios.post(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/enrolled-students`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );
};

export const useAddStudentToLive = () => {
  const queryClient = useQueryClient();

  const { mutate: addStudent, isPending } = useMutation({
    mutationFn: addStudentApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries("fetch-all-live-student");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { addStudent, isPending };
};
