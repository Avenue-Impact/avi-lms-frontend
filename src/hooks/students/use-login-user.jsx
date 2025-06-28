import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const url = `${import.meta.env.VITE_AUTH_URL}/login`;

const loginUser = async (data) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      // Add timeout for mobile networks
      timeout: 10000
    });
    return response;
  } catch (error) {
    // Handle network errors
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
};

export const useLoginUser = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      if (response.data.status === "success") {
        toast.success("Login successful");
      }
    },
    onError: (error) => {
      // Handle specific error cases
      if (error.message === 'Network error. Please check your connection.') {
        toast.error(error.message);
      } else {
        toast.error(error?.response?.data?.message ?? "Login failed. Please try again.");
      }
    },
  });
  return { mutate, isPending };
};
