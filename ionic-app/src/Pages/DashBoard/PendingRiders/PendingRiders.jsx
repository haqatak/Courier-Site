import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AxiosHook from "../../../Hooks/AxiosHook";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import Loading2 from "../../../Shared/Loading/Loading2";

const PendingRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const axiosSecure = AxiosHook();

  const {
    data: riders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  const openModal = (rider) => {
    setSelectedRider(rider);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRider(null);
    setModalOpen(false);
  };

  const updateRiderStatus = async (status) => {
    if (!selectedRider) return;
    setActionLoading(true);
    try {
      await axiosSecure.patch(`/riders/${selectedRider._id}`, { status });
      await refetch();
      closeModal();
      Swal.fire({
        icon: "success",
        title: `Application ${
          status === "accepted" ? "Accepted" : "Cancelled"
        }`,
        text: `Rider application has been ${status}.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to update rider status", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update rider status. Try again.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (isLoading) return <Loading2></Loading2>;

  if (riders.length === 0)
    return (
      <motion.div
        className="p-6 text-center text-primary font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        No pending riders found.
      </motion.div>
    );

  return (
    <div className="p-4 md:p-10 w-full mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-secondary text-center">
        Pending Riders
      </h2>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto rounded-2xl shadow-md">
        <motion.table
          className="table-auto w-full border border-secondary text-info bg-accent rounded-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-primary text-neutral">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">
                Email
              </th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">
                Region
              </th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">
                District
              </th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">
                Bike Brand
              </th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, i) => (
              <motion.tr
                key={rider._id}
                className="hover:bg-primary/20 transition"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <td className="px-4 py-3">{rider.name}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  {rider.email}
                </td>
                <td className="px-4 py-3">{rider.phone}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {rider.region}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  {rider.district}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  {rider.bikeBrand}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    className="px-3 py-1 rounded-lg bg-secondary text-white hover:bg-secondary/80 transition"
                    onClick={() => openModal(rider)}
                  >
                    View
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && selectedRider && (
          <motion.div
            className="fixed inset-0 bg-secondary/20 backdrop-blur-md bg-opacity-40 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-accent text-info rounded-2xl shadow-xl max-w-lg w-full p-6 relative"
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <h3 className="text-xl font-bold mb-4 text-primary">
                Rider Details
              </h3>
              <button
                className="absolute top-3 right-4 text-xl font-bold text-secondary hover:text-primary transition"
                onClick={closeModal}
                aria-label="Close modal"
              >
                &times;
              </button>

              {/* Rider Info */}
              <div className="space-y-2 max-h-80 overflow-auto pr-2 text-info">
                <p>
                  <strong>Name:</strong> {selectedRider.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedRider.email}
                </p>
                <p>
                  <strong>Age:</strong> {selectedRider.age}
                </p>
                <p>
                  <strong>Region:</strong> {selectedRider.region}
                </p>
                <p>
                  <strong>District:</strong> {selectedRider.district}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedRider.phone}
                </p>
                <p>
                  <strong>National ID:</strong> {selectedRider.nid}
                </p>
                <p>
                  <strong>Bike Brand:</strong> {selectedRider.bikeBrand}
                </p>
                <p>
                  <strong>Bike Registration No:</strong>{" "}
                  {selectedRider.bikeRegNo}
                </p>
                <p>
                  <strong>Status:</strong> {selectedRider.status}
                </p>
                <p>
                  <strong>Applied On:</strong>{" "}
                  {new Date(selectedRider.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-4">
                <button
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                  onClick={() => updateRiderStatus("cancelled")}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  className="bg-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                  onClick={() => updateRiderStatus("accepted")}
                  disabled={actionLoading}
                >
                  Accept
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PendingRiders;
