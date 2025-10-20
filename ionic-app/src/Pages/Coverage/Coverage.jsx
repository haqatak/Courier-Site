import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
} from "@ionic/react";
import BangladeshMap from "./BangledeshMap";
import { useLoaderData } from "react-router-dom";

const Coverage = () => {
  const mapData = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activePosition, setActivePosition] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const handleSearch = (e) => {
    const term = e.detail.value.trim().toLowerCase();
    setSearchTerm(term);
    const match = mapData.find((d) => d.district.toLowerCase().includes(term));
    if (match) {
      setActivePosition([match.latitude, match.longitude]);
      setActiveDistrict(match.district);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Coverage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1 className="ion-text-center">
          We Are Available in 64 Districts
        </h1>
        <p>Search your home town</p>
        <IonSearchbar
          value={searchTerm}
          onIonChange={handleSearch}
          placeholder="Search for a district"
        />
        <div className="ion-margin-top">
          <BangladeshMap
            mapData={mapData}
            activeDistrict={activeDistrict}
            activePosition={activePosition}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Coverage;
