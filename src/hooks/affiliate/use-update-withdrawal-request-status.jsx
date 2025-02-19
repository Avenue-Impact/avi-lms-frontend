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

const updateWithdrawalRequest = async ({ data, requestId }) =>
  await axios.patch(
    `${BASE_URL}/affiliates/withdrawal-requests/${requestId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
    },
  );

export const useUpdateWithdrawalRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateWithdrawalRequest,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? " status updated successfully");
      queryClient.invalidateQueries("fetch-withdrawal-request");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? " failed to update status");
    },
  });

  return { mutate, isPending };
};
