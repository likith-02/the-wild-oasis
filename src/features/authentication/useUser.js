import { useQuery } from "@tanstack/react-query";
import { currentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: currentUser,
  });
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
