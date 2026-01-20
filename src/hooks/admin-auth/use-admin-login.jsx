import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_ADMIN_URL;

const loginAdmin = (data) =>
  axios.post(`${url}/auth/login`, data, { withCredentials: true });

export const useLoginAdmin = () => {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginAdmin,
    onSuccess({ data }) {
      console.log("Login Response Data:", data);
      const token = data.data?.token || data.token;
      console.log("Extracted Token:", token);
      
      // Strict check to prevent "undefined" string
      if (token && token !== "undefined") {
        Cookies.set('adminToken', token);
      } else {
        console.error("Token not found or is undefined");
      }
      toast.success("admin logged in successfully");
      // Cookies are now handled by the backend (HttpOnly)
      navigate("/admin/data-management"); // Fixed path to course management
    },
    onError(error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    },
  });

  return { mutate, isPending, error };
};
