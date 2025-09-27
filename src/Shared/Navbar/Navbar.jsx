import React, { use } from "react";
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
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";



const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const handleLogout = () => {
    logOut()
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };


const links = (
  <>
    <li className="text-primary font-bold text-xl flex items-center gap-2">
      <NavLink
        className={({ isActive }) => (isActive ? "underline" : "")}
        to={"/"}
      >
        <FontAwesomeIcon icon={faHouse} /> Home
      </NavLink>
    </li>
    <li className="text-primary font-bold text-xl flex items-center gap-2">
      <NavLink
        className={({ isActive }) => (isActive ? "underline" : "")}
        to={"/coverage"}
      >
        <FontAwesomeIcon icon={faMapLocationDot} /> Coverage
      </NavLink>
    </li>
    <li className="text-primary font-bold text-xl flex items-center gap-2">
      <NavLink
        className={({ isActive }) => (isActive ? "underline" : "")}
        to={"/sendParcel"}
      >
        <FontAwesomeIcon icon={faBoxOpen} /> Send Parcel
      </NavLink>
    </li>
    {user && (
      <li className="text-primary font-bold text-xl flex items-center gap-2">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/dashBoard"}
        >
          <FontAwesomeIcon icon={faTachometerAlt} /> Dash Board
        </NavLink>
      </li>
    )}
    <li className="text-primary font-bold text-xl flex items-center gap-2">
      <NavLink
        className={({ isActive }) => (isActive ? "underline" : "")}
        to={"/beARider"}
      >
        <FontAwesomeIcon icon={faMotorcycle} /> Be A Rider
      </NavLink>
    </li>
    <li className="text-primary font-bold text-xl flex items-center gap-2">
      <NavLink
        className={({ isActive }) => (isActive ? "underline" : "")}
        to={"/"}
      >
        <FontAwesomeIcon icon={faCircleInfo} /> About Us
      </NavLink>
    </li>
  </>
);


  return (
    <div className="navbar bg-neutral/50 backdrop-blur-xl fixed top-0 right-0 left-0 z-50 shadow-xl shadow-primary/40">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-accent rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex gap-2">
        <div className="bg-neutral rounded-2xl">
          <ThemeToggle />
        </div>

        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-outline rounded-lg btn-secondary bg-primary text-lg"
          >
            Log Out
          </button>
        ) : (
          <Link
            className="btn btn-outline rounded-lg btn-secondary bg-primary text-lg"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
