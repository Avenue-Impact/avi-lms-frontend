import { axiosInstructor } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const validateInviteToken = async (token) => {
  const { data } = await axiosInstructor.get(`/invite/validate?token=${token}`);
  return data;
};

export const useValidateInviteToken = (token) => {
  return useQuery({
    queryKey: ["validate-invite-token", token],
    queryFn: () => validateInviteToken(token),
    enabled: !!token,
    retry: false,
  });
};
