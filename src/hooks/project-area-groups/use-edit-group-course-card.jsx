import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const editProjectCard = async ({ data, courseId, cohortId, groupId, cardId }) =>
  // https://avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId/cohorts/:cohortId/projects/groups/:groupId/cards/:cardId
  await axios.patch(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/groups/${groupId}/cards/${cardId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
        "Content-Type": "application/json",
      },
    },
  );

export const useEditGroupCard = () => {
  const queryClient = useQueryClient();
  const { mutate: editCard, isPending } = useMutation({
    mutationFn: editProjectCard,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("fetch-single-project-group");
      toast.success(data.message ?? "Card Updated successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  return { editCard, isPending };
};
