import axios from "axios";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BASE_URL } from "@/constant";

// Function to unpublish a course
const unPublishCourse = async ( {courseId} ) => {
  
  const token = Cookies.get("adminToken");

  const response = await axios.patch(
    `${BASE_URL}/courses/${courseId}/unpublish`,
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
  const { mutate: unPublish, isPending: isUnPublishing } = useMutation({
    mutationFn: unPublishCourse,
    onSuccess: (data) => {
      toast.success(data.message || "Course unpublished successfully.");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to unpublish course.";
      toast.error(errorMessage);
    },
  });

  console.log("isUnPublishing in hook:", isUnPublishing); // Debugging
  
  return {
    unPublish,
    isUnPublishing,
  };
};
