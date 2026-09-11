import { STUDENT_BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Function to send withdrawal request
const requestWithdrawal = async (data) => {
  return await axios.post(
    `${STUDENT_BASE_URL}/users/me/referrals/withdraw`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    },
  );
};

// Custom hook for withdrawal request
export const useRequestWithdrawal = () => {
  const queryClient = useQueryClient();
  const { mutate: withdrawal, isPending } = useMutation({
    mutationFn: requestWithdrawal,
    onSuccess: ({ data }) => {
      toast.success(data.message ?? "Request submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["fetch-referrals"] });
      queryClient.invalidateQueries({ queryKey: ["fetch-wishlists"] });
      queryClient.invalidateQueries({ queryKey: ["fetch-my-withdrawals"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Withdrawal request failed");
    },
  });

  return { withdrawal, isPending };
};
