import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const editToolsCard = async ({
  data,
  courseId,
  cohortId,
  resourceId,
  groupId,
}) =>
  await axios.patch(
    `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/projects/groups/${groupId}/resources/${resourceId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
        "Content-Type": "application/json",
      },
    },
  );

export const useEditGroupToolsCard = () => {
  const queryClient = useQueryClient();
  const { mutate: editCard, isPending } = useMutation({
    mutationFn: editToolsCard,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("fetch-single-project-group");

      toast.success(data.message ?? " data updated successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  return { editCard, isPending };
};
