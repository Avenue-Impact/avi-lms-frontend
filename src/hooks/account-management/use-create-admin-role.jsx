// import { BASE_URL } from "@/constant";
import { axiosAdmin } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const createAdminRole = async (data) =>
  await axiosAdmin.post('/', data);

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
