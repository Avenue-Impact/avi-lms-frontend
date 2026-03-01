import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteStudentApi = async ({ data, courseId, cohortId }) => {
  const token = Cookies.get("adminToken");

  return await axios.delete(
    `${BASE_URL}/admins/courses/${courseId}/cohorts/${cohortId}/enrolled-students`,
    {
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const useDeleteLiveStudent = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteStudent, isPending } = useMutation({
    mutationFn: deleteStudentApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries("fetch-all-live-student");
    },
    onError: (error) =>
      toast.error(error.response.data.message || "something went wrong"),
  });

  return {
    deleteStudent,
    isPending,
  };
};
