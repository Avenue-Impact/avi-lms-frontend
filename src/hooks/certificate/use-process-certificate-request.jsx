import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const processCertificateRequest = async ({ id, action, rejectionReason }) => {
  const { data } = await axios.post(
    `${BASE_URL}/certificates/requests/${id}/process`,
    { action, rejectionReason },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return data;
};

export const useProcessCertificateRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: processCertificateRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Certificate request processed successfully!");
      queryClient.invalidateQueries(["fetch-certificate-requests"]);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Failed to process certificate request."
      );
    },
  });
};
