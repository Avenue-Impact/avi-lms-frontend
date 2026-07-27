import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";
import toast from "react-hot-toast";

const processCertificateRequest = async ({ id, action, rejectionReason }) => {
  const { data } = await axiosAdmin.post(
    `/certificates/requests/${id}/process`,
    { action, rejectionReason }
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
