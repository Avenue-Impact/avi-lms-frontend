import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const url = `${import.meta.env.VITE_AUTH_URL}/login`;

const loginUser = (data) => axios.post(url, data);

export const useLoginUser = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("login successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Something Went Wrong!!");
    },
  });
  return { mutate, isPending };
};
