import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const exportData = async () =>
  await axios.get(
    "https://avi-lms-5478f16284c6.herokuapp.com/api/v1/admins/payments/csv",
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("adminToken")}`,
      },
      responseType: "blob",
    },
  );

export const useExportCSV = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: exportData,
    onSuccess: ({ data }) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "payments.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
  });

  return { mutate, isPending };
};
