import { use, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import useUserRole from "../../DashBoard/MakeAdmin/useUserRole";
import { IonLoading } from "@ionic/react";

const RiderRoute = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { role, isLoading: roleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || roleLoading) {
    return <IonLoading isOpen={true} message={"Loading..."} />;
  }

  if (user && role === "rider") {
    return children;
  }

  return <Navigate to="/unauthorized" replace state={{ from: location }} />;
};

export default RiderRoute;