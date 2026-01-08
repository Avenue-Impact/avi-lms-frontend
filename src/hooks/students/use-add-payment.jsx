import { STUDENT_BASE_URL } from "@/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// const addPayment = async ({ data, courseId }) =>
//   // https://avi-lms-backend.onrender.com/api/v1/courses/:courseId/enroll
//   await axios.post(`${STUDENT_BASE_URL}/courses/${courseId}/enroll`, data, {
//     headers: {
//       Authorization: `Bearer ${Cookies.get("token")}`,
//     },
//   });

const addPayment = async ({ data, courseId }) => {
  const response = await axios.post(
    `${STUDENT_BASE_URL}/courses/${courseId}/enroll`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );

  console.log("Response from addPayment:", response);
  return response;
};

export const useAddPayment = () => {
  const { mutate: payment, isPending: paymentPending } = useMutation({
    mutationFn: addPayment,
    onSuccess: ({ data }) => {
      // toast.success(data?.message ?? "Successfully registered for course");
      // TESTING: Skip payment redirect - just complete enrollment
      if (data?.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Failed to make a payment");
    },
  });

  return { payment, paymentPending };
};
