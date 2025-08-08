import React from "react";
import useTrackUpdate from "./useTrackUpdate";

const AddTrackingStatus = () => {
  const { updateTracking, loading, error, successMessage } =useTrackUpdate;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateTracking({
      trackingId: "TRK-20250706-001", // must match the parcel’s tracking ID
      parcelId: "6649ae6fc211a3b84c65f2d0", // valid MongoDB ObjectId from parcels collection
      status: "Package arrived at sorting center",
      message: "Reached Narayanganj sorting center",
      updated_by: "admin@example.com",
    });
  };

  return (
    <div className="p-4">
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Updating..." : "Update Tracking"}
      </button>
      {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default AddTrackingStatus;
