import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteSingleProjectGroup = ({ courseId, cohortId, groupId }) => {
    // https://avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId/cohorts/:cohortId/projects/groups/:groupId
  const url = `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/groups/${groupId}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
};

export const useDeleteSingleProject = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteSingleGroup, isPending } = useMutation({
    mutationFn: deleteSingleProjectGroup,
    onSuccess: () => {
      toast.success("card deleted successfully");
      queryClient.invalidateQueries("project-area-cards");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });
  return { deleteSingleGroup, isPending };
};
