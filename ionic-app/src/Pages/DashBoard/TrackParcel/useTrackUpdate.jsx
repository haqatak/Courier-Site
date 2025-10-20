import { useState } from "react"; // Your custom axios instance
import Swal from "sweetalert2";
import AxiosHook from "../../../Hooks/AxiosHook";

const useTrackUpdate = () => {
  const axiosSecure = AxiosHook();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const updateTracking = async ({
    trackingId,
    parcelId,
    status,
    message,
    updated_by,
  }) => {
    setLoading(true);
    setSuccessMessage("");
    setError("");

    if (!trackingId || !parcelId || !status) {
      setError("Tracking ID, Parcel ID, and Status are required");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        trackingId,
        parcelId,
        status,
        message: message || "",
        updated_by: updated_by || "Admin",
      };

      const res = await axiosSecure.post("/tracking", payload);

      if (res.data.insertedId) {
        setSuccessMessage("Tracking updated successfully!");
        Swal.fire("Success", "Tracking update recorded!", "success");
      } else {
        setError("Failed to update tracking.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while updating tracking.");
    } finally {
      setLoading(false);
    }
  };

  return { updateTracking, loading, error, successMessage };
};

export default useTrackUpdate;
