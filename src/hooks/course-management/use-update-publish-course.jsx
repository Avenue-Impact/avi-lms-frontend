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

import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const updatePublishCourse = async ({ data, courseId }) =>
  // https://avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId/publish
  await axios.patch(`${BASE_URL}/admins/courses/${courseId}/publish`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

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
