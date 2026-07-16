import { STUDENT_BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const requestCertificate = async (courseId) => {
  const { data } = await axios.post(
    `${STUDENT_BASE_URL}/courses/certificates/request`,
    { courseId },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return data;
};

export const useRequestCertificate = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => requestCertificate(courseId),
    onSuccess: (data) => {
      toast.success(data.message || "Certificate request submitted successfully!");
      queryClient.invalidateQueries(["certificate-status", courseId]);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Failed to submit certificate request."
      );
    },
  });
};
