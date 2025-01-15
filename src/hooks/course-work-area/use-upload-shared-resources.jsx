import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const uploadDocument = async ({ data, courseId, cohortId, section }) =>
  await axios.post(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/course-area/sections/${section}/shared-documents`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );

export const useUploadShareResources = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: uploadDocument,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Document uploaded successfully");
      queryClient.invalidateQueries("fetch-shared-documents");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  return { mutate, isPending };
};
