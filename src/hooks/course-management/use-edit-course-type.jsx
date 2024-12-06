import { BASE_URL } from "@/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const editCourseTypeApi = async ({ data, courseId }) => {
  return await axios.patch(`${BASE_URL}/courses/${courseId}/coursetype`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
};

export const useEditCourseType = () => {
  const { mutate: editCourseType, isPending } = useMutation({
    mutationFn: editCourseTypeApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return {
    editCourseType,
    isPending,
  };
};
