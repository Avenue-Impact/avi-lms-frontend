import { addLiveSession } from "@/services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCreateLiveSession = () => {
  const queryClient = useQueryClient()
  const { mutate: createLiveSession, isPending: isCreating } = useMutation({
    mutationFn: addLiveSession,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("get-single-cohort")
      toast.success(data.message)
    },
    onError: (err) => toast.error(err.response.data.message || "something went wrong")
  })

  return { createLiveSession, isCreating }
}