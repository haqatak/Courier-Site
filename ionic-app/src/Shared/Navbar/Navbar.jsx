import { useContext } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonMenuButton,
} from "@ionic/react";
import {
  home,
  map,
  cube,
  speedometer,
  bicycle,
  logIn,
  logOut,
} from "ionicons/icons";
import Logo from "../Logo/Logo";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logOut: handleLogOut } = useContext(AuthContext);

  const handleLogout = () => {
    handleLogOut()
      .then(() => {
        toast.success("Logged out successfully 👋");
      })
      .catch(() => {
        toast.error("Logout failed. Try again!");
      });
  };

  const links = [
    { to: "/", icon: home, text: "Home" },
    { to: "/coverage", icon: map, text: "Coverage" },
    { to: "/sendParcel", icon: cube, text: "Send Parcel" },
    { to: "/beARider", icon: bicycle, text: "Be A Rider" },
  ];

  if (user) {
    links.push({ to: "/dashBoard", icon: speedometer, text: "Dashboard" });
  }

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {links.map((link, index) => (
              <IonItem button key={index} routerLink={link.to}>
                <IonIcon slot="start" icon={link.icon} />
                <IonLabel>{link.text}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonMenu>

      <IonHeader id="main-content">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <Logo />
          </IonTitle>
          <IonButtons slot="end">
            <ThemeToggle />
            {user ? (
              <IonButton onClick={handleLogout}>
                <IonIcon slot="icon-only" icon={logOut} />
              </IonButton>
            ) : (
              <Link to="/login">
                <IonButton>
                  <IonIcon slot="icon-only" icon={logIn} />
                </IonButton>
              </Link>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Navbar;
