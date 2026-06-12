import { checkMentorshipAccess } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useCheckMentorshipAccess = () => {
  return useQuery({
    queryKey: ["mentorship-access"],
    queryFn: async () => {
      const res = await checkMentorshipAccess();
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
