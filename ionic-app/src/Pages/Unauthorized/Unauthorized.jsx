import { Link } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { lockClosed } from "ionicons/icons";
import { Player } from "@lottiefiles/react-lottie-player";
import error from "../../assets/404.json";

const Unauthorized = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center min-h-full">
          <IonCard className="ion-text-center">
            <IonCardHeader>
              <Player
                autoplay
                loop
                src={error}
                className="w-52 h-52 mx-auto"
              />
              <IonIcon
                icon={lockClosed}
                className="text-6xl"
                color="primary"
              />
              <IonCardTitle>Access Denied</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>You do not have permission to view this page.</p>
              <IonButton routerLink="/" className="ion-margin-top">
                Go to Home
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Unauthorized;
