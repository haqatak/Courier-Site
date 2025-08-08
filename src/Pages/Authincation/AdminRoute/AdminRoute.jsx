import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import useUserRole from "../../DashBoard/MakeAdmin/useUserRole";

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = use(AuthContext);
  const { role, isLoading: roleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || roleLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/unauthorized" replace state={{ from: location }} />;
};

export default AdminRoute;
