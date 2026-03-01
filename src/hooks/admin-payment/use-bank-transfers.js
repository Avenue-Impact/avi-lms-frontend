import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { BASE_URL } from "@/constant";

const fetchPendingTransfers = async () => {
  const token = Cookies.get("adminToken");
  const response = await axios.get(
    `${BASE_URL}/payments/bank-transfers/pending`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

export const useGetPendingBankTransfers = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["pending-bank-transfers"],
        queryFn: fetchPendingTransfers,
    });
    return { data, isLoading, error };
};

export const useApproveBankTransfer = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: approveTransfer,
        onSuccess: () => {
            toast.success("Transfer approved successfully");
            queryClient.invalidateQueries(["pending-bank-transfers"]);
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
            queryClient.invalidateQueries(["pending-bank-transfers"]);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to decline transfer");
        }
    });

    return { mutate, isPending };
};
