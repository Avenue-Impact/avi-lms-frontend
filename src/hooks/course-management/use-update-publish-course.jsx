// import { BASE_URL } from "@/constant";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import Cookies from "js-cookie";

// const updateWithdrawalRequest = async (requestId) =>

//   await axios.patch(`${BASE_URL}/affiliates/withdrawal-requests/${requestId}`, {
//     headers: {
//       Authorization: `Bearer ${Cookies.get("adminToken")}`,
//     },
//   });

// export const useUpdateWithdrawalRequest = (requestId) => {
//   return useQuery({
//     queryKey: ["update-withdrawal-request", requestId],
//     queryFn: updateWithdrawalRequest(requestId),
//   });
// };

import { axiosAdmin } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const updatePublishCourse = async ({ data, courseId }) =>
  await axiosAdmin.patch(`/courses/${courseId}/publish`, data);

export const useUpdatePublishCourse = () => {
  const queryClient = useQueryClient();
  const { mutate:publish, isPending, isError } = useMutation({
    mutationFn: updatePublishCourse,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? " Course published successfully");
      queryClient.invalidateQueries("fetch-publish-course");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? " failed to update status");
    },
  });

  return { publish, isPending, isError };
};
