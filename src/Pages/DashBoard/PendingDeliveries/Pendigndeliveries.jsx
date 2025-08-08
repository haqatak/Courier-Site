import React, { use } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import AxiosHook from "../../../Hooks/AxiosHook";
import useTrackLogger from "../../../Hooks/useTrackLogger";

const PendingDeliveries = () => {
  const { user } = use(AuthContext);
  const axiosSecure = AxiosHook();
  const queryClient = useQueryClient();
  const { logTracking } = useTrackLogger();

  const { data: deliveries = [], isLoading } = useQuery({
    queryKey: ["pendingDeliveries", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/tasks?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ parcelId, status }) => {
      return await axiosSecure.patch(`/parcels/${parcelId}/status`, { status });
    },
    onSuccess: () => {
      Swal.fire("Success", "Status updated successfully", "success");
      queryClient.invalidateQueries(["pendingDeliveries", user?.email]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update status", "error");
    },
  });

  const handleStatusUpdate = (parcelId, newStatus) => {
    const parcel = deliveries.find((d) => d._id === parcelId);
    if (!parcel) return;

    updateStatusMutation.mutate(
      { parcelId, status: newStatus },
      {
        onSuccess: async () => {
          // ✅ Call tracking logger
          await logTracking({
            trackingId: parcel.token_id,
            parcelId: parcel._id,
            status: newStatus,
            message: `Status updated to "${newStatus}" by Rider-${user.displayName}`,
            updated_by: user?.email || "system",
          });

          Swal.fire("Success", `Marked as ${newStatus}`, "success");
          queryClient.invalidateQueries(["pendingDeliveries", user?.email]);
        },
        onError: () => {
          Swal.fire("Error", "Failed to update status", "error");
        },
      }
    );
  };

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📦 Pending Deliveries</h2>

      {isLoading ? (
        <p>Loading deliveries...</p>
      ) : deliveries.length === 0 ? (
        <p>No pending deliveries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Token ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Sender</th>
                <th className="p-2 border">Receiver</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((parcel) => (
                <tr key={parcel._id}>
                  <td className="border px-2 py-1">{parcel.token_id}</td>
                  <td className="border px-2 py-1">{parcel.title}</td>
                  <td className="border px-2 py-1">
                    {parcel.sender_name} ({parcel.sender_service_center})
                  </td>
                  <td className="border px-2 py-1">
                    {parcel.receiver_name} ({parcel.receiver_service_center})
                  </td>
                  <td className="border px-2 py-1 capitalize">
                    {parcel.delivery_status}
                  </td>
                  <td className="border px-2 py-1">
                    {parcel.delivery_status === "assigned" ? (
                      <button
                        onClick={() =>
                          handleStatusUpdate(parcel._id, "in-transit")
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Mark as Picked Up
                      </button>
                    ) : parcel.delivery_status === "in-transit" ? (
                      <button
                        onClick={() =>
                          handleStatusUpdate(parcel._id, "delivered")
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Mark as Delivered
                      </button>
                    ) : (
                      <span className="text-gray-400">No Action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingDeliveries;
