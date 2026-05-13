import { STUDENT_BASE_URL } from "@/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const payNextInstallment = async ({ enrollmentId, gateway }) => {
  const token = Cookies.get("token");
  return axios.post(
    `${STUDENT_BASE_URL}/courses/installments/${enrollmentId}/pay`,
    { gateway },
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

export const usePayInstallment = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: payNextInstallment,
  });
  return { payInstallment: mutate, isPending, isError, error };
};
