import { useContext } from "react";
import { CredentialContext } from "@/providers/CredentialsProvider";

export const useCredentials = () => {
  return useContext(CredentialContext);
};
