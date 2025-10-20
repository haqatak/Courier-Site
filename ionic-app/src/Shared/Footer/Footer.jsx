import {
  IonFooter,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import {
  logoFacebook,
  logoGithub,
  logoLinkedin,
  logoWhatsapp,
  home,
  map,
  cube,
  mail,
  call,
  briefcase,
  location,
} from "ionicons/icons";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    {
      icon: logoFacebook,
      href: "https://www.facebook.com/rohan.kabir.877108",
    },
    { icon: logoGithub, href: "https://github.com/RohanR05" },
    {
      icon: logoLinkedin,
      href: "https://www.linkedin.com/in/rohan-batman/",
    },
    { icon: logoWhatsapp, href: "https://wa.me/8801906647607" },
  ];

  const quickLinks = [
    { to: "/", icon: home, text: "Home" },
    { to: "/coverage", icon: map, text: "Coverage" },
    { to: "/sendParcel", icon: cube, text: "Send Parcel" },
  ];

  return (
    <IonFooter>
      <IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="4">
              <Logo />
              <p>Learning by building. Improving with every project.</p>
              <div>
                {socialLinks.map((link, index) => (
                  <IonButton
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    fill="clear"
                  >
                    <IonIcon slot="icon-only" icon={link.icon} />
                  </IonButton>
                ))}
              </div>
            </IonCol>
            <IonCol size="12" size-md="4">
              <h5>Quick Links</h5>
              <IonList>
                {quickLinks.map((link, index) => (
                  <Link to={link.to} key={index}>
                    <IonItem button lines="none">
                      <IonIcon slot="start" icon={link.icon} />
                      <IonLabel>{link.text}</IonLabel>
                    </IonItem>
                  </Link>
                ))}
              </IonList>
            </IonCol>
            <IonCol size="12" size-md="4">
              <h5>Contact Info</h5>
              <IonList>
                <IonItem lines="none">
                  <IonIcon slot="start" icon={location} />
                  <IonLabel>Narail, Bangladesh</IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonIcon slot="start" icon={mail} />
                  <IonLabel>rohankabir061@gmail.com</IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonIcon slot="start" icon={call} />
                  <IonLabel>+8801906647607</IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonIcon slot="start" icon={briefcase} />
                  <IonLabel>Available For Work</IonLabel>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center ion-margin-top">
            <IonCol>
              <p>
                Copyright © {new Date().getFullYear()} - All rights reserved by{" "}
                <Logo />
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
