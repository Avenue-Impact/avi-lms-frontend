import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteUserDoc = async ({ courseId, cohortId, section, documentId }) => {

  return await axios.delete(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/course-area/sections/${section}/shared-documents/${documentId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );
};


export const useDeleteUserDocumenet = () => {
  const queryClient = useQueryClient();

  const { mutate:deleteDocs, isPending:delectingDoc } = useMutation({
    mutationFn: deleteUserDoc,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Delete a shared document successful");
      queryClient.invalidateQueries("fetch-shared-documents");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong!!");
    },
  });

  return { deleteDocs, delectingDoc };
};
