import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteStudentApi = async ({ data, courseId }) => {
  const token = Cookies.get("adminToken");
  //avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId/on-demand-section/enrolled-students
  return await axios.delete(
    `${BASE_URL}/courses/${courseId}/on-demand-section/enrolled-students`,
    {
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const useDeleteOndemandStudent = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteOndemandStudent, isPending } = useMutation({
    mutationFn: deleteStudentApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries("get-ondemand-student");
    },
    onError: (error) =>
      toast.error(error.response.data.message || "something went wrong"),
  });

  return {
    deleteOndemandStudent,
    isPending,
  };
};
