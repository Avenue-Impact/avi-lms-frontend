import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const createAffiliatePercentage = async ( data ) => {
    
  const url = `${BASE_URL}/affiliates/percentage`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
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
