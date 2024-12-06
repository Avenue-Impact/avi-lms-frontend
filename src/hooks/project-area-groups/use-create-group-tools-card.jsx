import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const createToolsCard = async ({ data, courseId, cohortId, groupId }) => {
  // https://avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId/cohorts/:cohortId/projects/groups/:groupId/resources
  const url = `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/groups/${groupId}/resources`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
};

export const useCreateGroupToolsCard = () => {
  const queryClient = useQueryClient();
  const { mutate: create, isPending } = useMutation({
    mutationFn: createToolsCard,
    onSuccess: () => {
      toast.success("card created");
      queryClient.invalidateQueries("fetch-single-project-group");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { create, isPending };
};
