import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  IonText,
} from "@ionic/react";
import SocialLogin from "../SocialLogin/SocialLogin";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import Lottie from "lottie-react";
import LoginAnimation from "../../../assets/Ok.json";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const [success, setSuccess] = useState(false);

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          navigate(from);
        }, 2000);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again!",
          confirmButtonColor: "#03373d",
        });
      });
  };

  return (
    <IonPage>
      <IonContent>
        <IonCard className="w-full max-w-lg">
          <IonCardHeader>
            <IonCardTitle className="text-5xl font-bold text-primary my-3">
              Login now!
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {success ? (
              <div className="flex flex-col items-center justify-center">
                <Lottie animationData={LoginAnimation} loop={false} />
                <h2 className="text-primary text-2xl font-bold mt-4">
                  Login Successful 🎉
                </h2>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput type="email" {...register("email")} />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                  />
                </IonItem>
                {errors.password?.type === "required" && (
                  <IonText color="danger">
                    <p className="ion-padding-start">Password is required</p>
                  </IonText>
                )}
                {errors.password?.type === "minLength" && (
                  <IonText color="danger">
                    <p className="ion-padding-start">
                      Password must be at least 6 characters
                    </p>
                  </IonText>
                )}
                <IonButton
                  expand="block"
                  type="submit"
                  className="ion-margin-top"
                >
                  Login
                </IonButton>
                <p className="ion-text-center ion-margin-top">
                  Don't have an account?{" "}
                  <Link to="/registration">Register</Link>
                </p>
                <SocialLogin />
              </form>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
