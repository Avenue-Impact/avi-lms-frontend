import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_ADMIN_URL;

const loginAdmin = (data) => axios.post(`${url}/login`, data);

export const useLoginAdmin = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginAdmin,
    onSuccess({ data }) {
      console.log(data);
      toast.success("admin logged in successfully");
      Cookies.set("adminToken", data.data.token, {
        expires: 1,
        secure: true,
      });
      navigate("/admin/course/management");
    },
  });

  return { mutate, isPending };
};
