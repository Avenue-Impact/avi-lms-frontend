import { BASE_URL } from "@/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const addUser = async ({ courseId, cohortId, section }) =>
  await axios.post(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/course-area/sections/${section}/shared-documents/add-user`,
  );

export const useAddUserToShareDocument = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: addUser,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "User added successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong!!");
    },
  });

  return { mutate, isPending };
};
