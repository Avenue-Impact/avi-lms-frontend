import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const importCard = async ({ data, courseId, cohortId }) =>
  await axios.post(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/general/cards/import-cards`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );

export const useImportGeneralCourseProjectAreaCard = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: importCard,
    onSuccess: () => {
      toast.success("Cards imported successfully");
      queryClient.invalidateQueries("project-area-cards");
    },
    onError: (error) => {
      toast.error(error.response.data.message ?? "Something Went Wrong");
    },
  });
  return { mutate, isPending };
};
