import { STUDENT_BASE_URL } from "@/constant";
import { useMutation } from "@tanstack/react-query";
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
  const { mutate: payment, isPending: paymentPending } = useMutation({
    mutationFn: addPayment,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Payment successful");
      // Redirect to the Stripe checkout URL
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
