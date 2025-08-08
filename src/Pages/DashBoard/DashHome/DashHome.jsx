import React from "react";
import useUserRole from "../MakeAdmin/useUserRole";
import Loading from "../../../Shared/Loading/Loading";
import UserDashBoard from "./UserDashBoard";
import RiderHomeBoard from "./RiderHomeBoard";
import AdminHomeBoard from "./AdminHomeBoard";
import Unauthorized from "../../Unauthorized/Unauthorized";

const DashHome = () => {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (role === "user") {
    return <UserDashBoard></UserDashBoard>;
  } else if (role === "rider") {
    return <RiderHomeBoard></RiderHomeBoard>;
  } else if (role === "admin") {
    return <AdminHomeBoard></AdminHomeBoard>;
  } else {
    return <Unauthorized></Unauthorized>;
  }
};

export default DashHome;
