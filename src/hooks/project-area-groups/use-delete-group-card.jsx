import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteCardApi = ({ courseId, cohortId, cardId, groupId }) => {
  const url = `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/groups/${groupId}/cards/${cardId}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
};

export const useDeleteGroupCard = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCard, isPending } = useMutation({
    mutationFn: deleteCardApi,
    onSuccess: () => {
      toast.success("card deleted successfully");
      queryClient.invalidateQueries("fetch-single-project-group");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });
  return { deleteCard, isPending };
};
