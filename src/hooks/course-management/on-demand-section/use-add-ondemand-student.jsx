import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const addStudentApi = async ({ data, courseId }) => {
  return await axios.post(
    `${BASE_URL}/courses/${courseId}/on-demand-section/enrolled-students`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );
};

export const useAddOndemandStudent = () => {
  const queryClient = useQueryClient();
  const { mutate: addStudent, isPending } = useMutation({
    mutationFn: addStudentApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries("get-ondemand-student");
    },
  });

  return {
    addStudent,
    isPending,
  };
};
