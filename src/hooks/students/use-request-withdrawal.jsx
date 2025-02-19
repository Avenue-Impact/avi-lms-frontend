import { STUDENT_BASE_URL } from "@/constant";
import { useMutation } from "@tanstack/react-query";
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
  const { mutate: withdrawal, isPending } = useMutation({
    mutationFn: requestWithdrawal,
    onSuccess: ({ data }) => {
      toast.success(data.message ?? "Request submitted successfully");
    //   console.log("Success Response:", data);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Withdrawal request failed");
    //   console.error("Error Response:", error.response?.data);
    },
  });

  return { withdrawal, isPending };
};
