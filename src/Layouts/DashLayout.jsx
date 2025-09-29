import React from "react";
import { Link, Outlet } from "react-router";
import Logo from "../Shared/Logo/Logo";
import {
  FiHome,
  FiPackage,
  FiCreditCard,
  FiMapPin,
  FiUser,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaCheckCircle,
  FaMotorcycle,
  FaTasks,
  FaUserShield,
  FaWallet,
} from "react-icons/fa";
import useUserRole from "../Pages/DashBoard/MakeAdmin/useUserRole";
import DashboardWrapper from "../Shared/DashboardWrapper/DashboardWrapper";

const DashLayout = () => {
  const { role } = useUserRole();

  return (
    <DashboardWrapper>
      <div className="max-w-screen-xl mx-auto">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content bg-neutral flex flex-col">
            {/* Page content here */}
            <div className="navbar bg-accent w-full lg:hidden">
              <div className="flex-none">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="mx-2 flex-1 px-2 flex items-center justify-between">
                <h2 className="text-primary text-2xl font-semibold">
                  DashBoard
                </h2>{" "}
                <Logo></Logo>
              </div>
            </div>
            {/* Page content here */}
            <Outlet></Outlet>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu bg-accent text-primary font-bold min-h-full w-80 p-4 space-y-2">
              {/* Logo */}
              <li>
                <Logo />
              </li>

              {/* Common Links */}
              <li>
                <Link to={"/"}>
                  <FiHome className="text-secondary mr-2" />
                  Back to Home
                </Link>
              </li>
              <li>
                <Link to={"/dashboard"}>
                  <FiHome className="text-secondary mr-2" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/myParcel"}>
                  <FiPackage className="text-secondary mr-2" />
                  My Parcel
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/paymentHistory"}>
                  <FiCreditCard className="text-secondary mr-2" />
                  Payment History
                </Link>
              </li>
              {/* <li>
                <Link to={"/dashboard/track"}>
                  <FiMapPin className="text-secondary mr-2" />
                  Track a Package
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/profile"}>
                  <FiUser className="text-secondary mr-2" />
                  Update Profile
                </Link>
              </li> */}

              {/* Rider Links */}
              {role === "rider" && (
                <>
                  <li>
                    <Link to={"/dashboard/pendingDeliveries"}>
                      <FaTasks className="text-secondary mr-2" />
                      Pending Deliveries
                    </Link>
                  </li>
                  <li>
                    <Link to={"/dashboard/completedDeliveries"}>
                      <FaCheckCircle className="text-secondary mr-2" />
                      Completed Deliveries
                    </Link>
                  </li>
                  <li>
                    <Link to={"/dashboard/myEarnigs"}>
                      <FaWallet className="text-secondary mr-2" />
                      My Earnings
                    </Link>
                  </li>
                </>
              )}

              {/* Admin Links */}
              {role === "admin" && (
                <>
                  <li>
                    <Link to="/dashboard/assignRider">
                      <FaMotorcycle className="text-secondary mr-2" />
                      Assign Rider
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/activeRiders">
                      <FiCheckCircle className="text-secondary mr-2" />
                      Active Riders
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/pendingRiders">
                      <FiClock className="text-secondary mr-2" />
                      Pending Riders
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/make-admin">
                      <FaUserShield className="text-secondary mr-2" />
                      Make Admin
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default DashLayout;
