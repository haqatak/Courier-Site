import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import useUserRole from "../../DashBoard/MakeAdmin/useUserRole";
import Loading2 from "../../../Shared/Loading/Loading2";

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = use(AuthContext);
  const { role, isLoading: roleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || roleLoading) {
    return <Loading2></Loading2>;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/unauthorized" replace state={{ from: location }} />;
};

export default AdminRoute;
