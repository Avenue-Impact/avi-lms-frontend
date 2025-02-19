import { STUDENT_BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";


const requestFinancialAid = async (data) => {
    return await axios.post(
      
      `${STUDENT_BASE_URL}/users/me/financial-aid`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      },
    );
};

// Custom hook for withdrawal request
export const useFinancialAid = () => {
    const queryClient = useQueryClient();
  const { mutate: financialAid, isPending } = useMutation({
    mutationFn: requestFinancialAid,
    onSuccess: ({ data }) => {
      toast.success(data.message ?? "Financial Aid submitted successfully");
            queryClient.invalidateQueries("Financial Aid ");

    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ?? "Financial-Aid request failed",
      );
      //   console.error("Error Response:", error.response?.data);
    },
  });

  return { financialAid, isPending };
};
