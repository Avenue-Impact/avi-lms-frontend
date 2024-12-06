import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const createToolsCard = async ({ data, courseId, cohortId }) => {
  const url = `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/general/resources`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
};

export const useCreateToolsCard = () => {
  const queryClient = useQueryClient();
  const { mutate: create, isPending } = useMutation({
    mutationFn: createToolsCard,
    onSuccess: () => {
      toast.success("card created");
      queryClient.invalidateQueries("project-area-cards");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { create, isPending };
};
