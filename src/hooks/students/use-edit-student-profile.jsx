import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { STUDENT_BASE_URL } from "@/constant";

const editStudentProfile = async (data) => {
  const token = Cookies.get("token");
  const url = import.meta.env.VITE_USER_URL || `${STUDENT_BASE_URL}/users/me`;
  return axios.patch(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useEditStudentProfile = () => {
  const queryClient = useQueryClient();

  const { mutate: editProfile, isPending: isEditing } = useMutation({
    mutationFn: editStudentProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-user-Profile"]);
      queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
  return {
    editProfile,
    isEditing,
  };
};