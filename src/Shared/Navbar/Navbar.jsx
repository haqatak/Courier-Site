import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMapLocationDot,
  faBoxOpen,
  faTachometerAlt,
  faMotorcycle,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const links = (
    <>
      <li className="text-primary font-bold flex items-center gap-2">
        <NavLink className={({ isActive }) => (isActive ? "underline" : "")} to={"/"}>
          <FontAwesomeIcon icon={faHouse} /> Home
        </NavLink>
      </li>
      <li className="text-primary font-bold flex items-center gap-2">
        <NavLink className={({ isActive }) => (isActive ? "underline" : "")} to={"/coverage"}>
          <FontAwesomeIcon icon={faMapLocationDot} /> Coverage
        </NavLink>
      </li>
      <li className="text-primary font-bold flex items-center gap-2">
        <NavLink className={({ isActive }) => (isActive ? "underline" : "")} to={"/sendParcel"}>
          <FontAwesomeIcon icon={faBoxOpen} /> Send Parcel
        </NavLink>
      </li>
      {user && (
        <li className="text-primary font-bold flex items-center gap-2">
          <NavLink className={({ isActive }) => (isActive ? "underline" : "")} to={"/dashBoard"}>
            <FontAwesomeIcon icon={faTachometerAlt} /> Dash Board
          </NavLink>
        </li>
      )}
      <li className="text-primary font-bold flex items-center gap-2">
        <NavLink className={({ isActive }) => (isActive ? "underline" : "")} to={"/beARider"}>
          <FontAwesomeIcon icon={faMotorcycle} /> Be A Rider
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-neutral/50 backdrop-blur-xl fixed top-0 w-full z-50 shadow-lg shadow-primary/40 px-3 md:px-6">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown md:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-accent rounded-box mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex-1 md:flex justify-center md:justify-start">
          <Logo />
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        <ThemeToggle />

        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-primary hover:text-accent"
          >
            Log Out
          </button>
        ) : (
          <Link className="btn btn-primary btn-outline hover:text-accent" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
