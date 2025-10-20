import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import RootLayouts from "./Layouts/RootLayouts";
import Home from "./Pages/Home/Home/Home";
import Coverage from "./Pages/Coverage/Coverage";
import SendParcel from "./Pages/SendParcel/SendParcel";
import PrivateRoutes from "./Pages/Authentication/PrivateRoutes/PrivateRoutes";
import BeARider from "./Pages/BeARider/BeARider";
import Unauthorized from "./Pages/Unauthorized/Unauthorized";
import AuthLayut from "./Layouts/AuthLayut";
import Login from "./Pages/Authentication/Login/Login";
import Registration from "./Pages/Authentication/Registration/Registration";
import DashLayout from "./Layouts/DashLayout";
import DashHome from "./Pages/DashBoard/DashHome/DashHome";
import MyParcels from "./Pages/DashBoard/MyParcels/MyParcels";
import Payment from "./Pages/DashBoard/Payment/Payment";
import PaymentHistory from "./Pages/DashBoard/PaymentHistory/PaymentHistory";
import TrackParcel from "./Pages/DashBoard/TrackParcel/TrackParcel";
import AddTrackingStatus from "./Pages/DashBoard/TrackParcel/AddTrackingStatus";
import RiderRoute from "./Pages/Authentication/RiderRoute/RiderRoute";
import Pendigndeliveries from "./Pages/DashBoard/PendingDeliveries/Pendigndeliveries";
import CompletedDeliveries from "./Pages/DashBoard/CompletedDeliveries/CompletedDeliveries";
import MyEarings from "./Pages/DashBoard/MyEarnings/MyEarings";
import AdminRoute from "./Pages/Authentication/AdminRoute/AdminRoute";
import ActiveRiders from "./Pages/DashBoard/ArtiveRiders/ActiveRiders";
import PendingRiders from "./Pages/DashBoard/PendingRiders/PendingRiders";
import MakeAdmin from "./Pages/DashBoard/MakeAdmin/MakeAdmin";
import AssignRider from "./Pages/DashBoard/AssignRider/AssignRider";

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" render={() => <RootLayouts />} />
        <Route path="/login" render={() => <AuthLayut />} />
        <Route path="/dashboard" render={() => <DashLayout />} />

        {/* Root Routes */}
        <Route path="/" exact={true} component={Home} />
        <Route path="/coverage" exact={true} component={Coverage} />
        <Route
          path="/sendParcel"
          exact={true}
          render={() => (
            <PrivateRoutes>
              <SendParcel />
            </PrivateRoutes>
          )}
        />
        <Route
          path="/beARider"
          exact={true}
          render={() => (
            <PrivateRoutes>
              <BeARider />
            </PrivateRoutes>
          )}
        />
        <Route path="/unauthorized" exact={true} component={Unauthorized} />

        {/* Auth Routes */}
        <Route path="/login" exact={true} component={Login} />
        <Route path="/registration" exact={true} component={Registration} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" exact={true} component={DashHome} />
        <Route path="/dashboard/myParcel" exact={true} component={MyParcels} />
        <Route path="/dashboard/payment/:id" exact={true} component={Payment} />
        <Route
          path="/dashboard/paymentHistory"
          exact={true}
          component={PaymentHistory}
        />
        <Route path="/dashboard/track" exact={true} component={TrackParcel} />
        <Route
          path="/dashboard/profile"
          exact={true}
          component={AddTrackingStatus}
        />
        <Route
          path="/dashboard/pendingDeliveries"
          exact={true}
          render={() => (
            <RiderRoute>
              <Pendigndeliveries />
            </RiderRoute>
          )}
        />
        <Route
          path="/dashboard/completedDeliveries"
          exact={true}
          render={() => (
            <RiderRoute>
              <CompletedDeliveries />
            </RiderRoute>
          )}
        />
        <Route
          path="/dashboard/myEarnigs"
          exact={true}
          render={() => (
            <RiderRoute>
              <MyEarings />
            </RiderRoute>
          )}
        />
        <Route
          path="/dashboard/activeRiders"
          exact={true}
          render={() => (
            <AdminRoute>
              <ActiveRiders />
            </AdminRoute>
          )}
        />
        <Route
          path="/dashboard/pendingRiders"
          exact={true}
          render={() => (
            <AdminRoute>
              <PendingRiders />
            </AdminRoute>
          )}
        />
        <Route
          path="/dashboard/make-admin"
          exact={true}
          render={() => (
            <AdminRoute>
              <MakeAdmin />
            </AdminRoute>
          )}
        />
        <Route
          path="/dashboard/assignRider"
          exact={true}
          render={() => (
            <AdminRoute>
              <AssignRider />
            </AdminRoute>
          )}
        />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;