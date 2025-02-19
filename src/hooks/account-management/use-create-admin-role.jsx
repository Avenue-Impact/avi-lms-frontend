// import { BASE_URL } from "@/constant";
import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const createAdminRole = async (data) =>
  await axios.post(BASE_URL, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });

export const useCreateAdminRole = () => {
  const queryClient = useQueryClient();
  const { mutate: create, isPending } = useMutation({
    mutationFn: createAdminRole,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Admin created successfully");
      queryClient.invalidateQueries("get-all-admins-account");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  return { create, isPending };
};
