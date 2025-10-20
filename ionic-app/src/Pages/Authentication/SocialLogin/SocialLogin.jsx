import { useContext, useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosInstance from "../../../Hooks/AxiosInstance";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import LoginAnimation from "../../../assets/Ok.json";

const SocialLogin = () => {
  const { googleUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const axiosInstance = AxiosInstance();

  const [success, setSuccess] = useState(false);

  const handleGoogleUser = () => {
    googleUser()
      .then(async (result) => {
        const user = result.user;
        const userInfo = {
          email: user.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        await axiosInstance.post("/users", userInfo);
        setSuccess(true);
        setTimeout(() => {
          navigate(from);
        }, 2000);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: "Please try again with a valid account.",
          confirmButtonColor: "#03373d",
        });
      });
  };

  return (
    <div>
      {success ? (
        <div className="ion-text-center">
          <Lottie animationData={LoginAnimation} loop={false} />
          <h2 className="ion-margin-top">Google Login Successful 🎉</h2>
        </div>
      ) : (
        <>
          <p className="ion-text-center ion-margin-top">Or</p>
          <IonButton
            expand="block"
            onClick={handleGoogleUser}
            className="ion-margin-top"
            color="danger"
          >
            <IonIcon slot="start" icon={logoGoogle} />
            Login with Google
          </IonButton>
        </>
      )}
    </div>
  );
};

export default SocialLogin;
