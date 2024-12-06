import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteToolsCardApi = ({ courseId, cohortId, resourceId }) => {
  const url = `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/general/resources/${resourceId}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
};

export const useDeleteToolsCard = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCard, isPending } = useMutation({
    mutationFn: deleteToolsCardApi,
    onSuccess: () => {
      toast.success("card deleted successfully");
      queryClient.invalidateQueries("project-area-cards");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });
  return { deleteCard, isPending };
};
