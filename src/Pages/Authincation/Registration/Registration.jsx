import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import AxiosInstance from "../../../Hooks/AxiosInstance";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import SuccessAnimation from "../../../assets/Login.json"; // ✅ use success animation

const Registration = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const onSubmit = async (data) => {
    try {
      // Firebase user creation
      const result = await createUser(data.email, data.password);

      // Update profile
      await updateUserProfile(data.name, data.photo);

      // Save user in database
      await AxiosInstance.post("/users", {
        name: data.name,
        email: data.email,
        role: "user",
      });

      reset();
      setSuccess(true);

      // Redirect after animation
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
    <div className="flex justify-center items-center min-h-screen">
      {!success ? (
        <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
            />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Photo URL"
              {...register("photo")}
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      ) : (
        <div className="w-80">
          <Lottie animationData={SuccessAnimation} loop={false} />
          <p className="text-center text-lg font-semibold mt-4 text-primary">
            Registration Successful! Redirecting...
          </p>
        </div>
      )}
    </div>
  );
};

export default Registration;
