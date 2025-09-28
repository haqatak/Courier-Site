import React from "react";
import { Outlet } from "react-router";
import Logo from "../Shared/Logo/Logo";
import Lottie from "lottie-react";
import authAnimation from "../assets/Login.json"
import DashboardWrapper from "../Shared/DashboardWrapper/DashboardWrapper";

const AuthLayout = () => {
  return (
    <DashboardWrapper>
      <div className="p-2 md:p-12 max-w-screen-xl mx-auto flex flex-col items-center justify-center gap-5 mt-12">
        <Logo />
        <div className="hero-content flex-col md:flex  gap-20 lg:flex-row-reverse">
          {/* Lottie Animation */}
          <div className="flex-1">
            <Lottie animationData={authAnimation} loop={true} className="max-w-sm" />
          </div>

          {/* Auth Pages */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default AuthLayout;
