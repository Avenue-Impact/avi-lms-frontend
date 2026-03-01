import { useContext } from "react";
import { CredentialContext } from "@/providers/CredentialsProvider";

export const useCredentials = () => {
  const context = useContext(CredentialContext);
  return context;
};
