import { axiosAdmin } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const fetchAdmin = ({ adminId }) => {
  return axiosAdmin.get(`/${adminId}`).then(res => res.data);
};

export const useFetchAdmin = () => {
  const queryClient = useQueryClient();

  const { mutate: fetAdmin, isPending } = useMutation({
    mutationFn: fetchAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries(["get-admins-account"]);
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    },
  });

  return { fetAdmin, isPending };
};