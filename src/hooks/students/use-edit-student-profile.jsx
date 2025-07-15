import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const editStudentProfile = async (data) => {
  const token = Cookies.get("token");
  const url = "https://avi-lms-5478f16284c6.herokuapp.com/api/v1/users/me";
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
      queryClient.invalidateQueries("fetch-user-Profile");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    editProfile,
    isEditing,
  };
};
