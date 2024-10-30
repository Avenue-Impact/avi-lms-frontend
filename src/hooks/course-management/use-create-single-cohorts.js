import { addSingleCohort } from "@/services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"


export const useCreateSingleCohort = () => {
  const queryClient = useQueryClient()
  const { mutate: createSingleCohort, isPending: isCreating } = useMutation({
    mutationFn: addSingleCohort,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("get-cohorts")
      toast.success(data.message)},
    onError: (err) => toast.error(err.response.data.message || "something went wrong")
  })

  return { createSingleCohort, isCreating }

}