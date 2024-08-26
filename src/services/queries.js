import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "./api";

export function useProfile() {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile
  })
}