import { axiosAdmin } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Function to unpublish a course
const deleteCourse = async ({ courseId }) => {
  const response = await axiosAdmin.delete(`/courses/${courseId}`);
  return response.data; 
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
