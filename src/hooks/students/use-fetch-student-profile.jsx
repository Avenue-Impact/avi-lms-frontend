import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../services/api";

export function useProfile(options = {}) {
  return useQuery({
    queryKey: ['fetch-user-Profile'],
    queryFn: fetchUserProfile,
    ...options
  })
}