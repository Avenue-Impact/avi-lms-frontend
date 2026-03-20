import { useCreateAdminPassword } from "./use-create-admin-password";

export const useInstructorRegister = () => {
  const { create, isPending: isRegistering } = useCreateAdminPassword();

  return { 
    registerInstructor: ({ data, token }, options) => create({ data, token }, options), 
    isRegistering
  };
};
