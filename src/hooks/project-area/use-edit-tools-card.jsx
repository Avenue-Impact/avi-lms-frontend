import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const editToolsCard = async ({ data, courseId, cohortId, resourceId }) =>
  // https://avi-lms-backend.onrender.com/api/v1/courses/:courseId/cohorts/:cohortId/projects/general/resources/:resourceId

  await axios.patch(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/general/resources/${resourceId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
        "Content-Type": "application/json",
      },
    },
  );

export const useEditToolsCard = () => {
  const queryClient = useQueryClient();
  const { mutate: editCard, isPending } = useMutation({
    mutationFn: editToolsCard,
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
