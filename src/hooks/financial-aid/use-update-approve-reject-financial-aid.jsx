import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const updateFinancialStatus = async ({ data, id }) =>
  // https://avi-lms-backend.onrender.com/api/v1/admins/financial-aid/:id
  await axios.patch(`${BASE_URL}/financial-aid/${id}`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useFinancialStatus = () => {
  const queryClient = useQueryClient();
  const { mutate:isUpdating, isPending } = useMutation({
    mutationFn: updateFinancialStatus,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Financial Aid updated successfully");
      queryClient.invalidateQueries("fetch-financial-aid");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? " failed to update status");
    },
  });

  return { isUpdating, isPending };
};
