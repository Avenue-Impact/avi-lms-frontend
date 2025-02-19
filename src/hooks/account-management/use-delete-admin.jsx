import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const deleteAdmin = ({ adminId }) => {
  const url = `${BASE_URL}/${adminId}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();
  const { mutate: delAdmin, isPending } = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      toast.success("Admin deleted successfully");
      queryClient.invalidateQueries("get-all-admins-account");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });
  return { delAdmin, isPending };
};
