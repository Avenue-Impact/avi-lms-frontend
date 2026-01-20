import axios from "axios";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BASE_URL } from "@/constant";

// Function to unpublish a course
const deleteCourse = async ({courseId}) => {
  const token = Cookies.get("adminToken");

  // https://avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId

  const response = await axios.delete(`${BASE_URL}/admins/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Returning only the response data for better usability
};

// Custom hook for unpublishing a course
export const useDeleteCourse = () => {
  const { mutate: deleted, isPending: isDeleting } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: (data) => {
      toast.success(data.message || "Course deleted successfully.");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete course.";
      toast.error(errorMessage);
    },
  });

  // console.log("isDeleting in hook:", isDeleting);

  return {
    deleted,
    isDeleting,
  };
};
