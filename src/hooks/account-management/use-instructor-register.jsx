import { axiosInstructor } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const completeInstructorRegistration = async ({ data, token }) =>
  await axiosInstructor.post(
    `/auth/complete-registration?token=${token}`,
    data
  );

export const useInstructorRegister = () => {
  const queryClient = useQueryClient();
  const { mutate: registerInstructor, isPending: isRegistering } = useMutation({
    mutationFn: completeInstructorRegistration,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "Registration completed successfully");
      queryClient.invalidateQueries("get-all-admins-account");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Registration failed. Please try again."
      );
    },
  });

  return { registerInstructor, isRegistering };
};
