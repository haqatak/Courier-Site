import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../Shared/Logo/Logo";
import {
  FiHome,
  FiPackage,
  FiCreditCard,
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

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-2 py-2 rounded-md transition-all duration-200
     ${
       isActive
         ? "bg-primary text-white font-semibold"
         : "text-primary hover:text-info"
     }`;

  const iconClasses = ({ isActive }) =>
    `${isActive ? "text-white" : "text-secondary"}`;

  return (
    <DashboardWrapper>
      <div className="max-w-screen-xl mx-auto">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content bg-base-100 min-h-screen flex flex-col">
            {/* Mobile Navbar */}
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
                </h2>
                <Logo />
              </div>
            </div>

            {/* Page Content */}
            <Outlet />
          </div>

          {/* Sidebar */}
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
                <NavLink to="/" className={navLinkClasses}>
                  {({ isActive }) => (
                    <>
                      <FiHome className={iconClasses({ isActive })} />
                      Back to Home
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className={navLinkClasses}>
                  {({ isActive }) => (
                    <>
                      <FiHome className={iconClasses({ isActive })} />
                      Dashboard
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myParcel" className={navLinkClasses}>
                  {({ isActive }) => (
                    <>
                      <FiPackage className={iconClasses({ isActive })} />
                      My Parcel
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={navLinkClasses}
                >
                  {({ isActive }) => (
                    <>
                      <FiCreditCard className={iconClasses({ isActive })} />
                      Payment History
                    </>
                  )}
                </NavLink>
              </li>

              {/* Rider Links */}
              {role === "rider" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/pendingDeliveries"
                      className={navLinkClasses}
                    >
                      {({ isActive }) => (
                        <>
                          <FaTasks className={iconClasses({ isActive })} />
                          Pending Deliveries
                        </>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/completedDeliveries"
                      className={navLinkClasses}
                    >
                      {({ isActive }) => (
                        <>
                          <FaCheckCircle
                            className={iconClasses({ isActive })}
                          />
                          Completed Deliveries
                        </>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/myEarnigs"
                      className={navLinkClasses}
                    >
                      {({ isActive }) => (
                        <>
                          <FaWallet className={iconClasses({ isActive })} />
                          My Earnings
                        </>
                      )}
                    </NavLink>
                  </li>
                </>
              )}

              {/* Admin Links */}
              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/assignRider"
                      className={navLinkClasses}
                    >
                      {({ isActive }) => (
                        <>
                          <FaMotorcycle className={iconClasses({ isActive })} />
                          Assign Rider
                        </>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/activeRiders"
                      className={navLinkClasses}
                    >
                      {({ isActive }) => (
                        <>
                          <FiCheckCircle
                            className={iconClasses({ isActive })}
                          />
                          Active Riders
                        </>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/pendingRiders"
                      className={navLinkClasses}
                    >
                      {({ isActive }) => (
                        <>
                          <FiClock className={iconClasses({ isActive })} />
                          Pending Riders
                        </>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/make-admin"
                      className={navLinkClasses}
                    >
                      {({ isActive }) => (
                        <>
                          <FaUserShield className={iconClasses({ isActive })} />
                          Make Admin
                        </>
                      )}
                    </NavLink>
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
