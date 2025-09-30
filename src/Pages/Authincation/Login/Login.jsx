import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
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
        setSuccess(true); // show animation
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
    <div className="card bg-accent w-full max-w-lg shrink-0 shadow-xl shadow-primary/40">
      <div className="card-body">
        {success ? (
          <div className="flex flex-col items-center justify-center">
            <Lottie animationData={LoginAnimation} loop={false} />
            <h2 className="text-primary text-2xl font-bold mt-4">
              Login Successful 🎉
            </h2>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <h1 className="text-5xl font-bold text-primary my-3">Login now!</h1>
              <label className="label text-secondary">Email</label>
              <input
                type="email"
                className="input w-full"
                {...register("email")}
                placeholder="Email"
              />

              <label className="label text-secondary">Password</label>
              <input
                type="password"
                className="input w-full"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be at least 6 characters
                </p>
              )}

              <button className="w-full btn btn-secondary btn-outline my-4">
                Login
              </button>
              <p className="text-info">
                Don't have an account?
                <Link to="/registration" className="btn-link text-secondary ml-3">
                  Register
                </Link>
              </p>
            </fieldset>
            <SocialLogin />
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
