import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const mutateSection = async ({ section, courseId }) => {
  const token = Cookies.get("adminToken");

  const url = `${BASE_URL}/courses/${courseId}/on-demand-section/${section}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useDeleteOndemandSection = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteSection, isPending: isDeleting } = useMutation({
    mutationFn: mutateSection,
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["get-demand-course"] });
    },
    onError: (err) =>
      toast.error(err.response.data.message || "something went wrong"),
  });

  return { deleteSection, isDeleting };
};
