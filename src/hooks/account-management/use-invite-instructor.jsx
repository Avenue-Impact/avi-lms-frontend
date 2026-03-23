import { useCreateAdminRole } from "./use-create-admin-role";

export const useInviteInstructor = () => {
  const { create, isPending: isInviting } = useCreateAdminRole();

  return { 
    inviteInstructor: (email, options) => create({ email, role: "Instructor" }, options), 
    isInviting 
  };
};
