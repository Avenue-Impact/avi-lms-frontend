import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BASE_URL } from "@/constant";
import { useNavigate } from "react-router-dom";

// Function to unpublish a course
const unPublishCourse = async ( {courseId} ) => {
  
  const token = Cookies.get("adminToken");

  const response = await axios.patch(
    `${BASE_URL}/admins/courses/${courseId}/unpublish`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data; // Returning only the response data for better usability
};

// Custom hook for unpublishing a course
export const useUnpublishCourse = () => {
  // const navigate = useNavigate()
  

  const { mutate: unPublish, isPending: isUnPublishing } = useMutation({
    mutationFn: unPublishCourse,
    onSuccess: (data) => {
      toast.success(data.message || "Course unpublished successfully.");

      // navigate('/admin/course/management')

    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to unpublish course.";
      toast.error(errorMessage);
    },
  });

  
  return {
    unPublish,
    isUnPublishing,
  };
};
