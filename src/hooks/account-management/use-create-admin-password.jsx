// import { BASE_URL } from "@/constant";
import { axiosAdmin } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// const BASE_URL = `https://avi-lms-backend.onrender.com/api/v1/admins`;

const createAdminPassword = async ({ data, code }) =>
  await axiosAdmin.post(
    `/auth/create-password?confirm_code=${code}`,
    data
  );

export const useCreateAdminPassword = () => {
  const queryClient = useQueryClient();
  const { mutate: create, isPending } = useMutation({
    mutationFn: createAdminPassword,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Admin created successfully");
      queryClient.invalidateQueries("get-all-admins-account");
      return;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong hh");
    },
  });

  return { create, isPending };
};
