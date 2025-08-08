import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AuthLayut from "../Layouts/AuthLayut";
import Login from "../Pages/Authincation/Login/Login";
import Registration from "../Pages/Authincation/Registration/Registration";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/SendParcel/SendParcel";
import PrivetRoutes from "../Pages/Authincation/PrivetRoutes/PrivetRoutes";
import DashLayout from "../Layouts/DashLayout";
import MyParcels from "../Pages/DashBoard/MyParcels/MyParcels";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRiders from "../Pages/DashBoard/PendingRiders/PendingRiders";
import TrackParcel from "../Pages/DashBoard/TrackParcel/TrackParcel";
import AddTrackingStatus from "../Pages/DashBoard/TrackParcel/AddTrackingStatus";
import ActiveRiders from "../Pages/DashBoard/ArtiveRiders/ActiveRiders";
import MakeAdmin from "../Pages/DashBoard/MakeAdmin/MakeAdmin";
import Unauthorized from "../Pages/Unauthorized/Unauthorized";
import AdminRoute from "../Pages/Authincation/AdminRoute/AdminRoute";
import AssignRider from "../Pages/DashBoard/AssignRider/AssignRider";
import Pendigndeliveries from "../Pages/DashBoard/PendingDeliveries/Pendigndeliveries";
import RiderRoute from "../Pages/Authincation/RiderRoute/RiderRoute";
import CompletedDeliveries from "../Pages/DashBoard/CompletedDeliveries/CompletedDeliveries";
import MyEarings from "../Pages/DashBoard/MyEarnings/MyEarings";
import DashHome from "../Pages/DashBoard/DashHome/DashHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: async () => {
          const res = await fetch("/warehouses.json");
          if (!res.ok) throw new Error("Failed to load warehouse data");
          return await res.json();
        },
      },
      {
        path: "sendParcel",
        element: (
          <PrivetRoutes>
            <SendParcel></SendParcel>
          </PrivetRoutes>
        ),
        loader: async () => {
          const res = await fetch("/warehouses.json");
          if (!res.ok) throw new Error("Failed to load warehouse data");
          return await res.json();
        },
      },
      {
        path: "beARider",
        element: (
          <PrivetRoutes>
            <BeARider></BeARider>
          </PrivetRoutes>
        ),
        loader: async () => {
          const res = await fetch("/warehouses.json");
          if (!res.ok) throw new Error("Failed to load warehouse data");
          return await res.json();
        },
      },
      {
        path: "unauthorized",
        Component: Unauthorized,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayut,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "registration",
        Component: Registration,
      },
    ],
  },
  {
    path: "/dashBoard",
    element: (
      <PrivetRoutes>
        <DashLayout></DashLayout>
      </PrivetRoutes>
    ),
    children: [
      {
        index: true,
        Component: DashHome,
      },
      {
        path: "myParcel",
        Component: MyParcels,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "track",
        Component: TrackParcel,
      },
      {
        path: "profile",
        Component: AddTrackingStatus,
      },
      {
        path: "pendingDeliveries",
        element: (
          <RiderRoute>
            <Pendigndeliveries></Pendigndeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "completedDeliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "myEarnigs",
        element: (
          <RiderRoute>
            <MyEarings></MyEarings>
          </RiderRoute>
        ),
      },
      {
        path: "activeRiders",
        element: (
          <AdminRoute>
            <ActiveRiders></ActiveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "pendingRiders",
        element: (
          <AdminRoute>
            <PendingRiders></PendingRiders>
          </AdminRoute>
        ),
      },
      {
        path: "make-admin",
        element: (
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "assignRider",
        element: (
          <AdminRoute>
            <AssignRider></AssignRider>
          </AdminRoute>
        ),
      },
    ],
  },
]);
