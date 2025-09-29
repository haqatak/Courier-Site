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
import Loading from "../Shared/Loading/Loading";
import DashboardWrapper from "../Shared/DashboardWrapper/DashboardWrapper";

const DashLayout = () => {
  const { role, isLoading } = useUserRole();
  if (isLoading) return <Loading></Loading>;

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

            <ul className="menu bg-accent text-primary font-bold min-h-full w-80 p-4">
              <li>
                {" "}
                <Logo></Logo>
              </li>
              {/* Sidebar content here */}
              <li>
                <Link to={"/"}>
                  <FiHome style={{ marginRight: 8 }} />
                  Back to Home
                </Link>
              </li>{" "}
              <li>
                <Link to={"/dashBoard"}>
                  <FiHome style={{ marginRight: 8 }} />
                  Dash Layout
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/myParcel"}>
                  <FiPackage style={{ marginRight: 8 }} />
                  My Parcel
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/paymentHistory"}>
                  <FiCreditCard style={{ marginRight: 8 }} />
                  Payment History
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/track"}>
                  <FiMapPin style={{ marginRight: 8 }} />
                  Track a Package
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/profile"}>
                  <FiUser style={{ marginRight: 8 }} />
                  Update Profile
                </Link>
              </li>
              {role === "rider" && (
                <>
                  <li>
                    <Link to={"/dashboard/pendingDeliveries"}>
                      <FaTasks style={{ marginRight: 8 }} />
                      Pending Deliveries
                    </Link>
                  </li>
                  <li>
                    <Link to={"/dashboard/completedDeliveries"}>
                      <FaCheckCircle style={{ marginRight: 8 }} />
                      Completed Deliveries
                    </Link>
                  </li>
                  <li>
                    <Link to={"/dashboard/myEarnigs"}>
                      <FaWallet style={{ marginRight: 8 }} />
                      My Earnigs
                    </Link>
                  </li>
                </>
              )}
              {role === "admin" && (
                <>
                  <li>
                    <Link to="/dashboard/assignRider">
                      <FaMotorcycle style={{ marginRight: 8 }} />
                      Assign Rider
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/activeRiders">
                      <FiCheckCircle style={{ marginRight: 8 }} />
                      Active Riders
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/pendingRiders">
                      <FiClock style={{ marginRight: 8 }} />
                      Pending Riders
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/make-admin">
                      <FaUserShield style={{ marginRight: 8 }} />
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
