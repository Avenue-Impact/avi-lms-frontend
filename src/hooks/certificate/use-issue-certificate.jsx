import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const issueCertificate = async ({ data, id }) => {

  const url = `${BASE_URL}/courses/${id}/certificates`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("adminToken")}`,
    },
  });
};

export const useIssueCertificate = (id) => {
  
//   const queryClient = useQueryClient();

  const { mutate: createCert, isPending } = useMutation({
    mutationFn: (data) => issueCertificate({ id, data }), 
    onSuccess: (response) => {
      toast.success(
        response?.data?.message ?? "Certificate issued successfully",
      );
    //   queryClient.invalidateQueries(["certificate-issued", id]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  return { createCert, isPending };
};

