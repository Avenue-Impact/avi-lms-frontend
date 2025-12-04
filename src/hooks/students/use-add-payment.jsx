import { STUDENT_BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const addPayment = async ({ data, courseId }) =>
  // https://avi-lms-backend.onrender.com/api/v1/courses/:courseId/enroll
  await axios.post(`${STUDENT_BASE_URL}/courses/${courseId}/enroll`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

export const useAddPayment = () => {
  const queryClient = useQueryClient();

  const { mutate: payment, isPending: paymentPending } = useMutation({
    mutationFn: addPayment,
    /**
     * NOTE: Backend only marks a course as fully enrolled after successful payment.
     * For local/frontend testing we optimistically add the course to the enrolled
     * courses cache so that it immediately appears on the dashboard.
     */
    onSuccess: (response, variables) => {
      const backendMessage = response?.data?.message;
      toast.success(
        backendMessage ??
          "Enrollment simulated for testing. Course added to dashboard.",
      );

      const course = variables?.course;
      const accessType = variables?.data?.access_type;

      if (course && accessType === "live class") {
        queryClient.setQueryData(
          ["fetch-enrolled-live-session-course"],
          (old) => {
            if (!old) return old;

            const prevData = old.data?.data ?? {};
            const existingCourses = Array.isArray(prevData.courses)
              ? prevData.courses
              : [];

            const alreadyExists = existingCourses.some(
              (c) => c.id === course.id,
            );
            if (alreadyExists) return old;

            return {
              ...old,
              data: {
                ...old.data,
                data: {
                  ...prevData,
                  courses: [...existingCourses, course],
                },
              },
            };
          },
        );
      }

      if (course && accessType === "on demand") {
        queryClient.setQueryData(
          ["fetch-enrolled-pre-recorded-course"],
          (old) => {
            if (!old) return old;

            const prevData = old.data?.data ?? {};
            const existingCourses = Array.isArray(prevData.courses)
              ? prevData.courses
              : [];

            const alreadyExists = existingCourses.some(
              (c) => c.id === course.id,
            );
            if (alreadyExists) return old;

            return {
              ...old,
              data: {
                ...old.data,
                data: {
                  ...prevData,
                  courses: [...existingCourses, course],
                },
              },
            };
          },
        );
      }

      /**
       * TEMPORARY (for testing):
       *  - We are NOT invalidating/refetching the enrolled-course queries
       *    because the backend won't show the course as enrolled until
       *    real payment completes. We want to keep the optimistic course
       *    visible on the dashboard.
       *
       *  - Redirect to payment checkout is also disabled while testing.
       *
       * When you're done testing, you can restore:
       *
       *  queryClient.invalidateQueries({ queryKey: ["fetch-enrolled-live-session-course"] });
       *  queryClient.invalidateQueries({ queryKey: ["fetch-enrolled-pre-recorded-course"] });
       *
       *  if (response?.data?.url) {
       *    window.location.href = response.data.url;
       *  }
       */
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Failed to make a payment");
    },
  });

  return { payment, paymentPending };
};
