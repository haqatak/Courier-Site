import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import AxiosHook from "../../../Hooks/AxiosHook";
import useTrackLogger from "../../../Hooks/useTrackLogger";
import Loading2 from "../../../Shared/Loading/Loading2";

const PendingDeliveries = () => {
  const { user } = useContext(AuthContext);
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
    onSuccess: () =>
      queryClient.invalidateQueries(["pendingDeliveries", user?.email]),
  });

  const handleStatusUpdate = (parcelId, newStatus) => {
    const parcel = deliveries.find((d) => d._id === parcelId);
    if (!parcel) return;

    updateStatusMutation.mutate(
      { parcelId, status: newStatus },
      {
        onSuccess: async () => {
          await logTracking({
            trackingId: parcel.token_id,
            parcelId: parcel._id,
            status: newStatus,
            message: `Status updated to "${newStatus}" by Rider-${user.displayName}`,
            updated_by: user?.email || "system",
          });

          Swal.fire("✅ Success", `Marked as ${newStatus}`, "success");
        },
        onError: () =>
          Swal.fire("❌ Error", "Failed to update status", "error"),
      }
    );
  };

  if (isLoading) return <Loading2></Loading2>;
  if (deliveries.length === 0)
    return <p className="text-info">No pending deliveries found.</p>;

  return (
    <div className="px-4 py-6 w-full p-4 md:p-12 mx-auto">
      <h1 className="text-4xl font-bold text-secondary text-center mb-6">
        Pending Deliveries
      </h1>

      {/* Small Screen Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {deliveries.map((parcel) => (
          <div
            key={parcel._id}
            className="bg-accent rounded-lg shadow p-4 flex flex-col gap-2 text-primary"
          >
            <p>
              <strong>Token ID:</strong> {parcel.token_id}
            </p>
            <p>
              <strong>Title:</strong> {parcel.title}
            </p>
            <p>
              <strong>Sender:</strong> {parcel.sender_name} (
              {parcel.sender_service_center})
            </p>
            <p>
              <strong>Receiver:</strong> {parcel.receiver_name} (
              {parcel.receiver_service_center})
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold capitalize ${
                  parcel.delivery_status === "assigned"
                    ? "text-secondary"
                    : parcel.delivery_status === "in-transit"
                    ? "text-yellow-500"
                    : parcel.delivery_status === "delivered"
                    ? "text-green-500"
                    : "text-info"
                }`}
              >
                {parcel.delivery_status}
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              {parcel.delivery_status === "assigned" ? (
                <button
                  onClick={() => handleStatusUpdate(parcel._id, "in-transit")}
                  className="bg-secondary text-neutral px-4 py-1 rounded hover:bg-secondary/90 transition"
                >
                  Picked Up
                </button>
              ) : parcel.delivery_status === "in-transit" ? (
                <button
                  onClick={() => handleStatusUpdate(parcel._id, "delivered")}
                  className="bg-green-500 text-neutral px-4 py-1 rounded hover:bg-green-600 transition"
                >
                  Delivered
                </button>
              ) : (
                <span className="text-info">✔ Done</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Medium & Large Screen Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-info  rounded-lg text-sm">
          <thead className="bg-primary text-neutral">
            <tr>
              <th className="p-2 border border-info">Token</th>
              <th className="p-2 border border-info">Title</th>
              <th className="p-2 border border-info">Sender</th>
              <th className="p-2 border border-info">Receiver</th>
              <th className="p-2 border border-info">Status</th>
              <th className="p-2 border border-info">Action</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((parcel) => (
              <tr
                key={parcel._id}
                className="bg-accent hover:bg-primary/20 transition-colors"
              >
                <td className="border border-info px-2 py-1 font-medium text-primary">
                  {parcel.token_id}
                </td>
                <td className="border border-info px-2 py-1 text-info">
                  {parcel.title}
                </td>
                <td className="border border-info px-2 py-1 text-info">
                  {parcel.sender_name}{" "}
                  <span className="text-info/70 text-xs">
                    ({parcel.sender_service_center})
                  </span>
                </td>
                <td className="border border-info px-2 py-1 text-info">
                  {parcel.receiver_name}{" "}
                  <span className="text-info/70 text-xs">
                    ({parcel.receiver_service_center})
                  </span>
                </td>
                <td
                  className={`border border-info px-2 py-1 font-semibold capitalize ${
                    parcel.delivery_status === "assigned"
                      ? "text-secondary"
                      : parcel.delivery_status === "in-transit"
                      ? "text-yellow-500"
                      : parcel.delivery_status === "delivered"
                      ? "text-green-500"
                      : "text-info"
                  }`}
                >
                  {parcel.delivery_status}
                </td>
                <td className="border border-info px-2 py-1 flex gap-2">
                  {parcel.delivery_status === "assigned" ? (
                    <button
                      onClick={() =>
                        handleStatusUpdate(parcel._id, "in-transit")
                      }
                      className="bg-secondary text-neutral px-4 py-1 rounded hover:bg-secondary/90 transition"
                    >
                      Picked Up
                    </button>
                  ) : parcel.delivery_status === "in-transit" ? (
                    <button
                      onClick={() =>
                        handleStatusUpdate(parcel._id, "delivered")
                      }
                      className="bg-green-500 text-neutral px-4 py-1 rounded hover:bg-green-600 transition"
                    >
                      Delivered
                    </button>
                  ) : (
                    <span className="text-info">✔ Done</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingDeliveries;
