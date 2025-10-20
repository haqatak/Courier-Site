import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonRouterLink,
} from "@ionic/react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import AxiosInstance from "../../../Hooks/AxiosInstance";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import SuccessAnimation from "../../../assets/Login.json";

const Registration = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.photo);
      await AxiosInstance.post("/users", {
        name: data.name,
        email: data.email,
        role: "user",
      });
      reset();
      setSuccess(true);
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 2500);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        {!success ? (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-text-center">
                Register
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <IonItem>
                  <IonLabel position="floating">Name</IonLabel>
                  <IonInput
                    type="text"
                    {...register("name", { required: true })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput
                    type="email"
                    {...register("email", { required: true })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    {...register("password", { required: true })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Photo URL</IonLabel>
                  <IonInput type="text" {...register("photo")} />
                </IonItem>
                <IonButton
                  type="submit"
                  expand="block"
                  className="ion-margin-top"
                >
                  Register
                </IonButton>
              </form>
              <p className="ion-text-center ion-margin-top">
                Already have an account?{" "}
                <IonRouterLink routerLink="/login">Login</IonRouterLink>
              </p>
              <div className="ion-text-center ion-margin-top">OR</div>
              <SocialLogin />
            </IonCardContent>
          </IonCard>
        ) : (
          <div className="ion-text-center">
            <Lottie animationData={SuccessAnimation} loop={false} />
            <p className="ion-margin-top">
              Registration Successful! Redirecting...
            </p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Registration;
