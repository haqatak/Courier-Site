import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AxiosHook from "../../../Hooks/AxiosHook";

const ActiveRiders = () => {
  const axiosSecure = AxiosHook();
  const [search, setSearch] = useState("");

  // Query to fetch active riders
  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  const filteredRiders = riders.filter((rider) =>
    rider.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeactivate = async (id) => {
    const confirm = await Swal.fire({
      title: "Deactivate Rider?",
      text: "Are you sure you want to deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${id}`, { status: "inactive" });
        Swal.fire("Success", "Rider deactivated successfully.", "success");
        refetch(); // Refresh data
      } catch (error) {
        console.error("Failed to deactivate:", error);
        Swal.fire("Error", "Could not deactivate rider.", "error");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Active Riders</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded mb-4 w-full md:w-1/3"
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : filteredRiders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">District</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.map((rider, index) => (
                <tr key={rider._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{rider.name}</td>
                  <td className="px-4 py-2 border">{rider.email}</td>
                  <td className="px-4 py-2 border">{rider.phone}</td>
                  <td className="px-4 py-2 border">{rider.district}</td>
                  <td className="px-4 py-2 border text-green-600 font-semibold">
                    {rider.status}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No active riders found.</p>
      )}
    </div>
  );
};

export default ActiveRiders;
