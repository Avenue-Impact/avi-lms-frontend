import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

// Define the base URL for the API
const BASE_URL = `https://avi-lms-backend.onrender.com/api/v1/admins`;

// Function to fetch account management data
const fetchAccountManagement = async () => {
  const token = Cookies.get("adminToken");

  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  // Return the axios request
  return await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Custom hook to fetch account management data
export const useFetchAccountManagement = () =>
  useQuery({
    queryKey: ["get-all-admins-account"],
    queryFn: fetchAccountManagement,
  });
