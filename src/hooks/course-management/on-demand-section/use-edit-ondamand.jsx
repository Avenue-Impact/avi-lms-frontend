import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const editDemandSection = async ({ data, section }) => {
  const token = Cookies.get("adminToken");
  const courseId = localStorage.getItem("courseId");

  return await axios.patch(
    `${BASE_URL}/courses/${courseId}/on-demand-section/${section}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export function useEditOnDemandSection() {
  const queryClient = useQueryClient();
  const { mutate: editOnDemandCourse, isPending: isEditing } = useMutation({
    mutationFn: editDemandSection,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["get-demand-course"],
      });
    },
    onError: (err) =>
      toast.error(err.response.data.message || "something went wrong"),
  });

  return { editOnDemandCourse, isEditing };
}
