import { use, useContext } from "react";
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
  IonTextarea,
  IonRadioGroup,
  IonRadio,
  IonList,
  IonListHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import AxiosHook from "../../Hooks/AxiosHook";
import useTrackLogger from "../../Hooks/useTrackLogger";

const generateTokenId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `P-${timestamp}-${random}`.toUpperCase();
};

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);
  const axiosUse = AxiosHook();
  const navigate = useNavigate();
  const { logTracking } = useTrackLogger();

  const serviceCenters = useLoaderData();
  const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];

  const getServiceCenters = (region) => {
    return serviceCenters
      .filter((center) => center.region === region)
      .map((center) => center.district);
  };

  const parcelType = watch("type");
  const selectedSenderRegion = watch("sender_region");
  const selectedReceiverRegion = watch("receiver_region");
  const isInsideDhaka = (senderDistrict, receiverDistrict) => {
    return (
      senderDistrict?.toLowerCase() === "dhaka" &&
      receiverDistrict?.toLowerCase() === "dhaka"
    );
  };

  const onSubmit = async (data) => {
    // ... (rest of the onSubmit logic remains the same)
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Send Parcel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Parcel Info</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonRadioGroup {...register("type", { required: true })}>
                  <IonListHeader>
                    <IonLabel>Parcel Type</IonLabel>
                  </IonListHeader>
                  <IonItem>
                    <IonLabel>Document</IonLabel>
                    <IonRadio slot="start" value="document" />
                  </IonItem>
                  <IonItem>
                    <IonLabel>Non-Document</IonLabel>
                    <IonRadio slot="start" value="non-document" />
                  </IonItem>
                </IonRadioGroup>
              </IonList>
              <IonItem>
                <IonLabel position="floating">Title</IonLabel>
                <IonInput
                  type="text"
                  {...register("title", { required: true })}
                />
              </IonItem>
              {parcelType === "non-document" && (
                <IonItem>
                  <IonLabel position="floating">Weight (kg)</IonLabel>
                  <IonInput type="number" step="0.01" {...register("weight")} />
                </IonItem>
              )}
            </IonCardContent>
          </IonCard>

          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Sender Info</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonItem>
                      <IonLabel position="floating">Name</IonLabel>
                      <IonInput
                        type="text"
                        {...register("sender_name", { required: true })}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Contact</IonLabel>
                      <IonInput
                        type="tel"
                        {...register("sender_contact", { required: true })}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel>Region</IonLabel>
                      <IonSelect
                        {...register("sender_region", { required: true })}
                      >
                        {uniqueRegions.map((region, index) => (
                          <IonSelectOption key={index} value={region}>
                            {region}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Service Center</IonLabel>
                      <IonSelect
                        {...register("sender_service_center", {
                          required: true,
                        })}
                      >
                        {getServiceCenters(selectedSenderRegion).map(
                          (sc, index) => (
                            <IonSelectOption key={index} value={sc}>
                              {sc}
                            </IonSelectOption>
                          )
                        )}
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Address</IonLabel>
                      <IonTextarea
                        {...register("sender_address", { required: true })}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">
                        Pickup Instructions
                      </IonLabel>
                      <IonTextarea
                        {...register("pickup_instruction", { required: true })}
                      />
                    </IonItem>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="12" size-md="6">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Receiver Info</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonItem>
                      <IonLabel position="floating">Name</IonLabel>
                      <IonInput
                        type="text"
                        {...register("receiver_name", { required: true })}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Contact</IonLabel>
                      <IonInput
                        type="tel"
                        {...register("receiver_contact", { required: true })}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel>Region</IonLabel>
                      <IonSelect
                        {...register("receiver_region", { required: true })}
                      >
                        {uniqueRegions.map((region, index) => (
                          <IonSelectOption key={index} value={region}>
                            {region}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Service Center</IonLabel>
                      <IonSelect
                        {...register("receiver_service_center", {
                          required: true,
                        })}
                      >
                        {getServiceCenters(selectedReceiverRegion).map(
                          (sc, index) => (
                            <IonSelectOption key={index} value={sc}>
                              {sc}
                            </IonSelectOption>
                          )
                        )}
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">Address</IonLabel>
                      <IonTextarea
                        {...register("receiver_address", { required: true })}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">
                        Delivery Instructions
                      </IonLabel>
                      <IonTextarea
                        {...register("delivery_instruction", {
                          required: true,
                        })}
                      />
                    </IonItem>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonButton
            type="submit"
            expand="block"
            className="ion-margin-top"
          >
            Submit Parcel
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default SendParcel;
