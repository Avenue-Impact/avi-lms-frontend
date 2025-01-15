import { BASE_URL } from "@/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const addUser = async ({ courseId, cohortId, section, data }) =>
  await axios.post(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/course-area/sections/${section}/shared-documents/add-user`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );

export const useAddUserToShareDocument = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: addUser,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "user add successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });

  return { mutate, isPending };
};
