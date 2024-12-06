import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const editProjectGroup = async ({ data, courseId, cohortId, groupId }) => {
  const url = `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/groups/${groupId}`;
  return axios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
};

export const useEditProjectGroup = () => {
  const queryClient = useQueryClient();
  const { mutate: editGroupProject, isPending } = useMutation({
    mutationFn: editProjectGroup,
    onSuccess: () => {
      toast.success("Edit Successfully");
      queryClient.invalidateQueries("fetch-project-groups");
    },
    onError: (error) => {
      toast.error(error.response.data.message ?? "Something went wrong");
    },
  });

  return { editGroupProject, isPending };
};
