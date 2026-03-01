import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { STUDENT_BASE_URL } from "@/constant";

const fetchPreviewlist = async () => {
  return await axios.get(
    `${STUDENT_BASE_URL}/courses/previewlist`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const useFetchPreviewlist = () =>
  useQuery({
    queryKey: ["fetch-previewlist"],
    queryFn: fetchPreviewlist,
  });
