import React from "react";
import AxiosHook from "./AxiosHook";

const useTrackLogger = () => {
  const axiosSecure = AxiosHook();
  const logTracking = async ({
    trackingId,
    parcelId,
    status,
    message,
    updated_by,
  }) => {
    try {
      const payload = {
        trackingId,
        parcelId,
        status,
        message,
        updated_by,
      };
      await axiosSecure.post("/tracking", payload);
    } catch (error) {
      console.log("❌ Tracking log failed:", error.response?.data);
      throw error;
    }
  };
  return { logTracking };
};
export default useTrackLogger;
