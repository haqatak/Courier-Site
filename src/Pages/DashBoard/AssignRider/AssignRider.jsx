import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AxiosHook from "../../../Hooks/AxiosHook";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import useTrackLogger from "../../../Hooks/useTrackLogger";
import Loading2 from "../../../Shared/Loading/Loading2";
import { motion, AnimatePresence } from "framer-motion";

const AssignRider = () => {
  const axiosSecure = AxiosHook();
  const { user } = useContext(AuthContext);
  const { logTracking } = useTrackLogger();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [availableRiders, setAvailableRiders] = useState([]);
  const [selectedRiderId, setSelectedRiderId] = useState("");

  const {
    data: parcels = [],
    isPending,
    refetch,
  } = useQuery({
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

    try {
      await axiosSecure.patch(`/parcels/${selectedParcel._id}/assign-rider`, {
        assigned_rider: selectedRider,
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

  if (isPending) return <Loading2 />;

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      {/* Title */}
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-secondary mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Assign Rider
      </motion.h2>

      {/* Table */}
      {/* Table for md+ screens */}
      <motion.div
        className="hidden md:block overflow-x-auto bg-base-100 rounded-2xl shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <table className=" w-full border-collapse text-center text-sm sm:text-base">
          <thead className="bg-primary text-neutral font-semibold">
            <tr>
              <th className="border px-4 py-3">Token ID</th>
              <th className="border px-4 py-3">Receiver</th>
              <th className="border px-4 py-3">Service Center</th>
              <th className="border px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, i) => (
              <motion.tr
                key={parcel._id}
                className="hover:bg-primary/10 transition-colors duration-200 bg-accent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <td className="border px-4 py-3">{parcel.token_id}</td>
                <td className="border px-4 py-3">{parcel.receiver_name}</td>
                <td className="border px-4 py-3">
                  {parcel.receiver_service_center}
                </td>
                <td className="border px-4 py-3">
                  <button
                    onClick={() => handleAssignClick(parcel)}
                    className="bg-secondary text-neutral px-4 py-2 rounded-lg hover:bg-secondary/80 transition"
                  >
                    Assign Rider
                  </button>
                </td>
              </motion.tr>
            ))}
            {parcels.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="py-6 text-info font-medium text-center"
                >
                  No assignable parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Card layout for small screens */}
      <div className="space-y-4 md:hidden">
        {parcels?.map((parcel, i) => (
          <motion.div
            key={parcel._id}
            className="bg-accent rounded-xl shadow-md p-4 border border-base-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <p className="text-sm">
              <span className="font-semibold text-primary">Token:</span>{" "}
              {parcel.token_id}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-primary">Receiver:</span>{" "}
              {parcel.receiver_name}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-primary">
                Service Center:
              </span>{" "}
              {parcel.receiver_service_center}
            </p>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => handleAssignClick(parcel)}
                className="bg-secondary text-neutral px-3 py-1.5 rounded-lg hover:bg-secondary/80 transition text-sm"
              >
                Assign Rider
              </button>
            </div>
          </motion.div>
        ))}

        {parcels.length === 0 && (
          <p className="text-info font-medium text-center">
            No assignable parcels found.
          </p>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedParcel && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-base-100 rounded-2xl shadow-lg w-[90%] max-w-md p-6"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-primary">
                Assign Rider to{" "}
                <span className="text-secondary">
                  {selectedParcel.token_id}
                </span>
              </h3>

              {availableRiders.length > 0 ? (
                <select
                  value={selectedRiderId}
                  onChange={(e) => setSelectedRiderId(e.target.value)}
                  className="w-full border border-base-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-secondary text-sm sm:text-base"
                >
                  <option value="">Select Rider</option>
                  {availableRiders.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.name} ({r.district})
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-info mb-4 text-sm sm:text-base">
                  No riders available in this district.
                </p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedParcel(null);
                    setSelectedRiderId("");
                  }}
                  className="bg-accent text-neutral px-4 py-2 rounded-lg hover:bg-accent/80 transition text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  disabled={!selectedRiderId}
                  onClick={handleConfirmAssign}
                  className={`${
                    selectedRiderId
                      ? "bg-primary text-neutral hover:bg-primary/80"
                      : "bg-primary/30 text-neutral cursor-not-allowed"
                  } px-4 py-2 rounded-lg transition text-sm sm:text-base`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AssignRider;
