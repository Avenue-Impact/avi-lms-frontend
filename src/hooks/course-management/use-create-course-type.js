import { addCourseType } from "@/services/api"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useCreateCourseType = () => {
  const { mutate: createCourseType, isPending: isCreating } = useMutation({
    mutationFn: addCourseType,
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
    onError: (err) => toast.error(err.response.data.message || "something went wrong")
  })
  return {
    createCourseType, isCreating
  }
}