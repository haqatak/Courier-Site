import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import AxiosHook from "../../../Hooks/AxiosHook";
import Loading2 from "../../../Shared/Loading/Loading2";

const ActiveRiders = () => {
  const axiosSecure = AxiosHook();
  const [search, setSearch] = useState("");

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
      confirmButtonColor: "#03373d", // primary
      cancelButtonColor: "#2568fb", // secondary
      confirmButtonText: "Yes, deactivate",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${id}`, { status: "inactive" });
        Swal.fire("Success", "Rider deactivated successfully.", "success");
        refetch();
      } catch (error) {
        console.error("Failed to deactivate:", error);
        Swal.fire("Error", "Could not deactivate rider.", "error");
      }
    }
  };

  if (isLoading) return <Loading2 />;

  return (
    <div className="w-full mx-auto p-4 sm:p-6 md:p-10">
      {/* Title */}
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-6 text-secondary text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Active Riders
      </motion.h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-secondary px-4 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      {/* Table layout for md+ */}
      {filteredRiders.length > 0 ? (
        <>
          <motion.div
            className="hidden md:block overflow-x-auto bg-base-100 rounded-2xl shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <table className="min-w-full border-collapse text-center text-sm sm:text-base">
              <thead className="bg-primary text-neutral font-semibold">
                <tr>
                  <th className="border px-4 py-3">#</th>
                  <th className="border px-4 py-3">Name</th>
                  <th className="border px-4 py-3">Email</th>
                  <th className="border px-4 py-3">Phone</th>
                  <th className="border px-4 py-3">District</th>
                  <th className="border px-4 py-3">Status</th>
                  <th className="border px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRiders.map((rider, index) => (
                  <motion.tr
                    key={rider._id}
                    className="hover:bg-primary/10 transition-colors duration-200 bg-accent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="border px-4 py-3">{index + 1}</td>
                    <td className="border text-secondary px-4 py-3">{rider.name}</td>
                    <td className="border px-4 py-3">{rider.email}</td>
                    <td className="border px-4 py-3">{rider.phone}</td>
                    <td className="border px-4 py-3">{rider.district}</td>
                    <td className="border px-4 py-3 text-green-600 font-semibold">
                      {rider.status}
                    </td>
                    <td className="border px-4 py-3">
                      <button
                        onClick={() => handleDeactivate(rider._id)}
                        className="bg-red-600 text-neutral px-3 py-1.5 rounded-lg hover:bg-red-700 transition"
                      >
                        Deactivate
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Card layout for mobile */}
          <div className="space-y-4 md:hidden">
            {filteredRiders.map((rider, index) => (
              <motion.div
                key={rider._id}
                className="bg-accent rounded-xl shadow-md p-4 border border-base-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <p>
                  <span className="font-semibold text-primary">Name:</span>{" "}
                  {rider.name}
                </p>
                <p className="text-secondary">
                  <span className="font-semibold text-primary">Email:</span>{" "}
                  {rider.email}
                </p>
                <p>
                  <span className="font-semibold text-primary">Phone:</span>{" "}
                  {rider.phone}
                </p>
                <p>
                  <span className="font-semibold text-primary">District:</span>{" "}
                  {rider.district}
                </p>
                <p className="text-green-600 font-semibold">
                  Status: {rider.status}
                </p>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => handleDeactivate(rider._id)}
                    className="bg-red-600 text-neutral px-3 py-1.5 rounded-lg hover:bg-red-700 transition text-sm"
                  >
                    Deactivate
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-info font-medium text-center">
          No active riders found.
        </p>
      )}
    </div>
  );
};

export default ActiveRiders;
