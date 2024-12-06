import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const createMultipleProjectGroup = async ({ data, courseId, cohortId }) => {
    // https://avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId/cohorts/:cohortId/projects/groups
    // https://avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId/cohorts/:cohortId/projects/groups/multiple

  const url = `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/groups/multiple`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
};

export const useMultipleProjectGroup = () => {
  const queryClient = useQueryClient();
  const { mutate: create, isPending } = useMutation({
    mutationFn: createMultipleProjectGroup,
    onSuccess: () => {
      toast.success("multiple group created");
      queryClient.invalidateQueries("multiple-project-group");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { create, isPending };
};
