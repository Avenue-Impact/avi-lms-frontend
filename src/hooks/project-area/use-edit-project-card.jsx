import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const editProjectCard = async ({ data, courseId, cohortId, cardId }) =>
  await axios.patch(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/general/cards/${cardId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
        "Content-Type": "application/json",
      },
    },
  );

export const useEditCard = () => {
  const queryClient = useQueryClient();
  const { mutate: editCard, isPending } = useMutation({
    mutationFn: editProjectCard,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("project-area-cards");
      console.log(data);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  return { editCard, isPending };
};
