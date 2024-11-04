import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../services/api";

export function useProfile() {
  return useQuery({
    queryKey: ['fetch-user-Profile'],
    queryFn: fetchUserProfile
  })
}