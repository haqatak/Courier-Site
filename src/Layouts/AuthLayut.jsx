import React from "react";
import { Outlet } from "react-router";
import img from "../assets/authimage.png";
import Logo from "../Shared/Logo/Logo";

const AuthLayut = () => {
  return (
    <div>
      <div className="bg-base-200 p-12 max-w-screen-xl mx-auto">
        <Logo></Logo>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1">
            <img src={img} className="max-w-sm rounded-lg shadow-2xl" />
          </div>
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayut;
