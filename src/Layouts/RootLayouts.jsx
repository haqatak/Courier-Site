import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";

const RootLayouts = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-screen-xl mx-auto">
        <Toaster position="top-center"></Toaster>
        <Outlet></Outlet>
      </div>{" "}
      <Footer></Footer>
    </div>
  );
};

export default RootLayouts;
