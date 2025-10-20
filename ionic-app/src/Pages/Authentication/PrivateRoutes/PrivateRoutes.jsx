import { use, useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { IonLoading } from "@ionic/react";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <IonLoading isOpen={true} message={"Loading..."} />;
  }
  if (!user) {
    return (
      <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    );
  }

  return children;
};

export default PrivateRoutes;
