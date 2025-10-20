import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import AxiosHook from "../../Hooks/AxiosHook";

const BeARider = () => {
  const { user } = useContext(AuthContext);
  const serviceCenters = useLoaderData();
  const [districts, setDistricts] = useState([]);
  const axiosSecure = AxiosHook();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const selectedRegion = watch("region");

  useEffect(() => {
    if (selectedRegion) {
      const filteredDistricts = serviceCenters
        .filter((center) => center.region === selectedRegion)
        .map((center) => center.district);
      setDistricts([...new Set(filteredDistricts)]);
    } else {
      setDistricts([]);
    }
  }, [selectedRegion, serviceCenters]);

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    axiosSecure.post("/riders", riderData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your rider request is under review.",
        });
      }
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Become a Rider</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
            <IonLabel>Name</IonLabel>
            <IonInput value={user?.displayName} readonly />
          </IonItem>
          <IonItem>
            <IonLabel>Email</IonLabel>
            <IonInput value={user?.email} readonly />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Your Age</IonLabel>
            <IonInput
              type="number"
              {...register("age", { required: true, min: 18 })}
            />
          </IonItem>
          {errors.age && (
            <IonText color="danger">
              <p className="ion-padding-start">Minimum age is 18</p>
            </IonText>
          )}
          <IonItem>
            <IonLabel>Region</IonLabel>
            <IonSelect
              {...register("region", { required: true })}
              placeholder="Select Region"
            >
              {[...new Set(serviceCenters.map((s) => s.region))].map(
                (region) => (
                  <IonSelectOption key={region} value={region}>
                    {region}
                  </IonSelectOption>
                )
              )}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>District</IonLabel>
            <IonSelect
              {...register("district", { required: true })}
              disabled={!selectedRegion}
              placeholder="Select District"
            >
              {districts.map((district) => (
                <IonSelectOption key={district} value={district}>
                  {district}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Phone Number</IonLabel>
            <IonInput
              type="tel"
              {...register("phone", { required: true })}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">National ID Number</IonLabel>
            <IonInput
              type="text"
              {...register("nid", { required: true })}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Bike Brand</IonLabel>
            <IonInput
              type="text"
              {...register("bikeBrand", { required: true })}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Bike Registration Number</IonLabel>
            <IonInput
              type="text"
              {...register("bikeRegNo", { required: true })}
            />
          </IonItem>
          <IonButton
            type="submit"
            expand="block"
            className="ion-margin-top"
          >
            Submit Application
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default BeARider;
