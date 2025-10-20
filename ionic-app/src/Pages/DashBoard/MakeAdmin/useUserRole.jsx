import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import AxiosHook from "../../../Hooks/AxiosHook";

const useUserRole = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = AxiosHook();

  const {
    data: role = "user",
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email && !authLoading, // only run when user is ready
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${user.email}`);
      return res.data.role || "user"; // fallback
    },
  });

  return { role, isLoading, refetch };
};

export default useUserRole;
