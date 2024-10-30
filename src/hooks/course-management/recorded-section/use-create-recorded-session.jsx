import { useMutation, useQueryClient } from "@tanstack/react-query"

import { addRecordedSession } from "@/services/api"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RecordedSessionSchema } from "@/lib/form-schemas/forms-schema"

export const useCreateRecordedSession = () => {
  const queryClient = useQueryClient()
  const { mutate: createRecordedSession, isPending: isCreating } = useMutation({
    mutationFn: addRecordedSession,
    onSuccess: ({ data }) => {

      toast.success(data.message)
      queryClient.invalidateQueries("get-single-cohort")
    },
    onError: (err) => toast.error(err.response.data.message || "something went wrong")
  })
  const form = useForm({
    resolver: zodResolver(RecordedSessionSchema),
    defaultValues: {
      title: "",
      video_title: "",
      overview: "",
      video_from_url: "",
    },
  });

  return { createRecordedSession, isCreating, form }

}