import { axiosAdmin } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const createAffiliatePercentage = async ( data ) => {
  return axiosAdmin.post("/affiliates/percentage", data);
};

export const useAffiliatePercentage = () => {
  const queryClient = useQueryClient();
  const { mutate: create, isPending } = useMutation({
    mutationFn: createAffiliatePercentage,
    onSuccess: () => {
      toast.success("Affiliate percentage set successfully");
      queryClient.invalidateQueries("set-affiliate-percentage");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { create, isPending };
};
