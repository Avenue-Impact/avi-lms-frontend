import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const createProjectGroup = async ({ data, courseId, cohortId }) => {
  // https://avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId/cohorts/:cohortId/projects/groups

  const url = `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/groups`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
};

export const useCreateProjectGroup = () => {
  const queryClient = useQueryClient();
  const { mutate: create, isPending } = useMutation({
    mutationFn: createProjectGroup,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "group created successfully");
      queryClient.invalidateQueries("project-area-group");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { create, isPending };
};
