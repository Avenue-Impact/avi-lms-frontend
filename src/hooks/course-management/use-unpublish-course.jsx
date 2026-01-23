import { axiosAdmin } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Function to unpublish a course
const unPublishCourse = async ( {courseId} ) => {
  const response = await axiosAdmin.patch(`/courses/${courseId}/unpublish`, {});
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
