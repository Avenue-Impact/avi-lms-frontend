import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { BASE_URL } from "@/constant";

const fetchBankTransfers = async (status) => {
  const token = Cookies.get("adminToken");
  const url = status 
    ? `${BASE_URL}/payments/bank-transfers?status=${status}` 
    : `${BASE_URL}/payments/bank-transfers`;
    
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const approveTransfer = async (id) => {
  const token = Cookies.get("adminToken");
  const response = await axios.post(
    `${BASE_URL}/payments/bank-transfers/approve`,
    { transactionId: id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

const declineTransfer = async (id) => {
  const token = Cookies.get("adminToken");
  const response = await axios.post(
    `${BASE_URL}/payments/bank-transfers/decline`,
    { transactionId: id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const useGetBankTransfers = (status = "pending") => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["bank-transfers", status],
        queryFn: () => fetchBankTransfers(status),
    });
    return { data, isLoading, error };
};

export const useApproveBankTransfer = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: approveTransfer,
        onSuccess: () => {
            toast.success("Transfer approved successfully");
            queryClient.invalidateQueries(["bank-transfers"]);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to approve transfer");
        }
    });

    return { mutate, isPending };
};

export const useDeclineBankTransfer = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: declineTransfer,
        onSuccess: () => {
            toast.success("Transfer declined successfully");
            queryClient.invalidateQueries(["bank-transfers"]);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to decline transfer");
        }
    });

    return { mutate, isPending };
};
