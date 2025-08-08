import React, { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AxiosHook from "../../../Hooks/AxiosHook";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import useTrackLogger from "../../../Hooks/useTrackLogger";

const AssignRider = () => {
  const axiosSecure = AxiosHook();
  const { user } = use(AuthContext);
  const { logTracking } = useTrackLogger();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [availableRiders, setAvailableRiders] = useState([]);
  const [selectedRiderId, setSelectedRiderId] = useState("");

  // ✅ Load parcels that are paid and pending
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data.filter(
        (parcel) =>
          parcel.payment_status === "paid" &&
          parcel.delivery_status === "pending"
      );
    },
  });

  // ✅ Open modal and load matching riders by district
  const handleAssignClick = async (parcel) => {
    setSelectedParcel(parcel);
    try {
      const district = parcel.receiver_service_center;
      const res = await axiosSecure.get(`/riders/active`);
      const filtered = res.data.filter((r) => r.district === district);
      setAvailableRiders(filtered);
    } catch (err) {
      console.error("Error loading riders:", err);
      setAvailableRiders([]);
    }
  };

  const handleConfirmAssign = async () => {
    const selectedRider = availableRiders.find(
      (r) => r._id.toString() === selectedRiderId
    );

    if (!selectedRider) {
      Swal.fire("Error", "Selected rider not found", "error");
      return;
    }

    const { _id, ...rest } = selectedRider;

    try {
      await axiosSecure.patch(`/parcels/${selectedParcel._id}/assign-rider`, {
        assigned_rider: {
          id: _id,
          ...rest,
        },
        delivery_status: "assigned",
        work_status: "in-delivery",
      });

      await logTracking({
        trackingId: selectedParcel.token_id,
        parcelId: selectedParcel._id,
        status: "assigned",
        message: `Rider '${selectedRider.name}' assigned by admin-${
          user?.displayName || "system"
        }`,
        updated_by: user?.email || "system",
      });

      Swal.fire("Success", "Rider assigned successfully", "success");
      setSelectedParcel(null);
      setSelectedRiderId("");
      refetch();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to assign rider", "error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Assign Rider</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Token ID</th>
            <th className="border px-4 py-2">Receiver</th>
            <th className="border px-4 py-2">Service Center</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels?.map((parcel) => (
            <tr key={parcel._id}>
              <td className="border px-4 py-2">{parcel.token_id}</td>
              <td className="border px-4 py-2">{parcel.receiver_name}</td>
              <td className="border px-4 py-2">
                {parcel.receiver_service_center}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleAssignClick(parcel)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Assign Rider
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Modal */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-3">
              Assign Rider to:{" "}
              <span className="text-blue-600">{selectedParcel.token_id}</span>
            </h3>

            {availableRiders.length > 0 ? (
              <select
                value={selectedRiderId}
                onChange={(e) => setSelectedRiderId(e.target.value)}
                className="w-full border px-4 py-2 mb-4 rounded"
              >
                <option value="">Select Rider</option>
                {availableRiders?.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.name} ({r.district})
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-red-500 mb-4">
                No riders available in this district.
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedParcel(null);
                  setSelectedRiderId("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                disabled={!selectedRiderId}
                onClick={handleConfirmAssign}
                className={`${
                  selectedRiderId
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-300 cursor-not-allowed"
                } text-white px-4 py-2 rounded`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
