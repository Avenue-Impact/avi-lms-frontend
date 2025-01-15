import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const importCard = async ({ data, courseId, cohortId, groupId }) =>
  await axios.post(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/groups/${groupId}/cards/import-cards`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );

export const useImportGroupProjectCard = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: importCard,
    onSuccess: ({ data }) => {
      data?.cards.length < 1
        ? toast.success("No card is available ")
        : toast.success("Cards imported successfully");
      queryClient.invalidateQueries("fetch-single-project-group");
    },
    onError: (error) => {
      toast.error(error.response.data.message ?? "Something Went Wrong");
    },
  });
  return { mutate, isPending };
};
