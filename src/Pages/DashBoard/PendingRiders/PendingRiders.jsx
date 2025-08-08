import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AxiosHook from "../../../Hooks/AxiosHook";
import Swal from "sweetalert2";

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

  if (isLoading) return <p className="p-4">Loading pending riders...</p>;
  if (riders.length === 0)
    return <p className="p-4">No pending riders found.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Region</th>
            <th className="border px-4 py-2">District</th>
            <th className="border px-4 py-2">Bike Brand</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider) => (
            <tr key={rider._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{rider.name}</td>
              <td className="border px-4 py-2">{rider.email}</td>
              <td className="border px-4 py-2">{rider.phone}</td>
              <td className="border px-4 py-2">{rider.region}</td>
              <td className="border px-4 py-2">{rider.district}</td>
              <td className="border px-4 py-2">{rider.bikeBrand}</td>
              <td className="border px-4 py-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => openModal(rider)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && selectedRider && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <h3 className="text-xl font-bold mb-4">Rider Details</h3>
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="space-y-2 max-h-96 overflow-auto">
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
                <strong>Bike Registration No:</strong> {selectedRider.bikeRegNo}
              </p>
              <p>
                <strong>Status:</strong> {selectedRider.status}
              </p>
              <p>
                <strong>Applied On:</strong>{" "}
                {new Date(selectedRider.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                onClick={() => updateRiderStatus("cancelled")}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                onClick={() => updateRiderStatus("accepted")}
                disabled={actionLoading}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
