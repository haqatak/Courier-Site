import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result);
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card  bg-accent w-full max-w-lg shrink-0 shadow-xl shadow-primary/40">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="">
            <h1 className="text-5xl font-bold text-primary my-3">Login now!</h1>
            <label className="label text-secondary">Email</label>
            <br />
            <input
              type="email"
              className="input"
              {...register("email")}
              placeholder="Email"
            />

            <label className="label text-secondary">Password</label>
            <br />
            <input
              type="password"
              className="input"
              {...register("password", {
                required: true,
                minLength: 5,
              })}
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password id required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be atleast 6 Charecters
              </p>
            )}
            <button className="w-full btn btn-secondary btn-outline my-4 ">Login</button>
            <p className="text-info">
              Don't have an acoount?
              <Link to="/registration" className="btn-link text-secondary ml-3">
                Register
              </Link>
            </p>
          </fieldset>
          <SocialLogin></SocialLogin>
        </form>
      </div>
    </div>
  );
};

export default Login;
