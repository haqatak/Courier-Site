import React from "react";
import useUserRole from "../MakeAdmin/useUserRole";
import UserDashBoard from "./UserDashBoard";
import RiderHomeBoard from "./RiderHomeBoard";
import AdminHomeBoard from "./AdminHomeBoard";
import Unauthorized from "../../Unauthorized/Unauthorized";
import Loading2 from "../../../Shared/Loading/Loading2";

const DashHome = () => {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return (
      <div>
        <Loading2></Loading2>
      </div>
    );
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
